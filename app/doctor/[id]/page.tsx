"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

<<<<<<< HEAD
function DoctorDashboard({ params }) {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState({
=======
type Doctor = { id: number; name: string; specialty?: string };
type Patient = { id: number; name: string; age?: number };
type Assessment = {
  id: number;
  patientId: number;
  document: string;
  estimatedPrice: number;
  createdAt: string | Date;
};

function DoctorDashboard({ params }: { params: { id: string } }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [form, setForm] = useState<{
    patientId: string;
    document: string;
    estimatedPrice: string;
  }>({
>>>>>>> main
    patientId: "",
    document: "",
    estimatedPrice: "",
  });

  // Load doctor data from API
  useEffect(() => {
    const loadDoctor = async () => {
      const res = await fetch(`/api/doctor/${params.id}`);
      const data = await res.json();
<<<<<<< HEAD
      setDoctor(data);
      setPatients(data.patients || []);
      setAssessments(data.assessments || []);
=======
      setDoctor({
        id: data.id,
        name: data.name,
        specialty: (data as any).specialty,
      });
      const assessmentsRaw = data.doctorAssessments || [];
      const patientsMap = new Map<number, Patient>();
      const assessmentsList: Assessment[] = assessmentsRaw.map((a: any) => {
        const p = a.patient;
        const name = p?.user?.name || `Patient #${p?.id}`;
        if (p && !patientsMap.has(p.id)) {
          patientsMap.set(p.id, { id: p.id, name, age: p.age ?? undefined });
        }
        return {
          id: a.id,
          patientId: a.patientId,
          document: a.document,
          estimatedPrice: a.estimatedPrice,
          createdAt: a.createdAt,
        };
      });
      setPatients(Array.from(patientsMap.values()));
      setAssessments(assessmentsList);
>>>>>>> main
    };
    loadDoctor();
  }, [params.id]);

<<<<<<< HEAD
  const handleChange = (e) => {
=======
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
>>>>>>> main
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientId || !form.document || !form.estimatedPrice) return;
=======
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.patientId || !form.document || !form.estimatedPrice) return;
    if (!doctor) return;
>>>>>>> main

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

<<<<<<< HEAD
  const getPatientName = (id) =>
=======
  const getPatientName = (id: number) =>
>>>>>>> main
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
<<<<<<< HEAD
              className="bg-[#e63946] text-white px-6 py-3 rounded-xl font-bold"
=======
              className="bg-[#e63946] text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:opacity-90 active:scale-[0.98]"
>>>>>>> main
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
