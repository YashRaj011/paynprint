"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@heroui/react";

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploadIsInvalid, setFileUploadIsInvalid] = useState(false);
  const [showFileSpecsForm, setShowFileSpecsForm] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false); // Add the loading indicator on the button itself
  const [copies, setCopies] = useState("1");
  const [layout, setLayout] = useState("portrait");
  const [pagesOption, setPagesOption] = useState("all");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [includeLastPage, setIncludeLastPage] = useState(true);
  const [printColor, setPrintColor] = useState('Black And White');
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
          <form
            className="flex flex-col gap-4 bg-gray-200 rounded-3xl p-8 w-[350px] shadow-xl space-y-6"
            onSubmit={handleFinalUpload}
          >
            <Input
              label="Copies"
              type="number"
              required
              variant="bordered"
              labelPlacement="outside"
              placeholder="Number Of Copies"
              color="secondary"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="bg-white rounded-2xl font-bold"
            />
            <label className="block text-sm font-bold text-[#7828C8] -mb-1">
              Layout
            </label>
            <RadioGroup
              color="secondary"
              defaultValue="potrait"
              orientation="horizontal"
              value={layout}
              onValueChange={(e) => setLayout(e)}
            >
              <Radio value="potrait">Potrait</Radio>
              <Radio value="landscape">Landscape</Radio>
            </RadioGroup>
            <div>
              <label className="block text-sm font-bold text-[#7828C8] mb-2">
                Pages
              </label>
              <div className="flex flex-col gap-2">
                <RadioGroup
                  color="secondary"
                  defaultValue="all"
                  value={pagesOption}
                  onValueChange={(e) => setPagesOption(e)}
                >
                  <Radio value="all">All</Radio>
                  <Radio value="page-range">Page Range</Radio>
                </RadioGroup>

                <div
                  className={`transition-all duration-300 space-y-4 overflow-hidden ${
                    pagesOption === "page-range"
                      ? "opacity-100 max-h-[200px]"
                      : "opacity-0 max-h-0 pointer-events-none"
                  }`}
                >
                  <div className="flex gap-4">
                    <Input
                      label="From"
                      type="number"
                      value={rangeStart}
                      onChange={(e) => setRangeStart(e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder=" "
                      color="secondary"
                      className="bg-white rounded-2xl font-semibold"
                    />
                    <Input
                      label="To"
                      type="number"
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder=" "
                      color="secondary"
                      className="bg-white rounded-2xl font-semibold"
                    />
                  </div>
                  <Checkbox
                    defaultSelected
                    color="secondary"
                    isSelected={includeLastPage}
                    onValueChange={(e) => setIncludeLastPage(e)}
                  >
                    Include Last Page
                  </Checkbox>
                </div>
              </div>
            </div>
            <label className="block text-sm font-bold text-[#7828C8] -mb-1">
                Output Color Mode
              </label>
            <Select
              className="bg-white rounded-2xl font-bold text-[#7828C8]"
              required
              labelPlacement="outside"
              placeholder="Select Colour"
              defaultSelectedKeys={["Black And White"]}
              disabledKeys={["Black And White", "Color"]}
              onChange={(e) => setPrintColor(e.target.value)}
            >
              <SelectItem key="Black And White">{printColor}</SelectItem>
              <SelectItem key="Color">Color</SelectItem>
            </Select>
            <Button
              type="submit"
              color="secondary"
              variant="shadow"
              className="w-full m-auto"
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
