'use client';

import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/app/_components/ui/form';
import { SignupFormValues, signupFormSchema } from './signup-form-schema';
import { api } from '@/trpc/react';
import { signIn } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from '@/app/_components/ui/alert';

export const SignupForm = (): JSX.Element => {
  const { status, mutateAsync, isError, error } = api.auth.signup.useMutation();
  const form = useForm<SignupFormValues>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    const res = await mutateAsync(values);
    if (res === 'ok') {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      });
    }
  };
  const onError: SubmitErrorHandler<SignupFormValues> = (errors) => console.error(errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="flex w-[500px] flex-col gap-6">
          {isError && (
            <Alert variant={'destructive'}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Signup to Scaleit</h1>
            <p className="text-base text-neutral-500">Occaecat commodo nulla cillum veniam do qui nisi pariatur.</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field, fieldState }) => {
                  return (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Firstname" {...field} />
                      </FormControl>
                      {fieldState.invalid && (
                        <FormDescription className="text-red-500">{fieldState.error?.message}</FormDescription>
                      )}
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field, fieldState }) => {
                  return (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Lastname" {...field} />
                      </FormControl>
                      {fieldState.invalid && (
                        <FormDescription className="text-red-500">{fieldState.error?.message}</FormDescription>
                      )}
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    {fieldState.invalid && (
                      <FormDescription className="text-red-500">{fieldState.error?.message}</FormDescription>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    {fieldState.invalid && (
                      <FormDescription className="text-red-500">{fieldState.error?.message}</FormDescription>
                    )}
                  </FormItem>
                );
              }}
            />
            <Button disabled={status === 'loading'}>Signup</Button>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/auth/forgot-password">Forgot password?</Link>
            <div className="flex gap-2">
              <p className="text-neutral-500">Already have an account?</p>
              <Link href="/auth/login">Login here.</Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
