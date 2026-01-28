"use client";
import { useRef, useState } from "react";

function FileUploadBox({ patientId, assessmentId }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("slip", file);
    formData.append("patientId", patientId);
    formData.append("assessmentId", assessmentId);

    try {
      const res = await fetch("/api/payments/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      console.log("Payment saved:", data);
      setStatus("Upload successful!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("Error uploading file.");
    }
  };

  return (
    <div className="max-w-md">
      {/* Upload Area */}
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-primary rounded-xl p-8 text-center cursor-pointer hover:bg-primary/5 transition"
      >
        <p className="font-medium">
          {file ? file.name : "Click to upload payment receipt"}
        </p>
        <p className="text-sm text-slate-500">PNG, JPG, PDF up to 5MB</p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".png,.jpg,.jpeg,.pdf"
      />

      {/* Upload Button */}
      {file && (
        <button
          onClick={handleUpload}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer hover:opacity-90 active:scale-[0.98]"
        >
          Upload
        </button>
      )}

      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}

export default FileUploadBox;
