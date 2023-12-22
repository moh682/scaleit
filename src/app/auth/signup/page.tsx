import { Input } from "@/app/_components/ui/input";
import { Form, FormControl } from "@/app/_components/ui/form";
import { SignupForm } from "./signup-form";
import { getCsrfToken } from "next-auth/react";

export default async function Signup() {
  const token = await getCsrfToken();
  return (
    <main className="flex h-full w-full items-center justify-center">
      <SignupForm />
    </main>
  );
}
