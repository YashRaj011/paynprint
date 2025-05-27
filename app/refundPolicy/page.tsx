import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="w-full h-screen bg-[#F7F5EF]">
      <div className="max-w-3xl mx-auto p-6 text-[#3a3a3a]">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Refund Policy - PayNPrint
        </h1>

        <p className="mb-4">
          At <strong>PayNprint by BAJAJ STATIONERY EXTENSION</strong>, we are
          committed to providing convenient and efficient printing services
          through our automated kiosks and mobile platform. Please review our
          refund policy below before making a purchase:
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">No Refunds</h2>
        <p className="mb-4">
          All purchases made through PayNPrint — including printing, copying, or
          related digital services — are{" "}
          <strong>final and non-refundable</strong>. Once a transaction is
          completed and the document is processed or printed, we are unable to
          offer a refund or exchange.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Exceptions</h2>
        <p className="mb-4">
          Refunds may only be considered under the following conditions:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            The machine failed to print your document due to a verified
            technical error.
          </li>
          <li>
            You were charged but did not receive the service due to a confirmed
            system malfunction.
          </li>
        </ul>
        <p className="mb-4">
          In such rare cases, please contact our support team within{" "}
          <strong>24 hours</strong> of the incident with:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>A copy of your receipt or transaction ID</li>
          <li>A brief description of the issue</li>
          <li>Any supporting screenshots or photos (if applicable)</li>
          <li>
            If approved your amount will be processed and credited to the
            original payment method within 3-7 business days
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>
          If you experience a technical issue or have questions, please reach
          out to our support team at:
        </p>
        <p className="mt-2">
          📧{" "}
          <a
            href="mailto:support@paynprint.com"
            className="text-blue-600 hover:underline"
          >
            support@paynprint.com
          </a>
        </p>

        <p className="mt-6 text-sm text-gray-500">
          We appreciate your understanding and support.
        </p>
      </div>
    </div>
  );
}
