import { requiredFieldErrorMessage } from '@/app/_utils';
import { z } from 'zod';

export const signupFormSchema = z.object({
  email: z
    .string({
      required_error: requiredFieldErrorMessage('Email'),
    })
    .email(),
  password: z
    .string({
      required_error: requiredFieldErrorMessage('Password'),
    })
    .min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
  firstname: z
    .string({
      required_error: requiredFieldErrorMessage('Firstname'),
    })
    .min(1, {
      message: 'firstname must be at least 1 character long.',
    })
    .max(64),
  lastname: z
    .string({
      required_error: requiredFieldErrorMessage('Lastname'),
    })
    .min(1)
    .max(64),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;
