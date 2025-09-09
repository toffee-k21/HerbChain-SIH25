"use client";
import React, { useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react'; // Use named import
import { saveAs } from 'file-saver';

export default function QRCodePage() {
  const { batchId } = useParams(); // Get batchId from URL
  const router = useRouter();
  const qrRef = useRef<HTMLCanvasElement>(null);

  const downloadQRCode = () => {
    if (qrRef.current) {
      qrRef.current.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `batch-${batchId}-qrcode.png`);
        }
      }, 'image/png');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Collection Event QR Code</h2>
      <div className="flex justify-center mb-4">
        <QRCodeCanvas
          value={`http://65.0.238.136:5000/record-step/${batchId}`}
          size={256}
          level="H"
          includeMargin={true}
          fgColor="#000000"
          bgColor="#FFFFFF"
          imageSettings={{
            src: "https://via.placeholder.com/50", // Replace with your logo/image URL
            height: 50,
            width: 50,
            excavate: true,
            opacity: 1,
            crossOrigin: "anonymous", // Ensure CORS compatibility
          }}
          ref={qrRef}
          title={`QR Code for Batch ID: ${batchId}`}
        />
      </div>
      <div className="space-y-4">
        <p className="text-center text-sm font-medium">
          Batch ID: {batchId}
        </p>
        <button
          onClick={downloadQRCode}
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
        >
          Download QR Code
        </button>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
}