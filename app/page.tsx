"use client";
import { useState } from "react";

export default function HomePage() {
  // Auth
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Doctor
  const [docPatientId, setDocPatientId] = useState("");
  const [docDocument, setDocDocument] = useState("");
  const [docPrice, setDocPrice] = useState("");

  // Nurse
  const [nurseAssessmentId, setNurseAssessmentId] = useState("");
  const [nurseStatus, setNurseStatus] = useState("");

  // Rating
  const [ratingPatientId, setRatingPatientId] = useState("");
  const [ratingUserId, setRatingUserId] = useState("");
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState("");

  // Payment Slip
  const [payPatientId, setPayPatientId] = useState("");
  const [payAssessmentId, setPayAssessmentId] = useState("");
  const [payFile, setPayFile] = useState<File | null>(null);

  // Helper: fetch with token
  async function api(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch(`/api${path}`, { ...options, headers });
    if (!res.ok) {
      const text = await res.text(); // fallback if not JSON
      throw new Error(`Request failed: ${res.status} ${text}`);
    }

    return res.json();
  }

  // Handlers
  async function handleRegister() {
    await api("/auth/register", {
      method: "POST",
      body: JSON.stringify(regForm),
    });
    alert("Registered!");
  }

  async function handleLogin() {
    const res = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    localStorage.setItem("token", res.token);
    alert("Logged in!");
  }

  async function createAssessment() {
    await api("/assessments", {
      method: "POST",
      body: JSON.stringify({
        patientId: Number(docPatientId),
        doctorId: 1, // replace with logged-in doctor ID
        document: docDocument,
        estimatedPrice: Number(docPrice),
      }),
    });
    alert("Assessment created!");
  }

  async function addUpdate() {
    await api("/updates", {
      method: "POST",
      body: JSON.stringify({
        assessmentId: Number(nurseAssessmentId),
        nurseId: 2, // replace with logged-in nurse ID
        statusUpdate: nurseStatus,
      }),
    });
    alert("Update added!");
  }

  async function submitRating() {
    await api("/ratings", {
      method: "POST",
      body: JSON.stringify({
        patientId: Number(ratingPatientId),
        ratedUserId: Number(ratingUserId),
        score: Number(ratingScore),
        comment: ratingComment,
      }),
    });
    alert("Rating submitted!");
  }

  async function uploadSlip() {
    if (!payFile) return alert("Select a file first!");
    const formData = new FormData();
    formData.append("slip", payFile);
    formData.append("patientId", payPatientId);
    formData.append("assessmentId", payAssessmentId);

    await api("/payments/upload", { method: "POST", body: formData });
    alert("Slip uploaded!");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">🏥 Medical Home Care Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Register */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Name"
            value={regForm.name}
            onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="Email"
            value={regForm.email}
            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-2"
            type="password"
            placeholder="Password"
            value={regForm.password}
            onChange={(e) =>
              setRegForm({ ...regForm, password: e.target.value })
            }
          />
          <select
            className="border p-2 w-full mb-2"
            value={regForm.role}
            onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="admin">Admin</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            onClick={handleRegister}
          >
            Register
          </button>
        </section>

        {/* Login */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-2"
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </section>

        {/* Doctor */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Doctor Assessment</h2>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Patient ID"
            value={docPatientId}
            onChange={(e) => setDocPatientId(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Document"
            value={docDocument}
            onChange={(e) => setDocDocument(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="Estimated Price"
            value={docPrice}
            onChange={(e) => setDocPrice(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
            onClick={createAssessment}
          >
            Create Assessment
          </button>
        </section>

        {/* Nurse */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Nurse Update</h2>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Assessment ID"
            value={nurseAssessmentId}
            onChange={(e) => setNurseAssessmentId(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Status Update"
            value={nurseStatus}
            onChange={(e) => setNurseStatus(e.target.value)}
          />
          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full"
            onClick={addUpdate}
          >
            Add Update
          </button>
        </section>

        {/* Rating */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Patient Rating</h2>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Patient ID"
            value={ratingPatientId}
            onChange={(e) => setRatingPatientId(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="Rated User ID"
            value={ratingUserId}
            onChange={(e) => setRatingUserId(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-2"
            type="number"
            min="1"
            max="5"
            value={ratingScore}
            onChange={(e) => setRatingScore(Number(e.target.value))}
          />
          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Comment"
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
          />
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            onClick={submitRating}
          >
            Submit Rating
          </button>
        </section>

        {/* Payment Slip */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            💳 Upload Payment Slip
          </h2>

          <div className="space-y-3">
            <input
              className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400"
              placeholder="Patient ID"
              value={payPatientId}
              onChange={(e) => setPayPatientId(e.target.value)}
            />

            <input
              className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-400"
              placeholder="Assessment ID"
              value={payAssessmentId}
              onChange={(e) => setPayAssessmentId(e.target.value)}
            />

            <input
              type="file"
              className="block w-full text-sm text-gray-500 
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
              onChange={(e) => setPayFile(e.target.files?.[0] || null)}
            />

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full 
                 hover:bg-blue-700 transition-colors"
              onClick={uploadSlip}
            >
              Upload Slip
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
