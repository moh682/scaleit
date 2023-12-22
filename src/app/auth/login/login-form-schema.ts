import { requiredFieldErrorMessage } from "@/app/_utils";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: requiredFieldErrorMessage("Email"),
    })
    .email("Invalid format"),
  password: z
    .string({
      required_error: requiredFieldErrorMessage("Password"),
    })
    .min(8)
    .max(64),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;
