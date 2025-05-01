'use client';

import { useState } from 'react';

export default function FileSpecsForm() {
  const [copies, setCopies] = useState(1);
  const [layout, setLayout] = useState('portrait');
  const [pagesOption, setPagesOption] = useState('all');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [includeLastPage, setIncludeLastPage] = useState(true);
  const [printColor, setPrintColor] = useState('bw'); // Default to B/W

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = {
      copies,
      layout,
      pagesOption,
      rangeStart,
      rangeEnd,
      includeLastPage,
      printColor,
    };
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-gray-200 rounded-3xl p-8 w-full max-w-md shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Copies</label>
          <input
            type="number"
            min={1}
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
            className="w-full p-3 rounded-xl shadow-inner focus:outline-none bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Layout</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="portrait"
                checked={layout === 'portrait'}
                onChange={(e) => setLayout(e.target.value)}
                className="accent-purple-600"
              />
              Portrait
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="landscape"
                checked={layout === 'landscape'}
                onChange={(e) => setLayout(e.target.value)}
                className="accent-purple-600"
              />
              Landscape
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Pages</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="all"
                checked={pagesOption === 'all'}
                onChange={() => setPagesOption('all')}
                className="accent-purple-600"
              />
              All
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="range"
                checked={pagesOption === 'range'}
                onChange={() => setPagesOption('range')}
                className="accent-purple-600"
              />
              Page Range
            </label>

            <div
              className={`transition-all duration-300 space-y-4 overflow-hidden ${
                pagesOption === 'range' ? 'opacity-100 max-h-[200px]' : 'opacity-0 max-h-0 pointer-events-none'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">From</label>
                  <input
                    type="number"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    className="w-full p-2 rounded-xl shadow-inner focus:outline-none bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">To</label>
                  <input
                    type="number"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    className="w-full p-2 rounded-xl shadow-inner focus:outline-none bg-white"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeLastPage}
                  onChange={(e) => setIncludeLastPage(e.target.checked)}
                  className="accent-purple-600"
                />
                <label className="text-sm">Include last page</label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
          <select
            value={printColor}
            onChange={(e) => setPrintColor(e.target.value)}
            className="w-full p-3 rounded-xl shadow-inner focus:outline-none bg-white"
          >
            <option value="bw">Black & White</option>
            <option value="color">Color</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded-xl bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition"
        >
          Print Document
        </button>
      </form>
    </div>
  );
}