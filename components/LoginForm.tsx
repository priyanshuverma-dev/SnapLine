"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthSocialButton from "./AuthSocialButton";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
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
const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const toasterLoading = toast.loading("Loading...");

    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
        toast.dismiss(toasterLoading);
      });

    console.log(values);
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: true })
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
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
           bg-white 
           dark:bg-neutral-900
             px-4
             py-8
             shadow
             sm:rounded-lg
            sm:px-10
          "
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="super-secret-password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"secondary"}
              size={"lg"}
              className="w-full"
              type="submit"
            >
              Log In
            </Button>
          </form>
        </Form>

        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={FaGithub}
            onClick={() => socialAction("github")}
          />
          <AuthSocialButton
            icon={FcGoogle}
            onClick={() => socialAction("google")}
          />
        </div>
        <div
          className="
              flex
              gap-2
              justify-center
              text-sm
              mt-6
              px-2
              text-gray-500
            "
        >
          <div>New to Prompt.Ai?</div>
          <div
            onClick={() => router.push(`/register`)}
            className="underline cursor-pointer"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
