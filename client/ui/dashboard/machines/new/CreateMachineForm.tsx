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
import { useCreateMachine } from "@/src/services/machines/mutations";
import { newMachineSchema, NewMachineSchema } from "@/src/schemas/machines/newMachineSchema";
import { Combobox } from "@/src/components/ui/combobox";
import { useGetLinesOptions } from "@/src/services/options/queries";

const CreateMachineForm = () => {
  const createMachine = useCreateMachine();
  const router = useRouter();

  const { data: linesOptions } = useGetLinesOptions();

  const form = useForm<NewMachineSchema>({
    resolver: zodResolver(newMachineSchema),
    defaultValues: {
      name: undefined,
      line: undefined,
      cadence: undefined,
    },
  });
  async function onSubmit(values: NewMachineSchema) {
    await createMachine.mutateAsync({
      name: values.name,
      line: values.line,
      cadence: values.cadence,
    });
    router.push("/dashboard/machines");
  }

  console.log(form.watch("line"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-full xl:col-span-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full xl:col-span-1">
            <FormField
              control={form.control}
              name="line"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Linha</FormLabel>
                  <FormControl>
                    <Combobox placeholder="Linha" data={linesOptions} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full xl:col-span-1">
            <FormField
              control={form.control}
              name="cadence"
              render={({ field }) => (
                <FormItem className="sm:w-40 w-full">
                  <FormLabel>Cadência (pçs/hora)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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

export default CreateMachineForm;
