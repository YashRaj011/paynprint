"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthButtons } from "@/components/AuthButtons";
import { ArrowLeft, FileText } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface HistoryItem {
  id: string;
  printCode: string;
  status: string;
  paymentStatus: string;
  totalPrice: string;
  colorMode: string;
  paperSize: string;
  copies: number;
  createdAt: string;
  paidAt: string | null;
  printCompletedAt: string | null;
  file?: { id: string; originalName: string; pageCount: number } | null;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/users/me/history")
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Unauthorized");
        }
        const data = await res.json();
        setHistory(data.history || []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#1F2A44]/10">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-[#1F2A44]/5 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#1F2A44]" />
              </Link>
              <Link href="/" className="logo-text text-3xl">
                pnp
              </Link>
            </div>
            <AuthButtons />
          </div>
        </nav>
      </header>

      <div className="pt-24 px-4 md:px-6 pb-20 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1F2A44] mb-6">My Print History</h1>

        {loading && <p className="text-[#1F2A44]/60">Loading...</p>}
        {error && (
          <p className="text-red-600 mb-4">
            {error}. <Link href="/" className="underline">Sign in</Link> to view history.
          </p>
        )}
        {!loading && !error && history.length === 0 && (
          <p className="text-[#1F2A44]/60">No print history yet.</p>
        )}
        {!loading && !error && history.length > 0 && (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-[#1F2A44]/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFBF00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#FFBF00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1F2A44] truncate">
                      {item.file?.originalName || "Document"}
                    </p>
                    <p className="text-sm text-[#1F2A44]/60">
                      Code: {item.printCode} • {item.colorMode} • {item.paperSize} • {item.copies} copies
                    </p>
                    <p className="text-sm text-[#1F2A44]/60 mt-1">
                      ₹{item.totalPrice} • {item.status} • {item.paymentStatus}
                    </p>
                    <p className="text-xs text-[#1F2A44]/50 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
