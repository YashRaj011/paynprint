"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  X,
  FileText,
  Settings,
  Check,
  CreditCard,
  ArrowLeft,
  Printer,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Loading from "@/components/Loading";
// import DocumentPreview from "@/components/DocumentPreview";

interface PaymentData {
  orderId: string;
  state: string;
  expiresAt: number;
  redirectUrl: string;
}
interface PaymentResponse {
  success: string;
  payData: PaymentData;
}

interface PrintSettings {
  copies: number;
  colorMode: "bw" | "color";
  paperSize: string;
  orientation: "portrait" | "landscape";
  sides: "single" | "double";
  quality: "standard";
}

interface fileProperties {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  pageCount: number;
  uploadedAt: Date;
  previewAvailable: string;
}

interface fileResponse {
  message: string;
  file: fileResponseProperties;
  previewError?: string;
}
interface fileResponseProperties {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  pageCount: number;
  uploadedAt: Date;
  previewAvailable: string;
}

declare global {
  interface Window {
    PhonePeCheckout: any;
  }
}

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploadIsInvalid, setFileUploadIsInvalid] = useState(false);
  // const [showFileSpecsForm, setShowFileSpecsForm] = useState(false);
  // const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [fileProperties, setfileProperties] = useState<fileProperties | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | "">("");

  // Print settings state
  const [printSetting, setprintSetting] = useState<PrintSettings>({
    copies: 1,
    colorMode: "bw",
    paperSize: "a4",
    orientation: "portrait",
    sides: "single",
    quality: "standard",
  });

  // Pricing
  const pricing = {
    bw: { single: 2.5, double: 4 },
    color: { single: 5, double: 10 },
  };

  const calculateTotal = () => {
    const pages = fileProperties?.pageCount ?? 0;
    const copies = printSetting.copies;
    const price = pricing[printSetting.colorMode];
    if (printSetting.sides === "single") {
      return {subtotal: pages * price.single, total: pages * price.single * copies};
    }
    const sheets = Math.floor(pages / 2);
    const hasExtraPage = pages % 2 !== 0;

    const perCopyTotal =
      sheets * price.double + (hasExtraPage ? price.single : 0);

    return {subtotal: perCopyTotal, total: perCopyTotal * copies};
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    handleFile(uploadedFile);
  };

  const handleFile = async (file: File) => {
    //ShowloadingIndicator
    //send file to server or process it as needed
    //get file response and file properties
    //hide loading indicator
    setIsLoading(true);
    
    setPreviewUrl(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const fileResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`,
        formData,
      );
      const fileResponseData = fileResponse.data as fileResponse;
      console.log("File response:", fileResponseData.message);
      setfileProperties({
        id: fileResponseData.file.id,
        originalName: fileResponseData.file.originalName,
        mimeType: fileResponseData.file.mimeType,
        size: Number((fileResponseData.file.size / 1024).toFixed(2)),
        pageCount: fileResponseData.file.pageCount,
        uploadedAt: new Date(fileResponseData.file.uploadedAt),
        previewAvailable: fileResponseData.file.previewAvailable,
      });
      console.log("File properties set");

      if (fileResponseData.file.previewAvailable) { 
        setPreviewUrl(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload/${fileResponseData.file.id}/preview/`);
      }
    }
    catch (err) { console.error("File upload error:", err) }
    finally {
      setIsLoading(false);
    }
  };
  const [res, setRes] = useState<PaymentResponse>();

  const generateMerchantOrderId = (): string => {
    const randomStr = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    return `ORD-${randomStr}-${timestamp}`;
  };

  function callback(response: string) {
    if (response === "USER_CANCEL") {
      /* Add merchant's logic if they have any custom thing to trigger on UI after the transaction is cancelled by the user*/
      console.log("Transaction cancelled by user");
      return;
    } else if (response === "CONCLUDED") {
      console.log("Transaction concluded successfully");
      /* Add merchant's logic if they have any custom thing to trigger on UI after the transaction is in terminal state*/
      return;
    }
  }

  const handlePayment = async () => {
    const merchantOrderId = generateMerchantOrderId();
    try {
      const ApiRes = await axios.post("/api/phonepe/createPayment", {
        merchantOrderId: merchantOrderId,
        amount: calculateTotal().total * 100, // Amount in paise
      });
      console.log("Response:", ApiRes.data);
      setRes(ApiRes.data as PaymentResponse);

      if (window && window.PhonePeCheckout && window.PhonePeCheckout.transact) {
        console.log("PhonePeCheckout is available", window.PhonePeCheckout);
        console.log("res : ", res);
        console.log("response : ", ApiRes.data);
        window.PhonePeCheckout.transact({
          tokenUrl: ApiRes.data?.payData.redirectUrl,
          callback,
          type: "IFRAME",
        });
      }
    } catch (err: any) {
      console.error("Axios error:", err.response?.data || err.message);
    }
  };

  async function handleInitialUpload(evt: React.FormEvent) {
    // setIsLoading(true);
    evt.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;
    if (fileInputRef.current?.files?.[0].type != "application/pdf") {
      setFileUploadIsInvalid(true);
      setFileUploadIsInvalid(false);
    }
    // setShowFileSpecsForm(true);

    // handlePayment();
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("PhonePe script loaded", window.PhonePeCheckout);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      {/* Header */}
      {isLoading ? (
        <Loading text="Processing your document" />
      ) : (
        <>
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#1F2A44]/10">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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

              <div className="flex items-center gap-4">
                <span className="text-sm text-[#1F2A44]/60">Step 1 of 3</span>
              </div>
            </nav>
          </header>

          <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#1F2A44] mb-4 font-cormorant">
                  Upload Your Document to get started
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#1F2A44]/70">
                  Drag and drop or click to select your files
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Upload Area - Left Side */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {!fileProperties ? (
                      <div
                        className={`relative border-3 border-dashed rounded-3xl p-12 transition-all duration-300 ${
                          dragActive
                            ? "border-[#FFBF00] bg-[#FFBF00]/5"
                            : "border-[#1F2A44]/20 bg-white hover:border-[#FFBF00]/50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                          onChange={handleChange}
                        />

                        <div className="text-center">
                          <div className="w-24 h-24 bg-[#FFBF00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Upload className="w-12 h-12 text-[#FFBF00]" />
                          </div>

                          <h3 className="text-2xl font-bold text-[#1F2A44] mb-3">
                            Drop your files here{" "}
                          </h3>
                          <p className="text-[#1F2A44]/60 mb-6">
                            or click to browse from your device
                          </p>

                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-8 py-4 bg-[#1F2A44] text-white font-semibold rounded-full hover:bg-[#2A3A5A] transition-all"
                          >
                            Select File
                          </button>

                          <div className="mt-8 text-sm text-[#1F2A44]/50">
                            Supported formats: PDF, DOC, DOCX, TXT, JPG, JPEG,
                            PNG (Max 50MB)
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full max-w-full space-y-6 bg-white rounded-3xl  p-8 border border-[#1F2A44]/10">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-[#FFBF00]/10 rounded-2xl flex items-center justify-center">
                              <FileText className="w-8 h-8 text-[#FFBF00]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-[#1F2A44] mb-1">
                                {fileProperties.originalName}
                              </h3>
                              <p className="text-sm text-[#1F2A44]/60">
                                {fileProperties.size} KB •{" "}
                                {fileProperties.pageCount} pages
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setfileProperties(undefined)}
                            className="p-2 hover:bg-[#1F2A44]/5 rounded-full transition-colors"
                          >
                            <X className="w-5 h-5 text-[#1F2A44]/60" />
                          </button>
                        </div>

                        <div className="bg-[#F7F5EF] flex justify-center rounded-2xl p-4 sm:p-6 md:p-8 mb-6">
                          <div className="aspect-[8.5/11] max-h-[70vh] bg-white rounded-lg shadow-lg flex items-center justify-center">
                            <div className="text-center">
                              {/* <FileText className="w-16 h-16 text-[#1F2A44]/20 mx-auto mb-4" />{" "} */}
                              <p className="text-sm text-[#1F2A44]/40">
                                {/*fileInputRef && (
                                <DocumentPreview
                                  file={fileInputRef.current?.files?.[0]}
                                />
                              )*/}
                                <img
                                      alt={
                                        fileProperties.originalName ||
                                        "File preview"
                                      }
                                      src={previewUrl}
                                      className={`w-full h-full object-contain grayscale ${printSetting.orientation === "landscape" ? "rotate-90" : ""}`}
                                />
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Print Settings */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                            <Settings className="w-5 h-5 text-[#FFBF00]" />
                            <h4 className="text-lg font-bold text-[#1F2A44]">
                              Print Settings
                            </h4>
                          </div>

                          {/* Copies */}
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-[#1F2A44]">
                              Number of Copies
                            </label>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    copies: Math.max(
                                      1,
                                      printSetting.copies - 1,
                                    ),
                                  })
                                }
                                className="w-10 h-10 bg-[#F7F5EF] rounded-full flex items-center justify-center hover:bg-[#1F2A44]/10 transition-colors font-bold"
                              >
                                -
                              </button>
                              <span className="w-12 text-center font-bold text-[#1F2A44]">
                                {printSetting.copies}
                              </span>
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    copies: Math.min(
                                      100,
                                      printSetting.copies + 1,
                                    ),
                                  })
                                }
                                className="w-10 h-10 bg-[#F7F5EF] rounded-full flex items-center justify-center hover:bg-[#1F2A44]/10 transition-colors font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Color Mode */}
                          <div>
                            <label className="text-sm font-semibold text-[#1F2A44] mb-2 block">
                              Color Mode
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    colorMode: "bw",
                                  })
                                }
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  printSetting.colorMode === "bw"
                                    ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                    : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                                }`}
                              >
                                <div className="font-semibold text-[#1F2A44]">
                                  Black & White
                                </div>
                                <div className="text-xs text-[#1F2A44]/60 mt-1">
                                  ₹{pricing["bw"].single}/page
                                </div>
                              </button>
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    colorMode: "color",
                                  })
                                }
                                disabled={true}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  printSetting.colorMode === "color"
                                    ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                    : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                                } cursor-not-allowed`}
                              >
                                <div className="font-semibold text-[#1F2A44]">
                                  Color
                                </div>
                                <div className="text-xs text-[#1F2A44]/60 mt-1">
                                  {/* ₹{pricing["color"].single}/page */}
                                  <div>Coming soon!</div>
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Paper Size */}
                          <div>
                            <label className="text-sm font-semibold text-[#1F2A44] mb-2 block">
                              Paper Size
                            </label>
                            <select
                              value={printSetting.paperSize}
                              onChange={(e) =>
                                setprintSetting({
                                  ...printSetting,
                                  paperSize: e.target.value,
                                })
                              }
                              className="w-full p-4 rounded-xl border-2 border-[#1F2A44]/10 bg-white focus:border-[#FFBF00] focus:outline-none transition-colors"
                            >
                              <option value="a4">A4 (210 × 297 mm)</option>
                              <option value="letter" disabled>
                                Letter (8.5 × 11 in)
                              </option>
                              <option value="legal" disabled>
                                Legal (8.5 × 14 in)
                              </option>
                            </select>
                          </div>

                          {/* Orientation */}
                          <div>
                            <label className="text-sm font-semibold text-[#1F2A44] mb-2 block">
                              Orientation
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    orientation: "portrait",
                                  })
                                }
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  printSetting.orientation === "portrait"
                                    ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                    : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                                }`}
                              >
                                <div className="font-semibold text-[#1F2A44]">
                                  Portrait
                                </div>
                              </button>
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    orientation: "landscape",
                                  })
                                }
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  printSetting.orientation === "landscape"
                                    ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                    : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                                }`}
                              >
                                <div className="font-semibold text-[#1F2A44]">
                                  Landscape
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Sides */}
                          <div>
                            <label className="text-sm font-semibold text-[#1F2A44] mb-2 block">
                              Print Sides
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    sides: "single",
                                  })
                                }
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  printSetting.sides === "single"
                                    ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                    : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                                }`}
                              >
                                <div className="font-semibold text-[#1F2A44]">
                                  Single-sided
                                </div>
                              </button>
                              <button
                                onClick={() =>
                                  setprintSetting({
                                    ...printSetting,
                                    sides: "double",
                                  })
                                }
                                disabled={fileProperties.pageCount < 2}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  printSetting.sides === "double"
                                    ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                    : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                                } ${fileProperties.pageCount < 2 ? "hidden" : ""}`}
                              >
                                <div className="font-semibold text-[#1F2A44]">
                                  Double-sided
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Quality */}
                          {/* <div>
                          <label className="text-sm font-semibold text-[#1F2A44] mb-2 block">
                            Print Quality
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() =>
                                setSettings({
                                  ...settings,
                                  quality: "standard",
                                })
                              }
                              className={`p-4 rounded-xl border-2 transition-all ${
                                settings.quality === "standard"
                                  ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                  : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                              }`}
                            >
                              <div className="font-semibold text-[#1F2A44]">
                                Standard
                              </div>
                              <div className="text-xs text-[#1F2A44]/60 mt-1">
                                Regular
                              </div>
                            </button> */}
                          {/* <button
                              onClick={() =>
                                setSettings({ ...settings, quality: "high" })
                              }
                              className={`p-4 rounded-xl border-2 transition-all ${
                                settings.quality === "high"
                                  ? "border-[#FFBF00] bg-[#FFBF00]/5"
                                  : "border-[#1F2A44]/10 bg-white hover:border-[#FFBF00]/30"
                              }`}
                            >
                              <div className="font-semibold text-[#1F2A44]">
                                High Quality
                              </div>
                              <div className="text-xs text-[#1F2A44]/60 mt-1">
                                +20%
                              </div>
                            </button> */}
                          {/* </div> */}
                          {/* </div> */}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Payment Summary - Right Side */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="md:sticky md:top-32"
                  >
                    <div className="bg-white rounded-3xl p-8 border border-[#1F2A44]/10">
                      <div className="flex items-center gap-2 mb-6">
                        <CreditCard className="w-5 h-5 text-[#FFBF00]" />
                        <h3 className="text-xl font-bold text-[#1F2A44]">
                          Payment Summary
                        </h3>
                      </div>

                      {fileProperties ? (
                        <div className="space-y-4">
                          {/* Pricing Breakdown */}
                          <div className="space-y-3 pb-4 border-b border-[#1F2A44]/10">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#1F2A44]/70">Pages</span>
                              <span className="font-semibold text-[#1F2A44]">
                                {fileProperties.pageCount}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-[#1F2A44]/70">Copies</span>
                              <span className="font-semibold text-[#1F2A44]">
                                {printSetting.copies}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-[#1F2A44]/70">
                                Color Mode
                              </span>
                              <span className="font-semibold text-[#1F2A44]">
                                {printSetting.colorMode === "bw"
                                  ? "B&W"
                                  : "Color"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-[#1F2A44]/70">
                                Print Sides
                              </span>
                              <span className="font-semibold text-[#1F2A44]">
                                {printSetting.sides === "single"
                                  ? "Single"
                                  : "Double"}
                              </span>
                            </div>
                            {/* <div className="flex justify-between text-sm">
                          <span className="text-[#1F2A44]/70">Quality</span>
                          <span className="font-semibold text-[#1F2A44]">
                            {settings.quality === "standard"
                              ? "Standard"
                              : "High"}
                          </span>
                        </div> */}
                          </div>

                          {/* Price Details */}
                          <div className="space-y-3 pb-4 border-b border-[#1F2A44]/10">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#1F2A44]/70">
                                Base Price
                              </span>
                              <span className="font-semibold text-[#1F2A44]">
                                ₹
                                {
                                  pricing[printSetting.colorMode][
                                    printSetting.sides === "single"
                                      ? "single"
                                      : "double"
                                  ]
                                }
                                /
                                {printSetting.sides === "single"
                                  ? "Page"
                                  : "Paper"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-[#1F2A44]/70">
                                Subtotal
                              </span>
                              <span className="font-semibold text-[#1F2A44]">
                                ₹{calculateTotal().subtotal}
                              </span>
                            </div>
                            {/* {settings.quality === "high" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#1F2A44]/70">
                              Quality Premium
                            </span>
                            <span className="font-semibold text-[#1F2A44]">
                              +20%
                            </span>
                          </div>
                        )} */}
                          </div>

                          {/* Total */}
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-lg font-bold text-[#1F2A44]">
                              Total
                            </span>
                            <span className="text-3xl font-bold text-[#FFBF00] font-cormorant">
                              ₹{calculateTotal().total}
                            </span>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={handlePayment}
                            className="w-full mt-6 px-6 py-4 bg-[#FFBF00] text-white font-bold rounded-full hover:bg-[#D4A520] hover:shadow-xl hover:shadow-[#FFBF00]/20 transition-all flex items-center justify-center gap-2"
                          >
                            <Printer className="w-5 h-5" />
                            Proceed to Payment
                          </button>

                          {/* Features */}
                          <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-[#1F2A44]/70">
                              <Check className="w-4 h-4 text-[#20B2AA]" />
                              <span>Secure payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#1F2A44]/70">
                              <Check className="w-4 h-4 text-[#20B2AA]" />
                              <span>Instant processing</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#1F2A44]/70">
                              <Check className="w-4 h-4 text-[#20B2AA]" />
                              <span>Ready in 2 minutes</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-[#1F2A44]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-[#1F2A44]/30" />
                          </div>
                          <p className="text-sm text-[#1F2A44]/50">
                            Upload a document to see pricing
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Pricing Info */}
                    <div className="mt-6 bg-[#FFBF00]/5 rounded-2xl p-6 border border-[#FFBF00]/20">
                      <h4 className="font-bold text-[#1F2A44] mb-3">
                        Pricing Guide
                      </h4>
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
                          <span className="text-[#1F2A44]/70">
                            Color Single
                          </span>
                          <span className="font-semibold text-[#1F2A44]">
                            ₹{pricing["color"].single}/page
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#1F2A44]/70">
                            Color Double
                          </span>
                          <span className="font-semibold text-[#1F2A44]">
                            ₹{pricing["color"].double}/page
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

    // <div className="flex flex-col items-center justify-center h-screen bg-[#F7F5EF]">
    //   <div>
    //     <form onSubmit={handleInitialUpload} className="flex flex-col gap-4">
    //       <Input
    //         label="Select Document to Print"
    //         type="file"
    //         accept="application/pdf"
    //         ref={fileInputRef}
    //         required
    //         labelPlacement="outside"
    //         classNames={{
    //           label: "text-[#1F2A44] text-lg font-bold sm:font-semibold",
    //           innerWrapper: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
    //           inputWrapper: [
    //             "shadow-xl",
    //             "border-[#1F2A44] border-2",
    //             "bg-[F7F5EF]",
    //             "backdrop-blur-xl",
    //             "backdrop-saturate-200",
    //             "hover:bg-[#F7F5EF]",
    //             "group-data-[focus=true]:bg-[#F7F5EF]",
    //             "cursor-pointer",
    //           ],
    //           mainWrapper: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
    //           base: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
    //           helperWrapper: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
    //         }}
    //       />
    //       <div className="flex justify-end">
    //         <Button
    //           type="submit"
    //           variant="shadow"
    //           className="bg-[#FCC201] text-[#1F2A44] text-md sm:text-sm font-extrabold sm:font-bold hover:text-[#FCC201] hover:bg-[#1F2A44] shadow-xl"
    //         >
    //           Customize Print <EastIcon />
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    //   {fileUploadIsInvalid && (
    //     <div>
    //       {/* This will be a modal to display that the file is being converted to appropriate type to print efficiently and add a loader */}
    //     </div>
    //   )}

    // </div>
  );
}


// function PreviewRenderer({
//   file,
//   previewUrl,
// }: {
//   file: File | undefined;
//   previewUrl: string;
// }) {
//   const fileType = file?.type;

//   // 🟢 PDF preview
//   if (fileType === "application/pdf") {
//     return (
//       <iframe src={previewUrl} className="w-full h-[600px] border rounded" />
//     );
//   }

//   // 🟢 Image preview
//   if (fileType?.startsWith("image/")) {
//     return (
//       <img
//         src={previewUrl}
//         alt="Preview"
//         className="max-w-full max-h-[600px] rounded border"
//       />
//     );
//   }

//   // 🔴 Unsupported file
//   return (
//     <div className="p-4 border rounded bg-gray-100">
//       <p className="font-medium">Preview not available</p>
//       <p className="text-sm text-gray-600">{file?.name}</p>
//     </div>
//   );
// }
