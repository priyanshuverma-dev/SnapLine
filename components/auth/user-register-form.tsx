"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icons } from "../core/icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Name must be less than 30 characters.",
    })
    .min(3, {
      message: "Name must be at least 3 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, {
      message: "Password must be less than 32 characters.",
    }),
});

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const session = useSession();

  const router = useRouter();

  React.useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(
    values: z.infer<typeof formSchema>
    // event?: React.SyntheticEvent
  ) {
    // event?.preventDefault();
    setIsLoading(true);
    const toasterLoading = toast.loading("Loading...");

    axios
      .post("/api/register", values)
      .then(() =>
        signIn("credentials", {
          ...values,
          redirect: false,
        })
      )
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          toast.success("Success");
          router.push("/");
        }
      })
      .catch((err: any) => {
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
        toast.dismiss(toasterLoading);
      });
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="John Deo"
                        type="name"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect="on"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        security="*"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={() => socialAction("github")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => socialAction("google")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </Form>
    </div>
  );
}
