"use client";
import { Button, Link } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImg from "../Images/hero-section-img.jpg";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Home() {
  const [active, setActive] = useState(0);
  const Menus = [
    {
      name: "Home",
      dis: "translate-x-0",
      icon: (
        <HomeIcon
          className={`relative ${
            active === 0 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
          } "`}
          fontSize="inherit"
        />
      ),
    },
    {
      name: "Overview",
      dis: "translate-x-[91px]",
      icon: (
        <InfoIcon
          className={`relative ${
            active === 1 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
          } "`}
          fontSize="inherit"
        />
      ),
    },
    {
      name: "FAQ",
      dis: "translate-x-[182px]",
      icon: (
        <LiveHelpIcon
          className={`relative ${
            active === 2 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
          } "`}
          fontSize="inherit"
        />
      ),
    },
    {
      name: "Contact",
      dis: "translate-x-[272px]",
      icon: (
        <PhoneIcon
          className={`relative ${
            active === 3 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
          } "`}
          fontSize="inherit"
        />
      ),
    },
  ];
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F7F5EF]">
      {/* Header large screens */}
      <header className="hidden h-0 sm:block sm:sticky top-0 sm:h-18 z-10 bg-[#1F2A44] ">
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
          {/* <Link className="text-[#F7F5EF]" href="#locations">
            Locations
          </Link> */}
          <Link className="text-[#F7F5EF]" href="#faq">
            FAQ
          </Link>
          <Link className="text-[#F7F5EF]" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      {/* Header small screens */}
      <div className="bg-[#1F2A44] max-h-[4rem] px-6 rounded-xl bottom-5 left-[50%] -translate-x-1/2 fixed w-96 sm:hidden z-10">
        <ul className="flex relative justify-between w-full">
          <span
            className={`bg-[#F7F5EF] duration-500 ${Menus[active].dis} border-4 border-[#1F2A44] text-[#1F2A44] h-16 w-16 absolute
         -top-[29px] rounded-full`}
          >
            <span
              className="w-3.5 h-3.5 bg-[#1F2A44] absolute top-[28px] -left-[12.5px] 
          rounded-tr-[11px] shadow-myShadow1"
            ></span>
            <span
              className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
            ></span>
          </span>
          {Menus.map((menu, i) => (
            <li key={i} className="w-16 -mt-3">
              <a
                className="flex flex-col text-center pt-6"
                onClick={() => setActive(i)}
              >
                <span
                  className={`cursor-pointer text-3xl duration-500 ${
                    i === active && "-mt-8"
                  }`}
                >
                  {menu.icon}
                </span>
                <span
                  className={` ${
                    active === i
                      ? "translate-y-4 duration-700 opacity-100 text-[#F7F5EF] font-bold w-full"
                      : "opacity-0 translate-y-10"
                  } `}
                >
                  {menu.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Hero Section */}
      <section className="flex text-center px-4 gap-1 h-[calc(100vh-100px)] sm:h-[calc(100vh-72px)]">
        <div className="sm:flex justify-center items-center hidden w-0 sm:w-[10%]">
          <Image
            src={heroImg}
            alt="hero-section-img"
            className="relative object-cover w-96 h-xl"
          />
        </div>
        <div className="flex flex-col mt-20 mx-auto w-full sm:w-[50%]">
          <h1 className="text-5xl text-[#1F2A44] font-cormorant-garamond font-extrabold leading-snug mb-4">
            Upload, Pay and Print your Documents in Seconds.
          </h1>
          <p className="text-md mb-6 text-gray-600 font-nunito">
            From Upload to Output—Experience Premium Printing without the Wait.
          </p>
          <div className="flex flex-wrap flex-col sm:flex-row mt-24 sm:mt-0 justify-center items-center gap-4">
            <Button
              variant="shadow"
              className="font-bold bg-[#FCC201] text-[#F7F5EF] w-[90%] sm:w-fit"
              size="lg"
              onPress={() => router.push("/upload")}
            >
              Start Printing
            </Button>
            <Link
              href="#howitworks"
              underline="always"
              className="cursor-pointer ml-4 sm:ml-0 font-bold sm:font-semibold"
            >
              See how it works <NorthEastIcon />
            </Link>
          </div>
        </div>
        <div className="sm:flex justify-center items-center hidden w-0 sm:w-[10%]">
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
