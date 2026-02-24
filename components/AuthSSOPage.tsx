"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

type AuthMode = "login" | "signup";

interface AuthSSOPageProps {
  mode: AuthMode;
}

export default function AuthSSOPage({ mode }: AuthSSOPageProps) {
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen h-screen bg-[#F7F5EF]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#1F2A44]/10">
        <nav className="max-w-7xl w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-[#1F2A44]/5 rounded-full transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 text-[#1F2A44]" />
            </Link>
            <Link href="/" className="logo-text text-3xl">
              pnp
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#1F2A44]/60">
              {isLogin ? "Welcome back" : "Create your account"}
            </span>
          </div>
        </nav>
      </header>

      <main className="relative h-full overflow-hidden flex items-center justify-center px-4 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#FFBF00]/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-[#20B2AA]/10 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-245">
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#1F2A44]/10 bg-white p-6 shadow-[0_12px_28px_rgba(31,42,68,0.08)] sm:p-8 md:p-10">
            <div className="text-center">
              <h1 className="font-cormorant text-4xl font-bold leading-tight text-[#1F2A44] sm:text-5xl md:text-6xl">
                {isLogin ? "Log In" : "Sign Up"}
              </h1>
              <p className="mt-2 text-base font-medium text-[#1F2A44]/70 sm:text-lg">
                {isLogin
                  ? "Continue with your Google account to access your print dashboard."
                  : "Create your account instantly using Google Sign Up."}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-[#1F2A44]/10 bg-[#F7F5EF] p-5 sm:p-6">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#1F2A44]/15 bg-white px-5 py-4 text-base font-bold text-[#1F2A44] transition-all hover:-translate-y-px hover:border-[#1F2A44]/30 hover:shadow-md"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <GoogleIcon />
                {isLogin ? "Continue with Google" : "Sign up with Google"}
              </button>

              <p className="mt-4 text-center text-xs font-semibold text-[#1F2A44]/60 sm:text-sm">
                For now, we only support Google Sign Up. No password is
                required.
              </p>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#D7F4F1] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#20B2AA]" />
              <p className="text-sm font-semibold text-[#1F2A44] sm:text-base">
                Secure sign-in powered by Google. We never store your Google
                password.
              </p>
            </div>

            <div className="mt-8 text-center text-sm font-semibold text-[#1F2A44]/70">
              {isLogin ? "New to PayNPrint?" : "Already have an account?"}{" "}
              <Link
                href={isLogin ? "/signup" : "/login"}
                className="font-bold text-[#1F2A44] underline decoration-[#FFBF00] decoration-2 underline-offset-4"
              >
                {isLogin ? "Create account" : "Log in"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.194 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.841 1.154 7.955 3.045l5.657-5.657C34.139 6.053 29.318 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819A11.958 11.958 0 0 1 24 12c3.059 0 5.841 1.154 7.955 3.045l5.657-5.657C34.139 6.053 29.318 4 24 4c-7.681 0-14.355 4.337-17.694 10.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.212 0 9.996-1.997 13.557-5.255l-6.264-5.299A11.944 11.944 0 0 1 24 36c-5.173 0-9.62-3.316-11.283-7.946l-6.524 5.025C9.499 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.057 12.057 0 0 1-4.01 5.446l.003-.002 6.264 5.299C37.156 39.09 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}
