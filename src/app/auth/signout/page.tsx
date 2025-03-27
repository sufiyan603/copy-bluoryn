"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}