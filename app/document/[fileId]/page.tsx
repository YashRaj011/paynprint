"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function CustomizePrintPage({
  params,
}: {
  params: Promise<{ fileId: string }>;
}) {
  const [copies, setCopies] = useState("1");
  const [layout, setLayout] = useState("portrait");
  const [pagesOption, setPagesOption] = useState("all");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [includeLastPage, setIncludeLastPage] = useState(true);
  const [printColor, setPrintColor] = useState("Black And White");
  const router = useRouter();
  console.log("File ID:", params);

  async function handleFinalUpload(evt: React.FormEvent) {
    evt.preventDefault();

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
    <div>
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
  );
}
