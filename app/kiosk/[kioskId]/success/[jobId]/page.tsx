"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { ArrowLeft, CheckCircle2, Currency, Mail, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CurrentFileDetails,
  CurrentKioskDetails,
  PrintJobObject,
} from "../../review/[draftId]/page";
import Link from "next/link";
import Image from "next/image";
import ShortLogo from "@/Images/pnp_logo-cropped.svg";

interface printJobSuccessResponse {
  job: PrintJobObject;
  file?: CurrentFileDetails;
  kiosk?: CurrentKioskDetails;
}

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
  "Collect your printed pages.",
];

export default function PaymentSuccess(
  {
    // printCode,
    // email,
    // kioskName = "KIOSK-A-101",
    // supportPhone = "+91 98765 43210",
    // supportEmail = "support@paynprint.com",
    // onDone,
    // }: PrintSuccessProps) {
  },
) {
  const params = useParams();
  const jobId = params?.jobId;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [printCode, setPrintCode] = useState<string>("");
  const [kioskName, setKioskName] = useState<string>("");

  const FetchPrintJob = async () => {
    setIsLoading(true);
    setLoadingMessage("Fetching print code");
    try {
      const printJobResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/printorder/${jobId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (printJobResponse.status === 200 || printJobResponse.status === 304) {
        const printJobResponseData =
          printJobResponse.data as printJobSuccessResponse;
        const currentPrintCode = printJobResponseData.job.printCode;
        setPrintCode(currentPrintCode);
        setKioskName(printJobResponseData.kiosk!.name);
      } else {
        setPrintCode("");
        setKioskName("");
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    FetchPrintJob();
  }, []);

  console.log("print code global", printCode);
  console.log(isLoading);

  return (
    <div className="min-h-screen bg-[#F7F5EF] w-full max-w-full">
      {isLoading ? (
        <Loading text={loadingMessage} />
      ) : (
        <>
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#1F2A44]/10">
            <nav className="max-w-7xl w-full mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/kiosks">
                  <span className="p-2 hover:bg-[#1F2A44]/5 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#1F2A44]" />
                  </span>
                  <Image src={ShortLogo} alt="short-logo" height={35} />
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-[#1F2A44]/60">Step 3 of 3</span>
              </div>
            </nav>
          </header>
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
                  <p className="mt-2 text-5xl font-bold tracking-[0.12em] text-[#1F2A44] sm:text-6xl">
                    {printCode}
                  </p>
                  {/* <p className="mt-4 text-sm font-semibold text-[#1F2A44]/75 sm:text-base">
                    This code has been sent to your email:{" "}
                    <span className="font-bold text-[#1F2A44]">
                      "yashrajvarma9@gmail.com"
                    </span>
                  </p> */}
                </div>

                {/* <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D7F4F1] px-4 py-2 text-sm font-semibold text-[#1F2A44]">
                  <Mail className="h-4 w-4 text-[#20B2AA]" />
                  Delivery confirmed to inbox
                </div> */}

                {/* {onDone ? (
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
              ) : null} */}
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
                      +91 98765 43210
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F7F5EF] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8B9584]">
                      Email Support
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-base font-bold text-[#1F2A44]">
                      <Mail className="h-4 w-4 text-[#20B2AA]" />
                      support@paynprint.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
