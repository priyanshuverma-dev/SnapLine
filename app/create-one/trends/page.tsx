"use client";

import { Icons } from "@/components/core/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { saveMediaToDB } from "@/lib/functions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "title must be at least 10 characters.",
  }),
  description: z.string().optional(),

  image: z.string().url({
    message: "Select a valid image",
  }),
  slug: z.string().min(5, {
    message: "Slug must be at least 5 characters.",
  }),
  prompts: z.array(z.string()),
  image_id: z.string(),
});

type ListProp = {
  id: string;
  title: string;
  image: string;
  aiService: string;
  user: string;
  userImage: string;
};

const fetchAIList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/trends/list`);
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

const TrendsPage = () => {
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
      description: "",
      title: "",
      prompts: [],
      image: "",
      slug: "",
      image_id: "",
    },
    mode: "onChange",
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // .then(() => {})
    setIsLoading(true);
    axios
      .post("/api/trends/create", {
        ...data,
      })
      .then((data) => {
        if (data.status === 201) {
          toast.success("Trends created!");
          router.push("/");
        } else {
          toast.error("Error went!");
        }
      })
      .catch((err) => toast.error(err.response.data.message))
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Title of trends"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Slug of trends"
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
                  <span>Add Banner: </span>
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
                          form.setValue("image_id", data.media.id);

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
        <div className="w-full">
          <FormField
            control={form.control}
            name="prompts"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select Prompts</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? field.value.length + " prompts selected"
                          : "Select Prompts"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search Prompts with title..."
                        className="h-9"
                      />
                      <CommandEmpty>No prompt found.</CommandEmpty>
                      <CommandGroup>
                        {services.flatMap((prompt) => (
                          <CommandItem
                            value={prompt.title}
                            key={prompt.title}
                            onSelect={() => {
                              const preList = form.getValues("prompts");
                              form.setValue("prompts", [prompt.id, ...preList]);
                            }}
                          >
                            {prompt.title}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value.includes(prompt.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the prompts shown on trends page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col ">
            {form.getValues("prompts").flatMap((id: string) => (
              <div
                key={id}
                className="p-2 inline-flex items-center justify-between"
              >
                <div className="flex flex-row p-2">
                  <Avatar>
                    <AvatarImage
                      src={services.find((prompt) => prompt.id === id)?.image}
                    />
                    <AvatarFallback>
                      {services.find((prompt) => prompt.id === id)?.title.at(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="p-3">
                    {services.find((prompt) => prompt.id === id)?.title}
                    {" by "}
                    {services.find((prompt) => prompt.id === id)?.user}
                  </span>
                </div>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const preList = form.getValues("prompts");
                      form.setValue(
                        "prompts",
                        preList.filter((item) => item !== id)
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </form>
    </Form>
  );
};

export default TrendsPage;
