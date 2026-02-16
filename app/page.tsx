"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Upload,
  Check,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Star,
  Users,
  Building2,
  Library,
  Train,
  FileText,
  CreditCard,
  Package,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#1F2A44]/10">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="logo-text text-3xl">
              pnp
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-semibold text-[#1F2A44]/70 hover:text-[#1F2A44] transition-colors"
            >
              Features
            </a>
            <a
              href="#process"
              className="text-sm font-semibold text-[#1F2A44]/70 hover:text-[#1F2A44] transition-colors"
            >
              Process
            </a>
            <a
              href="#locations"
              className="text-sm font-semibold text-[#1F2A44]/70 hover:text-[#1F2A44] transition-colors"
            >
              Locations
            </a>
            <Link
              href="/upload"
              className="px-6 py-3 bg-gradient-gold text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#FFBF00]/30 transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Floating Geometric Objects */}
        <motion.div
          className="absolute top-32 left-[5%] w-48 h-48 rounded-3xl bg-gradient-to-br from-[#FFBF00]/20 to-[#D4A520]/10 backdrop-blur-sm border border-[#FFBF00]/20"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-1/4 right-[8%] w-40 h-40 rounded-full bg-gradient-to-br from-[#20B2AA]/20 to-[#20B2AA]/10 backdrop-blur-sm"
          animate={{ y: [0, 25, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-[10%] w-56 h-56 rounded-2xl bg-gradient-to-br from-[#1F2A44]/10 to-[#1F2A44]/5 backdrop-blur-sm border border-[#1F2A44]/10"
          animate={{ y: [0, -40, 0], rotate: [0, -15, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute bottom-32 right-[12%] w-44 h-44 rounded-full bg-gradient-to-br from-[#FF7F50]/20 to-[#FF7F50]/10 backdrop-blur-sm"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Additional small floating circles */}
        <motion.div
          className="absolute top-1/3 left-[25%] w-20 h-20 rounded-full bg-[#FFBF00]/30 blur-xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/3 right-[20%] w-32 h-32 rounded-full bg-[#8B9584]/20 blur-xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#FFBF00]/10 rounded-full blur-3xl animate-pulse-custom"></div>
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-[#1F2A44]/5 rounded-full blur-3xl animate-pulse-custom"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", damping: 20 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 mt-5 bg-[#FFBF00]/10 border border-[#FFBF00]/30 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#FFBF00]" />
              <span className="text-sm font-semibold text-[#1F2A44]">
                Trusted by 50,000+ users worldwide
              </span>
            </motion.div>
            <div className="flex flex-col text-6xl md:text-7xl lg:text-[100px] font-bold text-[#1F2A44] mb-8 leading-[1.15] font-cormorant">
              <span>Print Without</span>
              <span className="flex gap-5 flex-row flex-wrap justify-center items-center w-full">
                <span>The</span>
                <span className="italic text-[#FFBF00] font-nunito">
                  Hassle
                </span>
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              damping: 20,
            }}
            className="text-xl md:text-2xl text-[#1F2A44]/70 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Upload your documents, customize your settings, pay securely, and
            collect your prints in minutes.{" "}
            <span className="text-gradient-gold font-bold underline">
              Simple as that.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              damping: 20,
            }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link
              href="/upload"
              className="group px-10 py-5 bg-[#1F2A44] text-[#F7F5EF] font-bold text-lg rounded-full hover:bg-[#2A3A5A] hover:shadow-2xl hover:shadow-[#1F2A44]/30 flex items-center justify-center gap-3 transition-all"
            >
              <Upload className="w-6 h-6" />
              Start Printing Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-transparent border-2 border-[#1F2A44] text-[#1F2A44] font-bold text-lg rounded-full hover:bg-[#1F2A44] hover:text-[#F7F5EF] transition-all">
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <ChevronDown className="w-8 h-8 text-[#1F2A44]/40 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-[#1F2A44]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "< 30sec", label: "Average print time", icon: Clock },
              { value: "0+", label: "Documents printed", icon: FileText },
              { value: "0+", label: "Global locations", icon: Building2 },
              { value: "0★", label: "Customer rating", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#FFBF00] mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold text-[#F7F5EF] mb-2 font-cormorant">
                  {stat.value}
                </div>
                <div className="text-sm text-[#F7F5EF]/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-32 px-6 bg-[#F7F5EF] relative overflow-hidden"
      >
        {/* Floating objects */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-2xl bg-gradient-to-br from-[#FFBF00]/20 to-transparent border border-[#FFBF00]/20"
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#1F2A44] mb-6 font-cormorant">
              Why Choose Us
            </h2>
            <p className="text-xl text-[#1F2A44]/70 font-medium">
              Everything you need for seamless printing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Upload and print in under 2 minutes. Our optimized workflow ensures you never wait in line.",
                color: "#FFBF00",
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description:
                  "Your documents are encrypted and automatically deleted after printing. Privacy guaranteed.",
                color: "#20B2AA",
              },
              {
                icon: Star,
                title: "Premium Quality",
                description:
                  "Professional-grade printers deliver crisp, vivid prints perfect for any purpose.",
                color: "#FF7F50",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description:
                  "Print whenever inspiration strikes. Our kiosks are always ready and waiting.",
                color: "#8B9584",
              },
              {
                icon: CreditCard,
                title: "Transparent Pricing",
                description:
                  "Pay only for what you print. No hidden fees, no subscriptions, no surprises.",
                color: "#FFBF00",
              },
              {
                icon: Check,
                title: "Incredibly Simple",
                description:
                  "Intuitive interface designed for everyone. Upload, preview, pay, print. Done.",
                color: "#20B2AA",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 border border-[#1F2A44]/5 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-2xl"
                  style={{ backgroundColor: feature.color }}
                ></div>

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon
                      className="w-8 h-8"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 font-cormorant">
                    {feature.title}
                  </h3>
                  <p className="text-[#1F2A44]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        className="py-32 px-6 bg-white relative overflow-hidden"
      >
        <motion.div
          className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#8B9584]/20 to-transparent"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#1F2A44] mb-6 font-cormorant">
              How It Works
            </h2>
            <p className="text-xl text-[#1F2A44]/70 font-medium">
              Four simple steps to perfect prints
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload",
                description:
                  "Select your document from any device or cloud storage",
                step: "01",
                color: "#FFBF00",
              },
              {
                icon: FileText,
                title: "Customize",
                description:
                  "Preview and adjust print settings to your preference",
                step: "02",
                color: "#20B2AA",
              },
              {
                icon: CreditCard,
                title: "Pay Securely",
                description: "Quick checkout with multiple payment options",
                step: "03",
                color: "#FF7F50",
              },
              {
                icon: Package,
                title: "Collect",
                description:
                  "Pick up your prints from the nearest kiosk instantly",
                step: "04",
                color: "#8B9584",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  damping: 20,
                }}
                className="relative group"
              >
                <div className="bg-[#F7F5EF] rounded-3xl p-8 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-[#1F2A44]/10 relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 text-[120px] font-black opacity-5 font-cormorant"
                    style={{ color: item.color }}
                  >
                    {item.step}
                  </div>

                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                      style={{ backgroundColor: `${item.color}30` }}
                    >
                      <item.icon
                        className="w-8 h-8"
                        style={{ color: item.color }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 font-cormorant">
                      {item.title}
                    </h3>
                    <p className="text-[#1F2A44]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-[#FFBF00]/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section
        id="locations"
        className="py-32 px-6 bg-[#F7F5EF] relative overflow-hidden"
      >
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 rounded-3xl bg-gradient-to-br from-[#FF7F50]/20 to-transparent border border-[#FF7F50]/20"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#1F2A44] mb-6 font-cormorant">
              Find Us Everywhere
            </h2>
            <p className="text-xl text-[#1F2A44]/70 font-medium">
              1+ smart kiosks in convenient locations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Universities",
                count: "69+",
                description: "Campus libraries & student centers",
                color: "#FFBF00",
              },
              {
                icon: Building2,
                title: "Offices",
                count: "69+",
                description: "Business hubs & co-working",
                color: "#20B2AA",
              },
              {
                icon: Library,
                title: "Libraries",
                count: "69+",
                description: "Public & community spaces",
                color: "#FF7F50",
              },
              {
                icon: Train,
                title: "Transit",
                count: "69+",
                description: "Airports, stations & malls",
                color: "#8B9584",
              },
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", damping: 20 }}
                className="bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 group border border-[#1F2A44]/5"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundColor: `${location.color}20` }}
                >
                  <location.icon
                    className="w-10 h-10"
                    style={{ color: location.color }}
                  />
                </div>
                <div
                  className="text-4xl font-bold mb-2 font-cormorant"
                  style={{ color: location.color }}
                >
                  {location.count}
                </div>
                <h3 className="text-xl font-bold text-[#1F2A44] mb-2">
                  {location.title}
                </h3>
                <p className="text-sm text-[#1F2A44]/60">
                  {location.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-[#1F2A44] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFBF00] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFBF00] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#F7F5EF] mb-8 font-cormorant">
              Ready to Print{" "}
              <span className="italic text-[#FFBF00]">Smarter</span>?
            </h2>
            <p className="text-xl text-[#F7F5EF]/80 mb-12 font-medium">
              No signup required. Start printing in seconds.
            </p>
            <Link
              href="/upload"
              className="group px-12 py-6 bg-[#FFBF00] text-white text-lg font-bold rounded-full hover:bg-[#D4A520] hover:shadow-2xl hover:shadow-[#FFBF00]/30 flex items-center justify-center gap-3 mx-auto transition-all"
            >
              <Upload className="w-7 h-7" />
              Upload Your Document
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F7F5EF] border-t border-[#1F2A44]/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Link href="/" className="logo-text text-2xl">
                  pnp
                </Link>
              </div>
              <p className="text-sm text-[#1F2A44]/60 italic">
                Printing shouldn&apos;t slow you down.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#1F2A44] mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href="#locations"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Locations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1F2A44] mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Careers
                  </a>
                </li> */}
                <li>
                  <a
                    href="#"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1F2A44] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/privacyPolicy"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="/refundPolicy"
                    className="text-[#1F2A44]/60 hover:text-[#1F2A44] transition-colors"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1F2A44]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#1F2A44]/60">
              © 2026 PNP Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-on-scroll {
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }

        .animate-on-scroll.animate-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}

// import { Button, Link } from "@heroui/react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import NorthEastIcon from "@mui/icons-material/NorthEast";
// import { useState } from "react";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import LiveHelpIcon from "@mui/icons-material/LiveHelp";
// import PhoneIcon from "@mui/icons-material/Phone";
// import { Overview } from "../components/Overview";
// import { faq } from "../components/Faq";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import logo from "@/Images/logo_updated.jpg";

// export default function Home() {
//   const [active, setActive] = useState(0);
//   const Menus = [
//     {
//       name: "HOME",
//       dis: "translate-x-0",
//       icon: (
//         <HomeIcon
//           className={`relative ${
//             active === 0 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
//           } "`}
//           fontSize="inherit"
//           onClick={() =>
//             document
//               .getElementById("home")
//               ?.scrollIntoView({ behavior: "smooth" })
//           }
//         />
//       ),
//     },
//     {
//       name: "OVERVIEW",
//       dis: "translate-x-[91px]",
//       icon: (
//         <InfoIcon
//           className={`relative ${
//             active === 1 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
//           } "`}
//           fontSize="inherit"
//           onClick={() =>
//             document
//               .getElementById("howitworks")
//               ?.scrollIntoView({ behavior: "smooth" })
//           }
//         />
//       ),
//     },
//     {
//       name: "FAQ",
//       dis: "translate-x-[182px]",
//       icon: (
//         <LiveHelpIcon
//           className={`relative ${
//             active === 2 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
//           } "`}
//           fontSize="inherit"
//           onClick={() =>
//             document
//               .getElementById("faq")
//               ?.scrollIntoView({ behavior: "smooth" })
//           }
//         />
//       ),
//     },
//     {
//       name: "CONTACT",
//       dis: "translate-x-[272px]",
//       icon: (
//         <PhoneIcon
//           className={`relative ${
//             active === 3 ? "text-[#1F2A44]" : "text-[#F7F5EF]"
//           } "`}
//           fontSize="inherit"
//           onClick={() =>
//             document
//               .getElementById("contact")
//               ?.scrollIntoView({ behavior: "smooth" })
//           }
//         />
//       ),
//     },
//   ];
//   const router = useRouter();

//   return (
//     <main className="min-h-screen bg-[#F7F5EF] font-nunito">
//       {/* Header large screens */}
//       <header className="hidden h-0 sm:block sm:sticky top-0 sm:h-18 z-10 bg-[#1F2A44] ">
//         <nav className="flex items-center gap-20 w-fit text-sm h-full mx-auto p-5 text-[#F7F5EF] font-medium">
//           <Link
//             className="text-[#F7F5EF] font-bold text-lg cursor-pointer"
//             onPress={() => router.push("/")}
//           >
//             <Image
//               src={logo}
//               alt="logo"
//               width={160}
//               className="rounded-[50%] my-5"
//             />
//           </Link>
//           <Link
//             className="text-[#F7F5EF] cursor-pointer"
//             onPress={() =>
//               document
//                 .getElementById("home")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//           >
//             Home
//           </Link>
//           <Link
//             className="text-[#F7F5EF] cursor-pointer"
//             onPress={() =>
//               document
//                 .getElementById("howitworks")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//           >
//             How it works
//           </Link>
//           {/* <Link className="text-[#F7F5EF]" href="#locations">
//             Locations
//           </Link> */}
//           <Link
//             className="text-[#F7F5EF] cursor-pointer"
//             onPress={() =>
//               document
//                 .getElementById("faq")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//           >
//             FAQ
//           </Link>
//           <Link
//             className="text-[#F7F5EF] cursor-pointer"
//             onPress={() =>
//               document
//                 .getElementById("contact")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//           >
//             Contact
//           </Link>
//         </nav>
//       </header>
//       {/* Header small screens */}
//       <div className="bg-[#1F2A44] max-h-[4rem] px-6 rounded-xl bottom-5 left-[50%] -translate-x-1/2 fixed w-96 sm:hidden z-10">
//         <ul className="flex relative justify-between w-full">
//           <span
//             className={`bg-[#F7F5EF] duration-500 ${Menus[active].dis} border-4 border-[#1F2A44] text-[#1F2A44] h-16 w-16 absolute
//          -top-[30px] rounded-full`}
//           >
//             <span
//               className="w-3.5 h-3.5 bg-[#1F2A44] absolute top-[28px] -left-[12.5px]
//           rounded-tr-[11px] shadow-myShadow1"
//             ></span>
//             <span
//               className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px]
//           rounded-tl-[11px] shadow-myShadow2"
//             ></span>
//           </span>
//           {Menus.map((menu, i) => (
//             <li key={i} className="w-16 -mt-3">
//               <a
//                 className="flex flex-col text-center pt-6"
//                 onClick={() => setActive(i)}
//               >
//                 <span
//                   className={`cursor-pointer text-3xl duration-500 ${
//                     i === active && "-mt-8"
//                   }`}
//                 >
//                   {menu.icon}
//                 </span>
//                 <span
//                   className={` ${
//                     active === i
//                       ? "translate-y-4 duration-700 opacity-100 text-[#F7F5EF] font-bold w-full flex justify-center mt-1"
//                       : "opacity-0 translate-y-10"
//                   } `}
//                 >
//                   {menu.name}
//                 </span>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* Hero Section */}
//       <section
//         className="flex flex-col text-center px-4 gap-1 h-[calc(100vh-100px)] sm:h-[calc(100vh-72px)]"
//         id="home"
//       >
//         <div className="flex w-screen -ml-[16px] bg-[#1F2A44] justify-center items-center sm:hidden">
//           <Image
//             src={logo}
//             alt="logo"
//             width={160}
//             className="rounded-[50%] my-2"
//           />
//         </div>
//         <div className="flex flex-col mx-auto mt-2 w-full sm:w-[50%]">
//           <h1 className="text-5xl text-[#1F2A44] font-cormorant-garamond font-extrabold leading-snug mb-4">
//             Upload, Pay and Print your Documents in Seconds.
//           </h1>
//           <p className="text-md mb-6 text-gray-600 font-nunito">
//             From Upload to Output—Experience Premium Printing without the Wait.
//           </p>
//           <div className="flex flex-wrap flex-col sm:flex-row mt-2 sm:mt-0 justify-center items-center gap-4">
//             <Button
//               variant="shadow"
//               className="font-bold bg-[#FCC201] text-[#F7F5EF] w-[90%] sm:w-fit"
//               size="lg"
//               onPress={() => router.push("/upload")}
//             >
//               Start Printing
//             </Button>
//             <Link
//               // href="#howitworks"
//               underline="always"
//               className="cursor-pointer ml-4 sm:ml-0 font-bold sm:font-semibold transition-all duration-500"
//               onPress={() =>
//                 document
//                   .getElementById("howitworks")
//                   ?.scrollIntoView({ behavior: "smooth" })
//               }
//             >
//               See how it works <NorthEastIcon />
//             </Link>
//           </div>
//         </div>
//         {/* <div className="sm:flex justify-center items-center hidden w-0 sm:w-[10%]">
//           <Image
//             src={heroImg}
//             alt="hero-section-img"
//             className="relative object-cover w-96 h-xl"
//           />
//         </div> */}
//       </section>

//       {/* Overview Section */}
//       <section
//         className="flex flex-col items-center -mt-5 text-center p-8 gap-10 sm:gap-40"
//         id="howitworks"
//       >
//         <h2 className="text-5xl font-bold text-[#1F2A44] font-cormorant-garamond mb-6 sm:-mb-14">
//           How It Works?
//         </h2>
//         {Overview.map((item, i) => (
//           <div
//             key={i}
//             className="flex items-center h-[650px] sm:h-[400px] w-full sm:w-[90%] rounded-2xl shadow-lg sm:shadow-none"
//           >
//             {i % 2 === 0 ? (
//               <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
//                 <Image
//                   src={item.src}
//                   alt="hero-section-img"
//                   className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
//                 />
//                 <div
//                   className="flex flex-col absolute sm:relative sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
//              bottom-4 sm:bottom-0 h-48 bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
//                 >
//                   <span className="mt-1 font-extrabold text-xl sm:text-3xl w-full">
//                     {item.name}
//                   </span>
//                   <div className="h-[3px] rounded-[50%] block relative my-2 w-[98%] bg-[#3A3A3A]"></div>
//                   <span className="text-md sm:text-lg sm:text-start font-medium my-2 sm:whitespace-pre-wrap">
//                     {item.desc}
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="block sm:flex sm:flex-row relative w-full h-full sm:gap-10">
//                 <div
//                   className="flex flex-col z-1 absolute sm:relative sm:items-center sm:h-full items-center w-[90%] sm:w-[50%] left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0
//              bottom-4 sm:bottom-0 h-48 bg-[#F7F5EF] rounded-2xl sm:rounded-none p-5 sm:p-0"
//                 >
//                   <span className="mt-1 font-extrabold text-xl sm:text-3xl w-full">
//                     {item.name}
//                   </span>
//                   <div className="h-[3px] rounded-[50%] block relative my-2 w-[98%] bg-[#3A3A3A]"></div>
//                   <span className="text-md sm:text-lg sm:text-start font-medium my-2 sm:whitespace-pre-wrap">
//                     {item.desc}
//                   </span>
//                 </div>
//                 <Image
//                   src={item.src}
//                   alt="hero-section-img"
//                   className="relative object-fill sm:object-cover w-full h-full sm:w-[50%] rounded-2xl border-3 border-[#1F2A44]"
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </section>

//       {/* FAQ Section */}
//       <section
//         className="flex flex-col items-center text-center p-8 gap-10 mt-5"
//         id="faq"
//       >
//         <h2 className="text-5xl font-bold text-[#1F2A44] font-cormorant-garamond">
//           Frequently Asked Questions
//         </h2>
//         <div className="flex flex-col text-start gap-4 p-6 bg-white rounded-2xl shadow-lg w-full sm:w-[50%]">
//           {faq.map((item, i) => (
//             <div key={i} className="flex flex-col gap-2">
//               <h3 className="text-xl font-bold text-[#1F2A44]">
//                 {item.question}
//               </h3>
//               <p className="text-md text-gray-600 whitespace-pre-wrap">
//                 {item.answer}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="flex flex-col items-center text-center p-8 gap-10 mt-5 bg-white">
//         <h2 className="text-5xl font-bold text-[#1F2A44] font-cormorant-garamond w-full sm:w-[60%]">
//           Fast, contactless printing—scan, pay, and collect your documents in
//           seconds.
//         </h2>
//         <Button
//           variant="shadow"
//           className="font-bold bg-[#FCC201] text-[#F7F5EF] w-[90%] sm:w-fit"
//           size="lg"
//           onPress={() => router.push("/upload")}
//         >
//           Print your document
//         </Button>
//       </section>

//       {/* Footer */}
//       <footer
//         className="flex flex-col w-full items-center text-center p-6 gap-5 bg-[#10192e] text-[#F7F5EF] mb-22 sm:mb-0"
//         id="contact"
//       >
//         <div className="flex flex-col sm:flex-row sm:items-start sm:gap-15 items-center text-center gap-5 w-full">
//           <div className="flex flex-col w-full sm:w-[60%] h-20 justify-center">
//             <Image
//               src={logo}
//               alt="logo"
//               width={180}
//               className="rounded-[50%] mx-auto"
//             />
//           </div>
//           <div className="flex flex-row w-full sm:w-[40%] sm:justify-around justify-between sm:gap-15">
//             <div className="flex flex-col text-start p-2 gap-4">
//               <h3 className="text-xl font-bold mb-4">Navigate</h3>
//               <Link
//                 className="text-[#F7F5EF] cursor-pointer"
//                 onPress={() =>
//                   document
//                     .getElementById("home")
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 underline="always"
//               >
//                 Home
//               </Link>
//               <Link
//                 className="text-[#F7F5EF] cursor-pointer"
//                 onPress={() =>
//                   document
//                     .getElementById("howitworks")
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 underline="always"
//               >
//                 How it works
//               </Link>
//               <Link
//                 className="text-[#F7F5EF] cursor-pointer"
//                 onPress={() =>
//                   document
//                     .getElementById("faq")
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 underline="always"
//               >
//                 FAQ
//               </Link>
//               <Link
//                 className="text-[#F7F5EF] cursor-pointer"
//                 onPress={() =>
//                   document
//                     .getElementById("contact")
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 underline="always"
//               >
//                 Contact
//               </Link>
//             </div>
//             <div className="flex flex-col text-start p-2 gap-4">
//               <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//               <div className="not-italic space-y-2">
//                 <p>
//                   <Link
//                     href="mailto:support@paynprint.com"
//                     className="hover:text-warm-gold"
//                   >
//                     support@paynprint.com
//                   </Link>
//                 </p>
//                 <p>
//                   <Link
//                     href="tel:+911234567890"
//                     className="hover:text-warm-gold"
//                   >
//                     +91 76750 12905
//                   </Link>
//                 </p>
//               </div>
//               <div className="flex flex-row gap-4 mt-4">
//                 <Link
//                   href="#"
//                   aria-label="Twitter"
//                   className="text-[#F7F5EF] hover:text-warm-gold"
//                 >
//                   <FacebookIcon fontSize="large" />
//                 </Link>
//                 <Link
//                   href="#"
//                   aria-label="Twitter"
//                   className="text-[#F7F5EF] hover:text-warm-gold"
//                 >
//                   <XIcon fontSize="large" />
//                 </Link>
//                 <Link
//                   href="#"
//                   aria-label="Twitter"
//                   className="text-[#F7F5EF] hover:text-warm-gold"
//                 >
//                   <InstagramIcon fontSize="large" />
//                 </Link>
//                 <Link
//                   href="#"
//                   aria-label="Twitter"
//                   className="text-[#F7F5EF] hover:text-warm-gold"
//                 >
//                   <LinkedInIcon fontSize="large" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="h-1 w-full bg-[#F7F5EF] rounded-[50%] my-5 sm:my-0"></div>
//         <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-4">
//           <Link
//             href="/terms"
//             className="text-[#F7F5EF] hover:text-warm-gold"
//             underline="always"
//             target="_blank"
//           >
//             Terms Of Service
//           </Link>
//           <Link
//             href="/privacyPolicy"
//             className="text-[#F7F5EF] hover:text-warm-gold"
//             underline="always"
//             target="_blank"
//           >
//             Privacy Poilicy
//           </Link>
//           <Link
//             href="/refundPolicy"
//             className="text-[#F7F5EF] hover:text-warm-gold"
//             underline="always"
//             target="_blank"
//           >
//             Refund Poilicy
//           </Link>
//         </div>
//         <div className="text-center">
//           © 2025 PayNPrint. All rights reserved.
//         </div>
//       </footer>
//     </main>
//   );
// }
