"use client";
import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
import {
  Button,
  Input,
} from "@heroui/react";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";


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
  // const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
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
        amount: 100,
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



    handlePayment();
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F7F5EF]">
      <div>
        <form onSubmit={handleInitialUpload} className="flex flex-col gap-4">
          <Input
            label="Select Document to Print"
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            required
            labelPlacement="outside"
            classNames={{
              label: "text-[#1F2A44] text-lg font-bold sm:font-semibold",
              innerWrapper: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
              inputWrapper: [
                "shadow-xl",
                "border-[#1F2A44] border-2",
                "bg-[F7F5EF]",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-[#F7F5EF]",
                "group-data-[focus=true]:bg-[#F7F5EF]",
                "cursor-pointer",
              ],
              mainWrapper: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
              base: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
              helperWrapper: "bg-[#F7F5EF] hover:bg-[#F7F5EF]",
            }}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="shadow"
              className="bg-[#FCC201] text-[#1F2A44] text-md sm:text-sm font-extrabold sm:font-bold hover:text-[#FCC201] hover:bg-[#1F2A44] shadow-xl"
            >
              Customize Print <EastIcon />
            </Button>
          </div>
        </form>
      </div>
      {fileUploadIsInvalid && (
        <div>
          {/* This will be a modal to display that the file is being converted to appropriate type to print efficiently and add a loader */}
        </div>
      )}

    </div>
  );
}
