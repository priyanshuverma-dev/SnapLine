"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/core/icons";
import { CldUploadButton } from "next-cloudinary";
import { imageUrlCloudinary, saveMediaToDB } from "@/lib/functions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 10 characters.",
  }),

  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  website: z.string().url(),
  price: z.number().min(0).optional(),
  image: z.string().url({
    message: "Select a valid image",
  }),
  aiType: z
    .enum(["TEXT", "IMAGE", "VIDEO", "AUDIO", "OTHER", "MUSIC"])
    .refine((val) => val !== "OTHER", {
      message: "Type must be one of TEXT, IMAGE, VIDEO, AUDIO, MUSIC, OTHER",
    }),
});

const AiServiceCreatePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      aiType: "TEXT",
      image: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // .then(() => {})
    setIsLoading(true);
    axios
      .post("/api/ai/service/create", {
        ...data,
      })
      .then((data) => {
        if (data.status === 201) {
          toast.success("AI Service created!");
          router.push("/");
        } else {
          toast.error("Error went!");
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Name of AI Service"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Portal)</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Website of AI Service"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <span>Add Avatar: </span>
                  <CldUploadButton
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
                    uploadPreset="snapline-dev"
                    options={{
                      folder: "ai-services-logos",
                      autoMinimize: true,
                      multiple: false,
                      maxFiles: 1,
                    }}
                    onSuccess={(res) => {
                      console.log(res); // Output the Cloudinary response

                      const res1: {
                        url: string;
                        secure_url: string;
                        public_id: string;
                        format: string;
                        signature: string;
                        width: number;
                        height: number;
                        resource_type: string;
                      } = res.info as any;

                      saveMediaToDB(res1)
                        .then((data: any) => {
                          // form.setValue("image", data.media.id);

                          console.log(data);
                        })
                        .catch((err: any) => {
                          console.log(err);
                        });

                      console.log(res1.secure_url);

                      form.setValue("image", res1.secure_url);
                    }}
                  >
                    <span className="p-2">Select Images</span>
                  </CldUploadButton>
                  <div>
                    <div key={field.value} className="inline-flex items-center">
                      <Avatar>
                        <AvatarImage src={field.value} />
                        <AvatarFallback>{field.value}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aiType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark:border-gray-800">
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="IMAGE">Image</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="AUDIO">Audio</SelectItem>
                  <SelectItem value="MUSIC">MUSIC</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>AI output type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="description about AI and its service"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Price of AI Service"
                  {...field}
                />
              </FormControl>
              <FormDescription>Leave empty if it is free</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </form>
    </Form>
  );
};

export default AiServiceCreatePage;
