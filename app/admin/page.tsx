"use client";
import { useEffect, useState } from "react";

type Doctor = { id: number; name: string; email?: string };
type Nurse = { id: number; name: string; email?: string };
type Patient = { id: number; name: string; phoneNumber?: string };
type Link = {
  assessmentId: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  assignedAt: string | Date;
};

function Admin() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<string>("");
  const [assigning, setAssigning] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/admin", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load admin data");

        const patientsList: Patient[] = (data.patients || []).map((p: any) => ({
          id: p.id,
          name: p.user?.name || `Patient #${p.id}`,
          phoneNumber: p.phoneNumber ?? undefined,
        }));
        const doctorsList: Doctor[] = (data.doctors || []).map((d: any) => ({
          id: d.id,
          name: d.name,
          email: d.email,
        }));
        const nursesList: Nurse[] = (data.nurses || []).map((n: any) => ({
          id: n.id,
          name: n.name,
          email: n.email,
        }));

        setPatients(patientsList);
        setDoctors(doctorsList);
        setNurses(nursesList);
        const linksList: Link[] = (data.links || []).map((l: any) => ({
          assessmentId: l.assessmentId,
          patientId: l.patientId,
          patientName: l.patientName,
          doctorId: l.doctorId,
          doctorName: l.doctorName,
          assignedAt: l.assignedAt,
        }));
        setLinks(linksList);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      }
    };
    loadData();
  }, []);

  const assignDoctor = async (patientId: number, doctorId: number) => {
    try {
      setAssigning(true);
      setError("");
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, doctorId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Assignment failed");
    } catch (err: any) {
      setError(err.message || "Assignment failed");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-4xl font-black mb-4">Admin – Assign Patients</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Patients</h2>
          <ul className="space-y-3">
            {patients.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-slate-500">
                    {p.phoneNumber || "No phone"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Doctors</h2>
          <ul className="space-y-3">
            {doctors.map((d) => (
              <li key={d.id} className="p-3 border rounded-lg">
                <p className="font-semibold">{d.name}</p>
                <p className="text-sm text-slate-500">{d.email}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Assign Patient → Doctor</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const patientId = Number(
                (form.elements.namedItem("patientId") as HTMLSelectElement)
                  .value,
              );
              const doctorId = Number(
                (form.elements.namedItem("doctorId") as HTMLSelectElement)
                  .value,
              );
              if (!patientId || !doctorId) return;
              await assignDoctor(patientId, doctorId);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium mb-1">Patient</label>
              <select
                name="patientId"
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
              <label className="block font-medium mb-1">Doctor</label>
              <select
                name="doctorId"
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Select doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={assigning}
              className="bg-[#e63946] text-white px-6 py-3 rounded-xl font-bold cursor-pointer disabled:opacity-60 hover:opacity-90 active:scale-[0.98]"
            >
              {assigning ? "Assigning..." : "Assign"}
            </button>
          </form>
        </section>
      </div>

      <section className="mt-10 bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Doctor–Patient Links</h2>
        {links.length === 0 ? (
          <p className="text-slate-500">No links found.</p>
        ) : (
          <ul className="space-y-3">
            {links.map((l) => (
              <li
                key={l.assessmentId}
                className="p-4 border rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-semibold">{l.patientName}</p>
                  <p className="text-xs text-slate-500">
                    Patient ID: {l.patientId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{l.doctorName}</p>
                  <p className="text-xs text-slate-500">
                    Assigned: {new Date(l.assignedAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10 bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Caregivers (All)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Doctors</h3>
            <ul className="space-y-2">
              {doctors.map((d) => (
                <li key={d.id} className="text-sm">
                  {d.name} ({d.email})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Nurses</h3>
            <ul className="space-y-2">
              {nurses.map((n) => (
                <li key={n.id} className="text-sm">
                  {n.name} ({n.email})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Admin;
