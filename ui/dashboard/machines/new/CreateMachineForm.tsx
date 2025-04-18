"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useCreateMachine } from "@/src/services/machines/mutations";
import { newMachineSchema, NewMachineSchema } from "@/src/schemas/machines/newMachineSchema";

const CreateMachineForm = () => {
  const createMachine = useCreateMachine();
  const router = useRouter();

  const form = useForm<NewMachineSchema>({
    resolver: zodResolver(newMachineSchema),
    defaultValues: {
      name: undefined,
    },
  });

  async function onSubmit(values: NewMachineSchema) {
    await createMachine.mutateAsync(values);
    router.push("/dashboard/machines");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex sm:flex-row flex-col w-full gap-6 pb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateMachineForm;
