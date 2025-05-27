// app/privacy/page.tsx
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full h-full bg-[#F7F5EF]">
      <div className="max-w-5xl mx-auto px-4 py-8 text-[#3a3a3a]">
        <h1 className="text-3xl w-fit mx-auto font-bold mb-6">
          Privacy Policy
        </h1>

        <Section title="1. Overview">
          <p>
            At PaynPrint, your privacy is important to us. This policy outlines
            how we collect, use, and protect your information when you use our
            kiosk-based document printing service.
          </p>
        </Section>

        <Section title="2. Data We Collect">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Uploaded Files:</strong> Documents uploaded for printing
              are stored temporarily.
            </li>
            <li>
              <strong>Session Data:</strong> We use a session identifier to keep
              track of your print settings during your visit.
            </li>
            <li>
              <strong>Device Logs:</strong> Non-personal logs (e.g., printer
              errors, job timestamps) may be collected for diagnostics.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Data">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              To convert documents (e.g., DOCX to PDF) using local tools like
              LibreOffice.
            </li>
            <li>To display a live preview of your document before printing.</li>
            <li>
              To process and print your document via command-line tools on a
              Raspberry Pi.
            </li>
            <li>To improve the reliability and security of our services.</li>
          </ul>
        </Section>

        <Section title="4. Data Retention & Deletion">
          <p>All uploaded documents are automatically deleted:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Immediately after a successful print, or</li>
            <li>Within 15 minutes of upload if not printed</li>
          </ul>
          <p className="mt-2">
            No files are stored permanently. Logs do not include document
            content.
          </p>
        </Section>

        <Section title="5. Data Sharing">
          <p>
            We do <strong>not</strong> share your documents or session data with
            any third parties. There is no third-party analytics or cloud
            integration. Everything is processed locally on the kiosk system.
          </p>
        </Section>

        <Section title="6. Cookies & Tracking">
          <p>
            We do not use cookies or any form of online tracking. No behavioral
            or marketing data is collected.
          </p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            Our service is not intended for children under 13. We do not
            knowingly collect personal data from minors.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p>
            We use secure protocols to transmit files and isolate each session.
            Files are never stored beyond the print session. Our Raspberry
            Pi-based backend is sandboxed to prevent unauthorized access.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>
            Since we do not retain personal data, no user identification or
            profile is stored. If you suspect misuse, you can reach out to us to
            investigate the logs for your session's time frame.
          </p>
        </Section>

        <Section title="10. Changes to this Policy">
          <p>
            We may update this Privacy Policy to reflect changes in our
            technology or legal obligations. Updated policies will be available
            at <span className="italic">paynprint.in/privacy</span>.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            Email:{" "}
            <a href="mailto:support@paynprint.in" className="underline">
              support@paynprint.in
            </a>
            <br />
            Location: Hyderabad, Telangana, India
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-base leading-relaxed">{children}</div>
    </section>
  );
}
