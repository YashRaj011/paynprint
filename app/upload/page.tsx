"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
} from "@heroui/react";
import EastIcon from "@mui/icons-material/East";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploadIsInvalid, setFileUploadIsInvalid] = useState(false);
  const [showFileSpecsForm, setShowFileSpecsForm] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleInitialUpload(evt: React.FormEvent) {
    setIsLoading(true);
    evt.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;
    if (fileInputRef.current?.files?.[0].type != "application/pdf") {
      setFileUploadIsInvalid(true);
      
      setFileUploadIsInvalid(false);
    }
    setShowFileSpecsForm(true);
  }

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
      {fileUploadLoading && (
        <div>
          {/* This will be a modal to display that the file is being sent to server and add a loader that says the file is being printed umtil we get a 
          response from the pi or until the papers are printed */}
        </div>
      )}
    </div>
  );
}
