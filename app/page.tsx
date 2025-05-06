"use client";
import { Button, Link } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImg from "../Images/hero-section-img.jpg";
import NorthEastIcon from "@mui/icons-material/NorthEast";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F7F5EF]">
      {/* Header */}
      <header className="sticky top-0 h-18 z-10 bg-[#1F2A44]">
        <nav className="flex items-center gap-20 w-fit text-sm h-full mx-auto p-5 text-[#F7F5EF] font-medium">
          <Link className="text-[#F7F5EF] font-bold text-lg" href="#">
            Logo
          </Link>
          <Link className="text-[#F7F5EF]" href="#">
            Home
          </Link>
          <Link className="text-[#F7F5EF]" href="#howitworks">
            How it works
          </Link>
          <Link className="text-[#F7F5EF]" href="#locations">
            Locations
          </Link>
          <Link className="text-[#F7F5EF]" href="#faq">
            FAQ
          </Link>
          <Link className="text-[#F7F5EF]" href="#contact">
            Contact
          </Link>
          <Button
            variant="ghost"
            className="font-bold text-white hover:text-[#1F2A44]"
          >
            Start Printing
          </Button>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="flex text-center px-4 gap-1  h-[calc(100vh-72px)]">
        <div className="flex justify-center items-center w-[10%]">
          <Image
            src={heroImg}
            alt="hero-section-img"
            className="relative object-cover w-96 h-xl"
          />
        </div>
        <div className="flex flex-col mt-20 mx-auto w-[50%]">
          <h1 className="text-5xl text-[#1F2A44] font-cormorant-garamond font-extrabold leading-snug mb-4">
            Upload, Pay and Print your Documents in Seconds.
          </h1>
          <p className="text-md mb-6 text-gray-600 font-nunito">
            From Upload to Output—Experience Premium Printing without the Wait.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="shadow"
              className="font-bold bg-[#FCC201] text-[#F7F5EF]"
            >
              Start Printing
            </Button>
            <Link
              href="#howitworks"
              underline="always"
              className="cursor-pointer"
            >
              See how it works <NorthEastIcon />
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center  w-[10%]">
          <Image
            src={heroImg}
            alt="hero-section-img"
            className="relative object-cover w-96 h-xl"
          />
        </div>
      </section>

      {/* Commitment Section */}
      <section className="text-center py-10 px-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">
          Our Commitment to Quality
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          At Pay N Print, we believe that quality is paramount to every print
          job. Our team uses state-of-the-art technologies and ensures every
          project is clean and professional.
        </p>
      </section>

      {/* Image Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">
        <img
          src="/images/print1.jpg"
          alt="Printing"
          className="w-full rounded shadow"
        />
        <img
          src="/images/print2.jpg"
          alt="Print station"
          className="w-full rounded shadow"
        />
        <img
          src="/images/print3.jpg"
          alt="Printer"
          className="w-full rounded shadow"
        />
        <img
          src="/images/print4.jpg"
          alt="Technician"
          className="w-full rounded shadow"
        />
        <img
          src="/images/print5.jpg"
          alt="Office printing"
          className="w-full rounded shadow"
        />
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-10 bg-gray-50 text-gray-600">
        <p className="mb-2">Contact Us</p>
        <p className="mb-1">Better yet, see us in person!</p>
        <p className="mb-4">
          We love our customers, so feel free to visit during normal business
          hours.
        </p>
        <div className="font-semibold">Pay N Print</div>
      </footer>
    </main>
  );
}
