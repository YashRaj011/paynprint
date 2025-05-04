"use client";
import {Link } from "@heroui/react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();


  return (
    <main className="min-h-screen bg-white text-black">
    {/* Header */}
    <header className="flex justify-between items-center p-6 border-b">
      <div className="text-purple-700 font-bold text-lg">Pay N Print</div>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="#">Home</Link>
        <Link href="#">Shop</Link>
        <Link href="/cart">🛒</Link>
      </nav>
    </header>

    {/* Hero Section */}
    <section className="text-center py-16 px-4">
      <h1 className="text-4xl font-serif leading-snug mb-4">
        Quality <br /> Printing <br /> Solutions <br /> for You
      </h1>
      <p className="text-sm mb-6 text-gray-600">
        Fast, affordable, and scalable printing services <br /> tailored to your needs.
      </p>
      <Link onPress={() => router.push("/upload")}>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow">
          Start Printing
        </button>
      </Link>
    </section>

    {/* Commitment Section */}
    <section className="text-center py-10 px-4 bg-gray-100">
      <h2 className="text-xl font-semibold mb-2">Our Commitment to Quality</h2>
      <p className="text-sm text-gray-600 max-w-xl mx-auto">
        At Pay N Print, we believe that quality is paramount to every print job. Our team uses state-of-the-art
        technologies and ensures every project is clean and professional.
      </p>
    </section>

    {/* Image Grid */}
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">
      <img src="/images/print1.jpg" alt="Printing" className="w-full rounded shadow" />
      <img src="/images/print2.jpg" alt="Print station" className="w-full rounded shadow" />
      <img src="/images/print3.jpg" alt="Printer" className="w-full rounded shadow" />
      <img src="/images/print4.jpg" alt="Technician" className="w-full rounded shadow" />
      <img src="/images/print5.jpg" alt="Office printing" className="w-full rounded shadow" />
    </section>

    {/* Footer */}
    <footer className="text-center text-sm py-10 bg-gray-50 text-gray-600">
      <p className="mb-2">Contact Us</p>
      <p className="mb-1">Better yet, see us in person!</p>
      <p className="mb-4">We love our customers, so feel free to visit during normal business hours.</p>
      <div className="font-semibold">Pay N Print</div>
    </footer>
  </main>
  );
}
