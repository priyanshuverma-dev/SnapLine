"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@/utils/user";
import axios from "axios";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useCurrentUserStore } from "@/hooks/use-current-use-store";
import { Icons } from "../core/icons";
import { CldUploadButton } from "next-cloudinary";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email()
    .optional(),
  bio: z.string().max(160).min(4),
  social: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  avatar: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  bio: "",
  avatar: "",
  email: "",
  username: "",
  social: [],
};

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const userStore = useCurrentUserStore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "social",
  });
  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/current/settings/account/edit", data);

      if (res.status !== 200) {
        console.log(res.data);
        toast.error("Something Went wrong in Server Side");
        toast.error(res.data.error);
      }

      toast.success("Profile updated!");

      userStore.setUser(res.data.user);
      router.push(`/u/${data.username}`);
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong in Client Side");
    } finally {
      setIsLoading(false);
    }
  }

  const {
    data,
    isLoading: isUser,
  }: {
    data: User;
    isLoading: boolean;
  } = useCurrentUser();

  if (isUser) {
    return <div>Loading...</div>;
  }

  if (!isUser && form.getValues().username === "") {
    console.log(data.social.map((url) => ({ value: url })));
    setSelectedImage(data.image);
    form.reset({
      username: data.username,
      name: data.name,
      avatar: data.image,
      email: data.email,
      bio: data.bio,
      social: data.social.map((url) => ({ value: url })),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="avatar"
          control={form.control}
          render={({ field }) => (
            <div className="mb-4">
              <div className="relative w-32 h-32 rounded-full mb-2 cursor-pointer overflow-hidden">
                <CldUploadButton
                  className="w-full h-full rounded-full"
                  uploadPreset="snapline-dev"
                  options={{
                    folder: "avatars",
                    maxFiles: 1,
                    showPoweredBy: false,
                    showUploadMoreButton: false,
                  }}
                  onSuccess={(res) => {
                    const res1: {
                      public_id: string;
                      secure_url: string;
                    } = res.info as any;
                    console.log(res1.secure_url);
                    setSelectedImage(res1.secure_url);
                    form.setValue("avatar", res1.secure_url);
                  }}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex justify-center items-center">
                      <Icons.logo className="text-gray-500 w-6 h-6" />
                    </div>
                  )}
                </CldUploadButton>
              </div>
              <FormDescription>
                Click the avatar to upload a new image.
              </FormDescription>
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Pv" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Pv" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 7 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Your Email"
                  readOnly
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/settings/account/emails" className="text-blue-400">
                  email settings
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`social.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isLoading}
            onClick={() => append({ value: "" })}
          >
            Add Social Account
          </Button>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
