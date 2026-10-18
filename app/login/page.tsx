"use client";

import { FormEvent, useState } from "react";
import { PageShell } from "@/components/ui/PageShell";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <PageShell
      title={mode === "login" ? "Login" : "Sign Up"}
      subtitle="Access your MARTO account for faster checkout."
    >
      {done ? (
        <div className="shadow-card rounded-2xl bg-white p-8 text-center">
          <p className="font-semibold text-forest">You&apos;re all set!</p>
          <p className="mt-1 text-sm text-muted">
            (Demo only — no account backend is connected.)
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="shadow-card mx-auto max-w-md space-y-4 rounded-2xl bg-white p-6"
        >
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-forest"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-forest"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-forest"
            />
          </div>
          <button
            type="submit"
            className="btn-3d w-full rounded-full bg-forest py-3 text-sm font-bold text-white"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className="w-full text-center text-sm text-forest underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login"
              ? "Need an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </form>
      )}
    </PageShell>
  );
}
