"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { createSetting } from "@/app/actions";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  entityType: z.string().min(1, "entityType is required"),
  entityId: z.string().min(1, "entityId is required"),
});

export const SettingForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      entityType: "",
      entityId: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await createSetting(data);
      const { error } = result;

      if (error?.message) {
        toast.error("Could not save setting", {
          description: error.message,
        });
      } else {
        toast.success("Setting saved", {
          description: "Successfully saved.",
        });
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full space-y-6 px-3 md:px-0"
    >
      <Field className="flex-col gap-2">
        <FieldLabel htmlFor="setting-entity-type" className="flex justify-start">
          EntityType*
        </FieldLabel>
        <Input
          id="setting-entity-type"
          className="border-blue-950"
          placeholder="DEVICE"
          {...form.register("entityType")}
          aria-invalid={!!form.formState.errors.entityType}
        />
        <FieldDescription>
          A string value representing the entity type. For example, &apos;DEVICE&apos;
        </FieldDescription>
        <FieldError
          className="flex justify-start text-red-500"
          errors={[form.formState.errors.entityType]}
        />
      </Field>

      <Field className="flex-col gap-2">
        <FieldLabel htmlFor="setting-entity-id" className="flex justify-start">
          EntityId*
        </FieldLabel>
        <Input
          id="setting-entity-id"
          className="border-blue-950"
          placeholder="784f394c-42b6-435a-983c-b7beff2784f9"
          {...form.register("entityId")}
          aria-invalid={!!form.formState.errors.entityId}
        />
        <FieldDescription>
          A string value representing the entity id. For example,
          &apos;784f394c-42b6-435a-983c-b7beff2784f9&apos;
        </FieldDescription>
        <FieldError
          className="flex justify-start text-red-500"
          errors={[form.formState.errors.entityId]}
        />
      </Field>

      <Button type="submit" className="flex w-full gap-2" disabled={isPending}>
        Edit
        <Icons.spinner className={cn("animate-spin", { hidden: !isPending })} />
      </Button>
    </form>
  );
};
