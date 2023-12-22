"use client";

import { signOut } from "next-auth/react";

export const SignOutButton = (): JSX.Element => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/auth/login" });
      }}
    >
      Sign out
    </button>
  );
};
