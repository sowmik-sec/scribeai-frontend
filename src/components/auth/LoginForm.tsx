"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  // .regex(/[A-Z]/, "Password must contain an uppercase letter")
  // .regex(/[0-9]/, "Password must contain a number"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  async function onSubmit(values: LoginFormValues) {
    try {
      // console.log(values);
      // TODO: handle success (redirect, toast, set user)

      const result = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      if (result.success) {
        toast.success("Thank you for signing up in Scribeai");
        router.push("/dashboard");
      }

      // console.log("signup success", result);
    } catch (err) {
      console.error("signup error", err);
    }
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/60 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:bg-slate-900/60 dark:border-slate-700 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Login your account</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Start building with a free account.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Choose a strong password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                className={cn(
                  "w-full text-white font-medium hover:cursor-pointer",
                  "bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500",
                  "shadow-lg hover:shadow-xl",
                  "transform transition-transform duration-200 ease-out hover:scale-[1.02]",
                  "focus-visible:ring-4 focus-visible:ring-indigo-300/40",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </div>

            <div className="text-center mt-3 text-sm">
              <span className="text-muted-foreground">New to Scribeai? </span>
              <a
                href="/signup"
                className="text-primary font-medium hover:underline"
              >
                Signup
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
