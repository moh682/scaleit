'use client';

import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FormField, FormItem, FormControl, FormDescription, Form } from '@/app/_components/ui/form';
import { LoginFormValues, loginFormSchema } from './login-form-schema';
import { Alert, AlertTitle, AlertDescription } from '@/app/_components/ui/alert';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const LoginForm = (): JSX.Element => {
  const params = useSearchParams();
  const error = params.get('error');
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });
  };
  const onError: SubmitErrorHandler<LoginFormValues> = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="flex w-[500px] flex-col gap-6">
          {!!error && (
            <Alert variant={'destructive'}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Login to Scaleit</h1>
            <p className="text-base text-neutral-500">Occaecat commodo nulla cillum veniam do qui nisi pariatur.</p>
          </div>
          <div className="flex w-full flex-col gap-4">
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
            <Button>Login</Button>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/auth/forgot-password">Forgot password?</Link>
            <div className="flex gap-2">
              <p className="text-neutral-500">Do you not have an account?</p>
              <Link href="/auth/signup">Signup here.</Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
