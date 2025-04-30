"use client";
import { Button, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <h1 className="text-4xl font-bold mb-4">PaynPrint</h1>
      <p className="text-lg mb-4">
        Your one-stop solution for printing documents with ease.
      </p>
      <p className="text-lg mt-4">
        Upload your documents and let us handle the printing for you.
      </p>
      <div className="mt-8">
        <Button
          variant="shadow"
          color="secondary"
          onPress={() => {
            setIsLoading(true);
            setTimeout(() => {
              router.push("/upload");
            }, 1000); // Simulate a loading delay
          }}
        >
          Upload Document
          {isLoading && (
            <div>
              <Spinner color="white" size="sm"/>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
