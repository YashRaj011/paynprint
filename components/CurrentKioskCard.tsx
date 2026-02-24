"use client";

import Image, { StaticImageData } from "next/image";
import kioskImage from "../Images/kiosk_image.png"

interface KioskStatusProps {
  kioskName?: string;
  kioskPublicId?: string;
//   kioskImageUrl?: StaticImageData;
  location?: string;
  isOnline?: boolean;
}

export default function KioskStatus({
  kioskName,
  kioskPublicId,
//   kioskImageUrl = kioskImage,
  location,
  isOnline = true,
}: KioskStatusProps) {
  return (
    <div className="p-4 mb-6">
      <div className="flex gap-4">
        {/* Kiosk Image */}
        <div className="shrink-0 relative">
          <Image
            src={kioskImage}
            alt={kioskName || ""}
            className="w-20 h-20 rounded-xl object-contain border-2 border-white shadow-md"
          />
        </div>

        {/* Kiosk Info */}
        <div className="flex flex-col">
          <div className="flex gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{kioskName}</h3>
            {/* Status Badge on Image */}
            <div className="relative">
              <div
                className={`
                  w-4 h-4 rounded-full border-2 border-white
                  ${isOnline ? "bg-green-500" : "bg-red-500"}
                  ${isOnline ? "animate-pulse" : ""}
                `}
              />
              {isOnline && (
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-400 opacity-50 blur-sm animate-pulse" />
              )}
            </div>
          </div>
          {/* <p className="text-sm flex text-gray-600 font-medium">
                      Kiosk ID: <span className="font-mono">{kioskPublicId}</span>
          </p> */}
          {location && (
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
