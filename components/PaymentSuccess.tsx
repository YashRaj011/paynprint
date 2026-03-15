"use client";

import { CheckCircle2, Mail, Phone } from "lucide-react";
import { useEffect } from "react";

interface PrintSuccessProps {
  printCode: string;
  email: string;
  kioskName?: string;
  supportPhone?: string;
  supportEmail?: string;
  onDone?: () => void;
}

const collectionSteps = [
  'Go to your selected kiosk and tap "Start Print" on screen.',
  'Choose "Enter Print Code" and type your code exactly.',
  'Collect your printed pages.',
];

export default function PaymentSuccess({
  printCode,
  email,
  kioskName = "KIOSK-A-101",
  supportPhone = "+91 98765 43210",
  supportEmail = "support@paynprint.com",
  onDone,
}: PrintSuccessProps) {

  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-[#F7F5EF] p-4 sm:p-6 md:p-8 md:mt-16 mt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-[#20B2AA]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-[#FFBF00]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-245 space-y-8">
        <div className="rounded-3xl border border-[#1F2A44]/10 bg-white p-6 text-center shadow-[0_10px_24px_rgba(31,42,68,0.08)] sm:p-8 md:p-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#20B2AA]/15 text-[#20B2AA]">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h2 className="font-cormorant text-4xl font-bold text-[#1F2A44] sm:text-5xl">
            Payment Successful
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-[#1F2A44]/70 sm:text-lg">
            Your print job is confirmed and your print code is now ready.
          </p>

          <div className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-[#FFBF00]/30 bg-[#FFBF00]/10 px-5 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B9584]">
              Print Code
            </p>
            <p className="mt-2 font-cormorant text-5xl font-bold tracking-[0.12em] text-[#1F2A44] sm:text-6xl">
              {printCode}
            </p>
            <p className="mt-4 text-sm font-semibold text-[#1F2A44]/75 sm:text-base">
              This code has been sent to your email:{" "}
              <span className="font-bold text-[#1F2A44]">{email}</span>
            </p>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D7F4F1] px-4 py-2 text-sm font-semibold text-[#1F2A44]">
            <Mail className="h-4 w-4 text-[#20B2AA]" />
            Delivery confirmed to inbox
          </div>

          {onDone ? (
            <div className="mt-8">
              <button
                type="button"
                onClick={onDone}
                className="inline-flex items-center justify-center rounded-xl bg-[#1F2A44] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2A3A5A]"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                Done
              </button>
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl border border-[#1F2A44]/10 bg-white p-6 shadow-[0_8px_20px_rgba(31,42,68,0.08)] sm:p-7 md:p-8">
          <h3 className="font-cormorant text-3xl font-bold text-[#1F2A44] sm:text-4xl">
            Collect Your Print in 4 Steps
          </h3>
          <p className="mt-2 text-sm font-medium text-[#1F2A44]/70 sm:text-base">
            Pickup location:{" "}
            <span className="font-bold text-[#1F2A44]">{kioskName}</span>
          </p>

          <ol className="mt-6 space-y-4">
            {collectionSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl bg-[#F7F5EF] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFBF00] text-sm font-extrabold text-[#1F2A44]">
                  {index + 1}
                </div>
                <p className="pt-0.5 text-sm font-semibold text-[#1F2A44] sm:text-base">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-[#1F2A44]/10 bg-white p-6 shadow-[0_8px_20px_rgba(31,42,68,0.08)] sm:p-7">
          <h4 className="font-cormorant text-2xl font-bold text-[#1F2A44] sm:text-3xl">
            Need Help?
          </h4>
          <p className="mt-2 text-sm font-medium text-[#1F2A44]/70 sm:text-base">
            If you face any issue while collecting your print, contact us.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#F7F5EF] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B9584]">
                Phone Support
              </p>
              <p className="mt-2 flex items-center gap-2 text-base font-bold text-[#1F2A44]">
                <Phone className="h-4 w-4 text-[#20B2AA]" />
                {supportPhone}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F5EF] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B9584]">
                Email Support
              </p>
              <p className="mt-2 flex items-center gap-2 text-base font-bold text-[#1F2A44]">
                <Mail className="h-4 w-4 text-[#20B2AA]" />
                {supportEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
