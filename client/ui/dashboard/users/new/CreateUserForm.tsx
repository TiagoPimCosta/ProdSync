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
import { useCreateUser } from "@/src/services/users/mutations";
import { useRouter } from "next/navigation";
import { type NewUserSchema, newUserSchema } from "@/src/schemas/users/newUserSchema";
import { UserTypes } from "@/src/utils/consts";
import { Combobox } from "@/src/components/ui/combobox";

const CreateUserForm = () => {
  const createUser = useCreateUser();
  const router = useRouter();

  const form = useForm<NewUserSchema>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      idNumber: undefined,
      name: undefined,
      role: "user",
      username: undefined,
      password: undefined,
    },
  });

  async function onSubmit(values: NewUserSchema) {
    await createUser.mutateAsync(values);
    router.push("/dashboard/users");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex sm:flex-row flex-col w-full gap-6 pb-4">
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem className="sm:w-40 w-full">
                <FormLabel>Numero</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="sm:w-40 w-full">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Combobox data={UserTypes} placeholder="Role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full gap-6 pb-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="sm:w-40 w-full">
                <FormLabel>Telemóvel</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full gap-6 pb-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cc"
            render={({ field }) => (
              <FormItem className="sm:w-40 w-full">
                <FormLabel>CC</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nif"
            render={({ field }) => (
              <FormItem className="sm:w-40 w-full">
                <FormLabel>Nif</FormLabel>
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

export default CreateUserForm;
