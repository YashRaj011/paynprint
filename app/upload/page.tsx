"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploadIsInvalid, setFileUploadIsInvalid] = useState(false);
  const [showFileSpecsForm, setShowFileSpecsForm] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false); // Add the loading indicator on the button itself
  const router = useRouter();

  async function handleInitialUpload(evt: React.FormEvent) {
    evt.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;
    if (fileInputRef.current?.files?.[0].type != "application/pdf") {
      setFileUploadIsInvalid(true);
      // here set the loader to loading and convert the file to pdf
      // Get the file and update the formData with the converted file
      // set the fileInputRef to the converted file
      // fileInputRef.current.files[0] = convertedFile;
      setFileUploadIsInvalid(false);
    }
    setShowFileSpecsForm(true);
  }

  async function handleFinalUpload(evt: React.FormEvent) {
      evt.preventDefault();
      setFileUploadLoading(true);
    if (!fileInputRef.current?.files?.[0]) return;
    const formData = new FormData();
    formData.append("file", fileInputRef.current?.files?.[0]);
    // const res = await fetch(`http://192.168.2.136:5000/upload`, {
    //   method: "POST",
    //   body: formData,
    // });
    // if (res.ok) {
      //   router.refresh(); //Can be customized to show a success message or redirect to another page
      // setFileUploadLoading(false);
    // } else {
    //   console.error("Upload failed", await res.text());
    // }
      //   console.log("File uploaded successfully", fileInputRef.current.files[0]);
      router.refresh();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      {!showFileSpecsForm && (
        <div>
          <form onSubmit={handleInitialUpload} className="flex flex-col gap-4">
            <Input
              label="Select PDF"
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              className="w-fit"
              required
            />
            <Button
              type="submit"
              color="secondary"
              variant="shadow"
              className="w-fit"
            >
              Next
            </Button>
          </form>
        </div>
      )}
      {fileUploadIsInvalid && (
        <div>
          {/* This will be a modal to display that the file is being converted to appropriate type to print efficiently and add a loader */}
        </div>
      )}
      {showFileSpecsForm && (
        <div>
          {/* Update this form to have exact specifications */}
          <form className="flex flex-col gap-4" onSubmit={handleFinalUpload}>
            <Input label="Width" type="number" required />
            <Input label="Height" type="number" required />
            <Input label="Quantity" type="number" required />
            <Button
              type="submit"
              color="secondary"
              variant="shadow"
              className="w-fit"
            >
              Print Document
            </Button>
          </form>
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
