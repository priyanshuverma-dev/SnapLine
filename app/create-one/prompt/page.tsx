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
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/core/icons";
const formSchema = z.object({
  title: z.string().min(10, {
    message: "title must be at least 10 characters.",
  }),
  description: z.string().optional(),
  prompt: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  service: z.string(),

  medias: z.array(z.string()),
});

type ListProp = {
  id: string;
  name: string;
};

const fetchAIList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ai/service/list`);
  const data: ListProp[] = await res.json();
  if (!data) {
    console.log("No data found");
    return [];
  }

  if (res.status === 200) {
    return data;
  } else {
    console.log("Error fetching data");
    return [];
  }
};

const CreatePage = () => {
  const [services, setServices] = useState<ListProp[]>([]);
  if (services.length === 0) {
    console.log(services);
    fetchAIList().then((data) => setServices(data));
  }

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      service: "NONE",
      title: "",
      medias: [],
    },
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // .then(() => {})
    setIsLoading(true);
    axios
      .post("/api/prompt/create", {
        ...data,
      })
      .then((data) => {
        if (data.status === 201) {
          toast.success("Prompt created!");
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Prompt for OpenAI Chat GPT"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Prompt is for which service</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="medias"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <span>Add Images: </span>
                  <CldUploadButton
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
                    uploadPreset="snapline-dev"
                    onSuccess={(res) => {
                      console.log(res); // Output the Cloudinary response

                      const res1: {
                        public_id: string;
                        secure_url: string;
                      } = res.info as any;

                      console.log(res1.secure_url);

                      const prev = form.getValues("medias");

                      form.setValue("medias", [...prev, res1.secure_url]);
                    }}
                  >
                    <span className="p-2">Select Images</span>
                  </CldUploadButton>
                  <div>
                    {field.value.map((url) => (
                      <div key={url} className="inline-flex items-center">
                        <Avatar>
                          <AvatarImage src={url} />
                          <AvatarFallback>{url.length}</AvatarFallback>
                        </Avatar>
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Write me a letter to boss"
                  {...field}
                />
              </FormControl>
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
                  placeholder="This prompt is about"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </form>
    </Form>
  );
};
export default CreatePage;
