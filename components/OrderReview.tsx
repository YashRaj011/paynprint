"use client";

import { CheckCircle2, FileText, Lock, PenIcon } from "lucide-react";
import { useEffect } from "react";


interface OrderPreviewProps {
  fileName: string;
  pageCount: number;
  paperSize?: string;
  copies: number;
  colorMode: string;
  sides: string;
  kioskId?: string;
  subtotal: number;
  total: number;
  paymentRef?: string;
  paymentComplete?: boolean;
  isProcessing?: boolean;
  handlePayment: () => void;
  ArchivePrintJob: () => void;
  basePriceType: string;
  basePrice: number;
  onConfirm?: () => void;
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

function formatLabel(mode: string) {
  return mode === "color" ? "Color" : "B/W";
}

function formatPaperSize(size?: string) {
  if (!size) return "A4";
  return size.toUpperCase();
}

export default function OrderPreview({
  fileName,
  pageCount,
  paperSize,
  copies,
  colorMode,
  sides,
  kioskId = "kiosk_001",
  subtotal,
  total,
  paymentRef = "TXN-20240218112345",
  paymentComplete = false,
  isProcessing = false,
  handlePayment = () => { },
  ArchivePrintJob = () => { },
  basePrice,
  basePriceType,
  onConfirm,
}: OrderPreviewProps) {

  const pricing = {
    bw: { single: 2.5, double: 4 },
    color: { single: 5, double: 10 },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-[#F7F5EF] p-4 sm:p-6 md:p-8 mt-18">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-[#FFBF00]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-[#20B2AA]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-245">
        <header className="text-center">
          <h2 className="font-cormorant text-4xl font-bold leading-tight text-[#1F2A44] sm:text-5xl md:text-6xl">
            Review Your Order
          </h2>
          <p className="mt-2 text-base font-semibold text-[#1F2A44]/70 sm:text-lg">
            Preview, pay, print. Done.
          </p>
        </header>

        <div className="mt-12 space-y-10 sm:space-y-12">
          <section>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-cormorant text-5xl leading-none text-[#E6C88E] sm:text-6xl">
                01
              </span>
              <h3 className="font-cormorant text-4xl font-bold leading-none text-[#1F2A44] sm:text-5xl">
                Print Details
              </h3>
            </div>

            <div className="rounded-3xl border border-[#1F2A44]/10 bg-white p-5 shadow-[0_8px_20px_rgba(31,42,68,0.08)] sm:p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFBF00]/10 text-[#FFBF00]">
                  <FileText className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#1F2A44] sm:text-base wrap-break-word w-70">
                    {fileName}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#1F2A44]/60 sm:text-sm">
                    {pageCount} pages • {formatPaperSize(paperSize)}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                <Metric
                  label="Copies"
                  value={`${copies}`}
                  valueClass="text-[#FFBF00]"
                />
                <Metric
                  label="Color"
                  value={formatLabel(colorMode)}
                  valueClass="text-[#20B2AA]"
                />
                <Metric
                  label="Sides"
                  value={sides === "double" ? "Double" : "Single"}
                  valueClass="text-[#8B9584]"
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8B9584]">
                    Kiosk
                  </p>
                  <p className="mt-1 text-[18px] font-extrabold leading-none tracking-wide text-[#1F2A44] sm:text-[20px]">
                    {kioskId}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-cormorant text-5xl leading-none text-[#8FD4D0] sm:text-6xl">
                02
              </span>
              <h3 className="font-cormorant text-4xl font-bold leading-none text-[#1F2A44] sm:text-5xl">
                Pricing
              </h3>
            </div>

            <div className="rounded-3xl border border-[#1F2A44]/10 bg-white p-5 shadow-[0_8px_20px_rgba(31,42,68,0.08)] sm:p-6 md:p-7">
              <div className="space-y-3 text-sm font-semibold sm:text-base">
                <PriceRow
                  label="Base Price"
                  value={`${currency.format(basePrice)} / ${basePriceType}`}
                />
              </div>
              <div className="space-y-3 text-sm font-semibold sm:text-base">
                <PriceRow label="Subtotal" value={currency.format(subtotal)} />
              </div>

              <div className="my-5 h-px bg-[#E5E0D6]" />

              <div className="flex items-center justify-between">
                <p className="font-cormorant text-[34px] font-bold leading-none text-[#1F2A44] sm:text-[38px]">
                  Total
                </p>
                <p className="font-cormorant text-[38px] font-bold leading-none text-[#FFBF00] sm:text-[42px]">
                  {currency.format(total)}
                </p>
              </div>
              <div className="mt-6 bg-[#FFBF00]/5 rounded-2xl p-6 border border-[#FFBF00]/20">
                <h4 className="font-bold text-[#1F2A44] mb-3">Pricing Guide</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#1F2A44]/70">B&W Single</span>
                    <span className="font-semibold text-[#1F2A44]">
                      ₹{pricing["bw"].single}/page
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1F2A44]/70">B&W Double</span>
                    <span className="font-semibold text-[#1F2A44]">
                      ₹{pricing["bw"].double}/page
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1F2A44]/70">Color Single</span>
                    <span className="font-semibold text-[#1F2A44]">
                      ₹{pricing["color"].single}/page
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1F2A44]/70">Color Double</span>
                    <span className="font-semibold text-[#1F2A44]">
                      ₹{pricing["color"].double}/page
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-cormorant text-5xl leading-none text-[#D9D0BC] sm:text-6xl">
                03
              </span>
              <h3 className="font-cormorant text-4xl font-bold leading-none text-[#1F2A44] sm:text-5xl">
                Payment
              </h3>
            </div>

            <div className="rounded-3xl border border-[#1F2A44]/10 bg-white p-5 shadow-[0_8px_20px_rgba(31,42,68,0.08)] sm:p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D7F4F1] text-[#20B2AA]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#1F2A44]">
                    {paymentComplete ? "Payment Complete" : "Ready to Pay"}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#1F2A44]/60 sm:text-sm">
                    {paymentComplete
                      ? `Credit Card • ${paymentRef}`
                      : "Confirm your payment to release print job."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12 gap-3">
          <button
            type="button"
            onClick={ArchivePrintJob}
            disabled={isProcessing}
            className="inline-flex select-none items-center gap-2 rounded-xl bg-[#1F2A44] px-7 py-3.5 text-sm font-bold text-[#FFBF00] shadow-[0_8px_18px_rgba(255,191,0,0.35)] transition-colors duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <PenIcon className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={handlePayment}
            disabled={isProcessing}
            className="inline-flex select-none items-center gap-2 rounded-xl text-[#1F2A44] px-7 py-3.5 text-sm font-bold bg-[#FFBF00] shadow-[0_8px_18px_rgba(255,191,0,0.35)] transition-colors duration-150 hover:bg-[#f4b500] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Lock className="h-4 w-4" />
            {isProcessing ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8B9584]">
        {label}
      </p>
      <p
        className={`mt-1 text-[28px] font-bold leading-none sm:text-[30px] ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold text-[#8B9584]">{label}</p>
      <p className="font-bold text-[#1F2A44]">{value}</p>
    </div>
  );
}
