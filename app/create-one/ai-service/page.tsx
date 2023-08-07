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
import { services } from "@/utils/services";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 10 characters.",
  }),

  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  website: z.string().url(),
  price: z.number().min(0).optional(),
  aiType: z
    .enum(["TEXT", "IMAGE", "VIDEO", "AUDIO", "OTHER"])
    .refine((val) => val !== "OTHER", {
      message: "Type must be one of TEXT, IMAGE, VIDEO, AUDIO, OTHER",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        />{" "}
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
                <SelectContent>
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="IMAGE">Image</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="AUDIO">Audio</SelectItem>
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
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AiServiceCreatePage;
