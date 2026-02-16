// "use client";

// import { useEffect, useRef } from "react";
// import * as pdfjsLib from "pdfjs-dist";

// // REQUIRED for PDF.js to work
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

// export default function PdfPreview({ file }: { file: File | undefined }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!file) return;

//     const renderPdf = async () => {
//       const arrayBuffer = await file.arrayBuffer();

//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//       const page = await pdf.getPage(1);

//       const viewport = page.getViewport({ scale: 1.5 });
//       const canvas = canvasRef.current!;
//       const context = canvas.getContext("2d")!;

//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       await page.render({
//         canvasContext: context,
//           viewport,
//         canvas
//       }).promise;
//     };

//     renderPdf();
//   }, [file]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="border rounded shadow mx-auto bg-white"
//     />
//   );
// }
