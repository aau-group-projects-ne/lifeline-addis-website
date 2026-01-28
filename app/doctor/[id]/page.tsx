"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

function DoctorDashboard({ params }) {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    document: "",
    estimatedPrice: "",
  });

  // Load doctor data from API
  useEffect(() => {
    const loadDoctor = async () => {
      const res = await fetch(`/api/doctor/${params.id}`);
      const data = await res.json();
      setDoctor(data);
      setPatients(data.patients || []);
      setAssessments(data.assessments || []);
    };
    loadDoctor();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientId || !form.document || !form.estimatedPrice) return;

    const payload = {
      patientId: form.patientId,
      doctorId: doctor.id,
      document: form.document,
      estimatedPrice: form.estimatedPrice,
    };

    const res = await fetch("/api/assessments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const newAssessment = await res.json();
    setAssessments((prev) => [newAssessment, ...prev]);

    setForm({ patientId: "", document: "", estimatedPrice: "" });
  };

  const getPatientName = (id) =>
    patients.find((p) => p.id === id)?.name || "Unknown";

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      {/* HEADER */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Welcome, {doctor.name}</h1>
          <p className="text-slate-500">{doctor.specialty}</p>
        </div>
        <Link href="/" className="text-[#e63946] font-semibold">
          Home
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PATIENT LIST */}
        <section className="bg-white rounded-xl p-6 border">
          <h2 className="text-xl font-bold mb-4">Your Patients</h2>
          <ul className="space-y-3">
            {patients.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-slate-500">{p.age} years old</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CREATE ASSESSMENT */}
        <section className="bg-white rounded-xl p-6 border lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">New Assessment</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Patient</label>
              <select
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Select patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Assessment Document
              </label>
              <textarea
                name="document"
                value={form.document}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Diagnosis, findings, treatment plan..."
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Estimated Price (ETB)
              </label>
              <input
                type="number"
                name="estimatedPrice"
                value={form.estimatedPrice}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-[#e63946] text-white px-6 py-3 rounded-xl font-bold"
            >
              Save Assessment
            </button>
          </form>
        </section>
      </div>

      {/* ASSESSMENTS LIST */}
      <section className="mt-10 bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-bold mb-6">Assessments</h2>
        {assessments.length === 0 ? (
          <p className="text-slate-500">No assessments yet.</p>
        ) : (
          <div className="space-y-6">
            {assessments.map((a) => (
              <div key={a.id} className="border rounded-xl p-5">
                <div className="flex justify-between mb-2">
                  <p className="font-bold">{getPatientName(a.patientId)}</p>
                  <span className="text-sm text-slate-400">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-slate-700 mb-2">{a.document}</p>
                <p className="font-semibold text-[#e63946]">
                  Estimated Price: ETB {a.estimatedPrice}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DoctorDashboard;
