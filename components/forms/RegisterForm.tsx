"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { signUpWithEmailAndPassword } from "@/app/actions";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password is required and Must filled out equalmore 8 length.",
    }),
    confirm: z.string().min(8, {
      message: "Password is required and Must filled out equalmore 8 length.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });
export default function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await signUpWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      const msg = result.error.toLowerCase();
      const description =
        msg.includes("rate limit") || msg.includes("email rate limit")
          ? "Too many emails sent. Wait a while or raise the limit under Authentication → Email in Supabase."
          : result.error;

      toast.error("Registration failed", {
        description,
        duration: 6500,
      });
      return;
    }

    toast.success("Account created", {
      description:
        "If email confirmation is on, check your inbox for the link before signing in.",
      duration: 5000,
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
      <Field className="flex-col gap-2">
        <FieldLabel htmlFor="register-email" className="flex justify-start">
          Email
        </FieldLabel>
        <Input
          id="register-email"
          placeholder="example@gmail.com"
          type="email"
          {...form.register("email")}
          aria-invalid={!!form.formState.errors.email}
        />
        <FieldError
          className="flex justify-start text-red-500"
          errors={[form.formState.errors.email]}
        />
      </Field>

      <Field className="flex-col gap-2">
        <FieldLabel htmlFor="register-password" className="flex justify-start">
          Password
        </FieldLabel>
        <Input
          id="register-password"
          placeholder="password"
          type="password"
          {...form.register("password")}
          aria-invalid={!!form.formState.errors.password}
        />
        <FieldError
          className="flex justify-start text-red-500"
          errors={[form.formState.errors.password]}
        />
      </Field>

      <Field className="flex-col gap-2">
        <FieldLabel htmlFor="register-confirm" className="flex justify-start">
          Confirm Password
        </FieldLabel>
        <Input
          id="register-confirm"
          placeholder="Confirm Password"
          type="password"
          {...form.register("confirm")}
          aria-invalid={!!form.formState.errors.confirm}
        />
        <FieldError
          className="flex justify-start text-red-500"
          errors={[form.formState.errors.confirm]}
        />
      </Field>

      <Button
        type="submit"
        className="flex h-10 w-full gap-2 rounded-lg bg-slate-200 font-medium text-slate-900 hover:bg-white"
        disabled={form.formState.isSubmitting}
      >
        Register
        <Icons.spinner
          className={cn("animate-spin", { hidden: !form.formState.isSubmitting })}
        />
      </Button>
    </form>
  );
}
