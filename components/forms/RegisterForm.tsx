"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
// import { toast } from "sonner";
// import { signUpWithEmailAndPassword } from "@/actions";

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    // startTransition(async () => {
    //   const result = await signUpWithEmailAndPassword(data);
    //   const { error } = result;

    //   if (error?.message) {
    //     console.log(error.message);
    //     toast({
    //       variant: "destructive",
    //       title: "You submitted the following values:",
    //       description: (
    //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //           <code className="text-white">{error.message}</code>
    //         </pre>
    //       ),
    //     });
    //   } else {
    //     console.log("succes");
    //     toast({
    //       title: "You submitted the following values:",
    //       description: (
    //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //           <code className="text-white">Successfully register</code>
    //         </pre>
    //       ),
    //     });
    //   }
    // });
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
        className="flex h-10 w-full gap-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500"
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
