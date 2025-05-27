import React from "react";

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full h-full bg-[#F7F5EF]">
      <div className="max-w-5xl mx-auto px-4 py-8 text-[#3a3a3a]">
        <h1 className="text-3xl font-bold mb-6 mx-auto w-fit">
          Terms of Service
        </h1>

        <Section title="1. Introduction">
          <p>
            Please read these Terms of Service ("Terms") which include our
            Privacy Notice before using the PaynPrint kiosk system, website, or
            related services (the “Services”). These Terms are between PaynPrint
            (“we”, “our”, or “us”) and you, the user of the Services. By using
            the Services, you agree to be bound by these Terms.
          </p>
        </Section>

        <Section title="2. Acceptance of Terms">
          <p>
            By accessing the Service, you confirm that you are at least 18 years
            old (or between 13 and 17 with guardian consent), and legally
            permitted to use this Service. If you disagree with any part of
            these Terms, please do not use the Service.
          </p>
        </Section>

        <Section title="3. User Access">
          <p>
            No account is required for printing. However, you are responsible
            for any temporary upload or session link provided to you. Misuse or
            sharing of session links is prohibited.
          </p>
        </Section>

        <Section title="4. Ownership">
          <p>
            All intellectual property related to PaynPrint belongs to us or our
            licensors. We may use deidentified usage data to improve the
            Service.
          </p>
        </Section>

        <Section title="5. License to Use">
          <p>
            We grant you a limited, non-transferable license to use our system
            for uploading, previewing, and printing documents. Unauthorized
            access, reverse engineering, or system tampering is prohibited.
          </p>
        </Section>

        <Section title="6. Prohibited Uses">
          <ul className="list-disc ml-6 space-y-2">
            <li>Printing unlawful or defamatory content</li>
            <li>Attempting to hack, damage, or modify the system</li>
            <li>Uploading viruses or malicious software</li>
            <li>Misusing payment systems or pricing</li>
          </ul>
        </Section>

        <Section title="7. External Links">
          <p>
            We are not responsible for the content, privacy, or reliability of
            third-party websites linked through our service.
          </p>
        </Section>

        <Section title="8. Termination">
          <p>
            We may suspend or terminate access for violations of these Terms.
            Termination cancels active sessions and pending prints.
          </p>
        </Section>

        <Section title="9. Indemnification">
          <p>
            You agree to indemnify and hold PaynPrint and its affiliates
            harmless from any claims or liabilities arising from your use of the
            Service or your breach of these Terms.
          </p>
        </Section>

        <Section title="10. Limitation of Liability">
          <p>
            We are not liable for loss of files, delays, or failed prints. Your
            sole remedy is a refund of up to ₹500 for the most recent failed
            transaction.
          </p>
        </Section>

        <Section title="11. Class Action Waiver">
          <p>
            Any disputes must be pursued individually and not as part of a class
            or collective action.
          </p>
        </Section>

        <Section title="12. Disclaimers">
          <p>
            The Service is provided “as-is.” We do not guarantee uninterrupted
            availability or perfect accuracy of prints. We use open-source tools
            like LibreOffice and disclaim liability related to them.
          </p>
        </Section>

        <Section title="13. Governing Law">
          <p>
            These Terms are governed by the laws of Telangana, India. Legal
            disputes will be handled in Hyderabad courts.
          </p>
        </Section>

        <Section title="14. Changes">
          <p>
            We may revise these Terms at any time. Continued use after changes
            constitutes your acceptance.
          </p>
        </Section>

        <Section title="15. Contact">
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
