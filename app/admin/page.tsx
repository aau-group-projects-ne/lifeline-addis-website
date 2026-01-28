"use client";
import { useState } from "react";

const timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const schedulesOverlap = (a, b) => {
  const dayOverlap = a.days.some((d) => b.days.includes(d));
  if (!dayOverlap) return false;

  const aStart = timeToMinutes(a.start);
  const aEnd = timeToMinutes(a.end);
  const bStart = timeToMinutes(b.start);
  const bEnd = timeToMinutes(b.end);

  return aStart < bEnd && bStart < aEnd;
};

function Admin() {
  const doctors = [
    {
      id: "doc_001",
      name: "Dr. Samuel Bekele",
      availability: {
        days: ["Mon", "Wed", "Fri"],
        start: "09:00",
        end: "17:00",
      },
    },
    {
      id: "doc_002",
      name: "Dr. Hana Tesfaye",
      availability: {
        days: ["Tue", "Thu"],
        start: "10:00",
        end: "16:00",
      },
    },
  ];

  const nurses = [
    {
      id: "nurse_001",
      name: "Nurse Selam",
      availability: {
        days: ["Mon", "Tue", "Wed"],
        start: "08:00",
        end: "14:00",
      },
    },
    {
      id: "nurse_002",
      name: "Nurse Dawit",
      availability: {
        days: ["Thu", "Fri"],
        start: "12:00",
        end: "18:00",
      },
    },
  ];

  const [patients, setPatients] = useState([
    {
      id: "pat_001",
      name: "Martha Smith",
      careSchedule: {
        days: ["Mon", "Wed"],
        start: "10:00",
        end: "14:00",
      },
      doctorId: "",
      nurseIds: [],
    },
  ]);

  const [error, setError] = useState("");

  const assignDoctor = (patient, doctor) => {
    if (!schedulesOverlap(patient.careSchedule, doctor.availability)) {
      setError("❌ Doctor schedule does not match patient care schedule");
      return;
    }

    setError("");
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id ? { ...p, doctorId: doctor.id } : p,
      ),
    );
  };

  const toggleNurse = (patient, nurse) => {
    if (!schedulesOverlap(patient.careSchedule, nurse.availability)) {
      setError("❌ Nurse schedule does not match patient care schedule");
      return;
    }

    setError("");
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== patient.id) return p;

        const exists = p.nurseIds.includes(nurse.id);
        return {
          ...p,
          nurseIds: exists
            ? p.nurseIds.filter((id) => id !== nurse.id)
            : [...p.nurseIds, nurse.id],
        };
      }),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-4xl font-black mb-4">Admin – Caregiver Assignment</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {patients.map((patient) => (
        <div key={patient.id} className="bg-white border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold">{patient.name}</h2>
          <p className="text-sm text-slate-500 mb-4">
            Care Schedule: {patient.careSchedule.days.join(", ")} |{" "}
            {patient.careSchedule.start}–{patient.careSchedule.end}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DOCTOR */}
            {/* DOCTOR */}
            <div>
              <label className="font-semibold mb-2 block">Assign Doctor</label>

              {doctors.map((doc) => {
                const isAssigned = patient.doctorId === doc.id;

                return (
                  <button
                    key={doc.id}
                    onClick={() => assignDoctor(patient, doc)}
                    className={`block w-full text-left border p-3 rounded-lg mb-2 transition-colors
                ${isAssigned ? "bg-green-100 border-green-500" : "hover:bg-slate-50"}`}
                  >
                    {doc.name} ({doc.id}){" "}
                    {isAssigned && (
                      <span className="text-green-700 font-bold ml-2">
                        ✔ Assigned
                      </span>
                    )}
                    <div className="text-xs text-slate-500">
                      {doc.availability.days.join(", ")} |{" "}
                      {doc.availability.start}–{doc.availability.end}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* NURSES */}
            <div>
              <label className="font-semibold mb-2 block">Assign Nurses</label>

              {nurses.map((nurse) => (
                <label
                  key={nurse.id}
                  className="flex gap-2 items-center border p-3 rounded-lg mb-2"
                >
                  <input
                    type="checkbox"
                    checked={patient.nurseIds.includes(nurse.id)}
                    onChange={() => toggleNurse(patient, nurse)}
                  />
                  <div>
                    {nurse.name} ({nurse.id})
                    <div className="text-xs text-slate-500">
                      {nurse.availability.days.join(", ")} |{" "}
                      {nurse.availability.start}–{nurse.availability.end}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Admin;
