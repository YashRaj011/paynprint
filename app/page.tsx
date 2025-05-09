"use client";
import { Button, Link } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImg from "../Images/hero-section-img.jpg";
import printImg from "../Images/print-img.jpg";
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
      name: "HOME",
      dis: "translate-x-0",
      icon: (
        <HomeIcon
          className={`relative ${
            active === 0 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
          } "`}
          fontSize="inherit"
          onClick={() =>
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      ),
    },
    {
      name: "OVERVIEW",
      dis: "translate-x-[91px]",
      icon: (
        <InfoIcon
          className={`relative ${
            active === 1 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
          } "`}
          fontSize="inherit"
          onClick={() =>
            document
              .getElementById("howitworks")
              ?.scrollIntoView({ behavior: "smooth" })
          }
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
          onClick={() =>
            document
              .getElementById("faq")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      ),
    },
    {
      name: "CONTACT",
      dis: "translate-x-[272px]",
      icon: (
        <PhoneIcon
          className={`relative ${
            active === 3 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
          } "`}
          fontSize="inherit"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      ),
    },
  ];
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F7F5EF] font-nunito">
      {/* Header large screens */}
      <header className="hidden h-0 sm:block sm:sticky top-0 sm:h-18 z-10 bg-[#1F2A44] ">
        <nav className="flex items-center gap-20 w-fit text-sm h-full mx-auto p-5 text-[#F7F5EF] font-medium">
          <Link
            className="text-[#F7F5EF] font-bold text-lg cursor-pointer"
            onPress={() => router.push("/")}
          >
            Logo
          </Link>
          <Link
            className="text-[#F7F5EF] cursor-pointer"
            onPress={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Home
          </Link>
          <Link
            className="text-[#F7F5EF] cursor-pointer"
            onPress={() =>
              document
                .getElementById("howitworks")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            How it works
          </Link>
          {/* <Link className="text-[#F7F5EF]" href="#locations">
            Locations
          </Link> */}
          <Link
            className="text-[#F7F5EF] cursor-pointer"
            onPress={() =>
              document
                .getElementById("faq")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            FAQ
          </Link>
          <Link
            className="text-[#F7F5EF] cursor-pointer"
            onPress={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact
          </Link>
        </nav>
      </header>
      {/* Header small screens */}
      <div className="bg-[#1F2A44] max-h-[4rem] px-6 rounded-xl bottom-5 left-[50%] -translate-x-1/2 fixed w-96 sm:hidden z-10">
        <ul className="flex relative justify-between w-full">
          <span
            className={`bg-[#F7F5EF] duration-500 ${Menus[active].dis} border-4 border-[#1F2A44] text-[#1F2A44] h-16 w-16 absolute
         -top-[30px] rounded-full`}
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
                      ? "translate-y-4 duration-700 opacity-100 text-[#F7F5EF] font-bold w-full flex justify-center mt-1"
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
      <section
        className="flex text-center px-4 gap-1 h-[calc(100vh-100px)] sm:h-[calc(100vh-72px)]"
        id="home"
      >
        {/* <div className="sm:flex justify-center items-center hidden w-0 sm:w-[10%]">
          <Image
            src={heroImg}
            alt="hero-section-img"
            className="relative object-cover w-96 h-xl"
          />
        </div> */}
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
              // href="#howitworks"
              underline="always"
              className="cursor-pointer ml-4 sm:ml-0 font-bold sm:font-semibold transition-all duration-500"
              onPress={() =>
                document
                  .getElementById("howitworks")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works <NorthEastIcon />
            </Link>
          </div>
        </div>
        {/* <div className="sm:flex justify-center items-center hidden w-0 sm:w-[10%]">
          <Image
            src={heroImg}
            alt="hero-section-img"
            className="relative object-cover w-96 h-xl"
          />
        </div> */}
      </section>

      {/* Overview Section */}
      <section
        className="flex flex-col items-center text-center p-8 gap-10 sm:gap-40 transition-all duration-500"
        id="howitworks"
      >
        <h2 className="text-5xl font-bold text-[#1F2A44] font-cormorant-garamond mb-6 sm:-mb-14">
          How It Works?
        </h2>
        <div className="flex items-center h-[650px] sm:h-[400px] w-full sm:w-[90%] rounded-2xl shadow-lg sm:shadow-none">
          <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
            <Image
              src={heroImg}
              alt="hero-section-img"
              className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
            />
            <div
              className="flex flex-col absolute sm:relative sm:justify-center sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
             bottom-4 sm:bottom-0 h-fit bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
            >
              <span className="mt-4 font-extrabold text-xl sm:text-3xl w-full">
                Scan & Upload
              </span>
              <span className="text-md sm:text-lg font-medium my-5">
                Point your phone camera at the QR code to launch the upload
                portal and upload the desired document to print.
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center h-[650px] sm:h-[400px] w-full sm:w-[90%] rounded-2xl shadow-lg sm:shadow-none">
          <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
            <div
              className="flex flex-col z-1 absolute sm:relative sm:justify-center sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
             bottom-4 sm:bottom-0 h-fit bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
            >
              <span className="mt-4 font-extrabold text-xl sm:text-3xl w-full">
                Customize Print
              </span>
              <span className="text-md sm:text-lg font-medium my-5">
                Select orientation, page count, duplex, and more.
              </span>
            </div>
            <Image
              src={heroImg}
              alt="hero-section-img"
              className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
            />
          </div>
        </div>
        <div className="flex items-center h-[650px] sm:h-[400px] w-full sm:w-[90%] rounded-2xl shadow-lg sm:shadow-none">
          <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
            <Image
              src={heroImg}
              alt="hero-section-img"
              className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
            />
            <div
              className="flex flex-col absolute sm:relative sm:justify-center sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
             bottom-4 sm:bottom-0 h-fit bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
            >
              <span className="mt-4 font-extrabold text-xl sm:text-3xl w-full">
                Pay via UPI
              </span>
              <span className="text-md sm:text-lg font-medium my-5">
                Use any UPI app for instant, secure payment—no cash needed.
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center h-[650px] sm:h-[400px] w-full sm:w-[90%] rounded-2xl shadow-lg sm:shadow-none">
          <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
            <div
              className="flex flex-col z-1 absolute sm:relative sm:justify-center sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
             bottom-4 sm:bottom-0 h-fit bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
            >
              <span className="mt-4 font-extrabold text-xl sm:text-3xl w-full">
                Auto-Print
              </span>
              <span className="text-md sm:text-lg font-medium my-5">
                Your document prints immediately, hands-free.
              </span>
            </div>
            <Image
              src={printImg}
              alt="print-img"
              className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="text-center p-10 bg-gray-400" id="faq">
        FAQ
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
      <footer
        className="text-center text-sm py-10 bg-gray-50 text-gray-600"
        id="contact"
      >
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
