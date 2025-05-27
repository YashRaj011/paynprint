"use client";
import { Button, Link } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import PhoneIcon from "@mui/icons-material/Phone";
import { Overview } from "../components/Overview";
import { faq } from "../components/Faq";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "@/Images/logo_updated.jpg";

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
            <Image
              src={logo}
              alt="logo"
              width={160}
              className="rounded-[50%] my-5"
            />
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
        className="flex flex-col text-center px-4 gap-1 h-[calc(100vh-100px)] sm:h-[calc(100vh-72px)]"
        id="home"
      >
        <div className="flex w-screen -ml-[16px] bg-[#1F2A44] justify-center items-center sm:hidden">
          <Image
            src={logo}
            alt="logo"
            width={160}
            className="rounded-[50%] my-2"
          />
        </div>
        <div className="flex flex-col mx-auto mt-2 w-full sm:w-[50%]">
          <h1 className="text-5xl text-[#1F2A44] font-cormorant-garamond font-extrabold leading-snug mb-4">
            Upload, Pay and Print your Documents in Seconds.
          </h1>
          <p className="text-md mb-6 text-gray-600 font-nunito">
            From Upload to Output—Experience Premium Printing without the Wait.
          </p>
          <div className="flex flex-wrap flex-col sm:flex-row mt-2 sm:mt-0 justify-center items-center gap-4">
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
        className="flex flex-col items-center -mt-5 text-center p-8 gap-10 sm:gap-40"
        id="howitworks"
      >
        <h2 className="text-5xl font-bold text-[#1F2A44] font-cormorant-garamond mb-6 sm:-mb-14">
          How It Works?
        </h2>
        {Overview.map((item, i) => (
          <div
            key={i}
            className="flex items-center h-[650px] sm:h-[400px] w-full sm:w-[90%] rounded-2xl shadow-lg sm:shadow-none"
          >
            {i % 2 === 0 ? (
              <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
                <Image
                  src={item.src}
                  alt="hero-section-img"
                  className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
                />
                <div
                  className="flex flex-col absolute sm:relative sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
             bottom-4 sm:bottom-0 h-48 bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
                >
                  <span className="mt-1 font-extrabold text-xl sm:text-3xl w-full">
                    {item.name}
                  </span>
                  <div className="h-[3px] rounded-[50%] block relative my-2 w-[98%] bg-[#3A3A3A]"></div>
                  <span className="text-md sm:text-lg sm:text-start font-medium my-2 sm:whitespace-pre-wrap">
                    {item.desc}
                  </span>
                </div>
              </div>
            ) : (
              <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
                <div
                  className="flex flex-col z-1 absolute sm:relative sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
             bottom-4 sm:bottom-0 h-48 bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
                >
                  <span className="mt-1 font-extrabold text-xl sm:text-3xl w-full">
                    {item.name}
                  </span>
                  <div className="h-[3px] rounded-[50%] block relative my-2 w-[98%] bg-[#3A3A3A]"></div>
                  <span className="text-md sm:text-lg sm:text-start font-medium my-2 sm:whitespace-pre-wrap">
                    {item.desc}
                  </span>
                </div>
                <Image
                  src={item.src}
                  alt="hero-section-img"
                  className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
                />
              </div>
            )}
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section
        className="flex flex-col items-center text-center p-8 gap-10 mt-5"
        id="faq"
      >
        <h2 className="text-5xl font-bold text-[#1F2A44] font-cormorant-garamond">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col text-start gap-4 p-6 bg-white rounded-2xl shadow-lg w-full sm:w-[50%]">
          {faq.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-[#1F2A44]">
                {item.question}
              </h3>
              <p className="text-md text-gray-600 whitespace-pre-wrap">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center text-center p-8 gap-10 mt-5 bg-white">
        <h2 className="text-5xl font-bold text-[#1F2A44] font-cormorant-garamond w-full sm:w-[60%]">
          Fast, contactless printing—scan, pay, and collect your documents in
          seconds.
        </h2>
        <Button
          variant="shadow"
          className="font-bold bg-[#FCC201] text-[#F7F5EF] w-[90%] sm:w-fit"
          size="lg"
          onPress={() => router.push("/upload")}
        >
          Print your document
        </Button>
      </section>

      {/* Footer */}
      <footer
        className="flex flex-col w-full items-center text-center p-6 gap-5 bg-[#10192e] text-[#F7F5EF] mb-22 sm:mb-0"
        id="contact"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-15 items-center text-center gap-5 w-full">
          <div className="flex flex-col w-full sm:w-[60%] h-20 justify-center">
            <Image
              src={logo}
              alt="logo"
              width={180}
              className="rounded-[50%] mx-auto"
            />
          </div>
          <div className="flex flex-row w-full sm:w-[40%] sm:justify-around justify-between sm:gap-15">
            <div className="flex flex-col text-start p-2 gap-4">
              <h3 className="text-xl font-bold mb-4">Navigate</h3>
              <Link
                className="text-[#F7F5EF] cursor-pointer"
                onPress={() =>
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                underline="always"
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
                underline="always"
              >
                How it works
              </Link>
              <Link
                className="text-[#F7F5EF] cursor-pointer"
                onPress={() =>
                  document
                    .getElementById("faq")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                underline="always"
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
                underline="always"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col text-start p-2 gap-4">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="not-italic space-y-2">
                <p>
                  <Link
                    href="mailto:support@paynprint.com"
                    className="hover:text-warm-gold"
                  >
                    support@paynprint.com
                  </Link>
                </p>
                <p>
                  <Link
                    href="tel:+911234567890"
                    className="hover:text-warm-gold"
                  >
                    +91 76750 12905
                  </Link>
                </p>
              </div>
              <div className="flex flex-row gap-4 mt-4">
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="text-[#F7F5EF] hover:text-warm-gold"
                >
                  <FacebookIcon fontSize="large" />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="text-[#F7F5EF] hover:text-warm-gold"
                >
                  <XIcon fontSize="large" />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="text-[#F7F5EF] hover:text-warm-gold"
                >
                  <InstagramIcon fontSize="large" />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="text-[#F7F5EF] hover:text-warm-gold"
                >
                  <LinkedInIcon fontSize="large" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-[#F7F5EF] rounded-[50%] my-5 sm:my-0"></div>
        <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-4">
          <Link
            href="/terms"
            className="text-[#F7F5EF] hover:text-warm-gold"
            underline="always"
            target="_blank"
          >
            Terms Of Service
          </Link>
          <Link
            href="/privacyPolicy"
            className="text-[#F7F5EF] hover:text-warm-gold"
            underline="always"
            target="_blank"
          >
            Privacy Poilicy
          </Link>
          <Link
            href="/refundPolicy"
            className="text-[#F7F5EF] hover:text-warm-gold"
            underline="always"
            target="_blank"
          >
            Refund Poilicy
          </Link>
        </div>
        <div className="text-center">
          © 2025 PayNPrint. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
