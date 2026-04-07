"use client";

import { motion } from "framer-motion";
import { Clock3, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LogoFull from "@/Images/pnp_logo_full.png";

export default function UnderMaintenancePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F5EF] px-6 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#FFBF00]/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#1F2A44]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-4xl flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image src={LogoFull} alt="PaynPrint" height={60} priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-3xl border border-[#1F2A44]/10 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-10"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFBF00]/35 bg-[#FFBF00]/10 px-4 py-2">
            {/* <Sparkles className="h-4 w-4 text-[#FFBF00]" /> */}
            <Wrench className="h-6 w-6 text-[#1F2A44]" />
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1F2A44]/80">
              Planned upgrade in progress
            </span>
          </div>
          <div className="mb-6 flex items-center gap-3">
            {/* <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F2A44]/8"></span> */}
            <h1 className="text-3xl font-bold text-[#1F2A44] text-center sm:text-4xl">
              PaynPrint is under maintenance <br /> we&apos;ll be back shortly
            </h1>
          </div>

          <p className="mb-8 text-base leading-relaxed text-[#1F2A44]/70 sm:text-lg">
            Our website is under maintenance to make your printing experience
            faster and smoother. We&apos;ll be back shortly.
          </p>

          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#1F2A44]/10 bg-[#F7F5EF] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#FFBF00]" />
                <p className="text-sm font-semibold text-[#1F2A44]">
                  Expected downtime
                </p>
              </div>
              <p className="text-sm text-[#1F2A44]/70">A short while only.</p>
            </div>
            <div className="rounded-2xl border border-[#1F2A44]/10 bg-[#F7F5EF] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#FFBF00]" />
                <p className="text-sm font-semibold text-[#1F2A44]">
                  What&apos;s improving
                </p>
              </div>
              <p className="text-sm text-[#1F2A44]/70">
                Better speed, cleaner flow, and stronger reliability.
              </p>
            </div>
          </div>

          {/* <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="w-full rounded-full bg-[#1F2A44] px-6 py-3 text-center text-sm font-bold text-[#F7F5EF] transition-all hover:bg-[#2A3A5A]"
            >
              Back to Home
            </Link>
            <Link
              href="/kiosks"
              className="w-full rounded-full border border-[#1F2A44]/15 bg-[#FFBF00]/90 px-6 py-3 text-center text-sm font-bold text-[#1F2A44] transition-all hover:bg-[#D4A520]"
            >
              Check Kiosk Status
            </Link>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}
