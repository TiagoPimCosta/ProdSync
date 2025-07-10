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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useCreateLine } from "@/src/services/lines/mutations";
import { newLineSchema, NewLineSchema } from "@/src/schemas/lines/newLineSchema";

const CreateLineForm = () => {
  const createLine = useCreateLine();
  const router = useRouter();

  const form = useForm<NewLineSchema>({
    resolver: zodResolver(newLineSchema),
    defaultValues: {
      name: undefined,
    },
  });

  async function onSubmit(values: NewLineSchema) {
    await createLine.mutateAsync(values);
    router.push("/dashboard/lines");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-6 gap-12">
          <div className="col-span-full xl:col-span-3">
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateLineForm;
