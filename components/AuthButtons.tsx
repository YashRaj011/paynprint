"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LogOut, User, History } from "lucide-react";
import { apiFetch } from "@/lib/api";

type UserInfo = { id: string; email: string; name: string | null };

const USER_KEY = "pnp_user";

export function AuthButtons() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState("test@example.com");
  const [testName, setTestName] = useState("Test User");
  const [allowEmail, setAllowEmail] = useState("user@example.com");
  const [allowName, setAllowName] = useState("Test User");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const saveUser = (u: UserInfo | null) => {
    setUser(u);
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
  };

  const handleAllowUser = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/allow-user", {
        method: "POST",
        body: JSON.stringify({ email: allowEmail, name: allowName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      alert(data.message || "User allowed");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTestSignIn = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/test-signin", {
        method: "POST",
        body: JSON.stringify({ email: testEmail, name: testName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign in failed");
      saveUser(data.user);
      setShowSignIn(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
      saveUser(null);
    } catch {
      saveUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (idToken: string) => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign in failed");
      saveUser(data.user);
      setShowSignIn(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#1F2A44]/70 truncate max-w-[120px]" title={user.email}>
          {user.name || user.email}
        </span>
        <Link
          href="/history"
          className="flex items-center gap-1.5 text-sm font-semibold text-[#1F2A44]/70 hover:text-[#1F2A44]"
        >
          <History className="w-4 h-4" />
          History
        </Link>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#1F2A44] border border-[#1F2A44]/30 rounded-full hover:bg-[#1F2A44]/5 disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSignIn(!showSignIn)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1F2A44] border border-[#1F2A44]/30 rounded-full hover:bg-[#1F2A44]/5"
      >
        <User className="w-4 h-4" />
        Sign In
      </button>
      {showSignIn && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowSignIn(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-72 p-4 bg-white rounded-xl shadow-lg border border-[#1F2A44]/10">
            <p className="text-sm font-medium text-[#1F2A44] mb-2">Allow user (whitelist)</p>
            <input
              value={allowEmail}
              onChange={(e) => setAllowEmail(e.target.value)}
              placeholder="email"
              className="w-full p-2 mb-2 border rounded text-sm"
            />
            <input
              value={allowName}
              onChange={(e) => setAllowName(e.target.value)}
              placeholder="name"
              className="w-full p-2 mb-2 border rounded text-sm"
            />
            <button
              onClick={handleAllowUser}
              disabled={loading}
              className="w-full py-2 mb-4 bg-[#8B9584] text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "..." : "Allow User"}
            </button>
            <p className="text-sm font-medium text-[#1F2A44] mb-2">Test sign-in (dev)</p>
            <input
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="email"
              className="w-full p-2 mb-2 border rounded text-sm"
            />
            <input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="name"
              className="w-full p-2 mb-3 border rounded text-sm"
            />
            <button
              onClick={handleTestSignIn}
              disabled={loading}
              className="w-full py-2 bg-[#1F2A44] text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "..." : "Sign In (Test)"}
            </button>
            {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
              !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.includes("your_") && (
                <div className="mt-3 pt-3 border-t">
                  <GoogleSignInButton onCredential={handleGoogleCredential} />
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
}

function GoogleSignInButton({ onCredential }: { onCredential: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined" || !ref.current) return;

    const init = () => {
      const g = (window as unknown as { google?: { accounts: { id: { initialize: (o: object) => void; renderButton: (el: HTMLElement, opts: object) => void } } } }).google;
      if (!g?.accounts?.id?.renderButton) return;
      g.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: (res: { credential?: string }) => {
          if (res?.credential) onCredential(res.credential);
        },
      });
      g.accounts.id.renderButton(ref.current!, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
        width: 240,
      });
    };

    if ((window as unknown as { google?: unknown }).google) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
    return () => {
      try {
        document.body.removeChild(script);
      } catch {
        /* ignore */
      }
    };
  }, [mounted, onCredential]);

  return <div ref={ref} />;
}

