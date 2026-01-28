"use client";
import Navbar from "../../../Components/Navbar.jsx";
import { useState, useEffect } from "react";
import FileUploadBox from "../../../Components/FileUploadBox.jsx";
import CaregiverRatingForm from "../../../Components/RatingFrom.jsx";
import { useParams } from "next/navigation";

/* ---------------- TYPES ---------------- */
interface User {
  id: number;
  name: string;
  email: string;
}

interface Doctor {
  id: number;
  name: string;
  email: string;
}

interface Assessment {
  id: number;
  doctor?: Doctor;
}

interface Patient {
  id: number;
  phoneNumber: string;
  user: User;
  assessments?: Assessment[]; // ✅ plural
}

interface Caregiver {
<<<<<<< HEAD
=======
  id: number;
>>>>>>> main
  name: string;
  contact: string;
}

/* ---------------- COMPONENT ---------------- */
function PatientPage() {
  const { id } = useParams(); // dynamic route param
  const patientId = Number(id);

  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await fetch(`/api/patient/${patientId}`);
        if (!res.ok) {
          const text = await res.text();
          console.error("API error:", text);
          return;
        }
        const data: Patient = await res.json();
        setPatient(data);

<<<<<<< HEAD
        if (data.assessments?.length > 0 && data.assessments[0].doctor) {
          const doctor = data.assessments[0].doctor;
          setCaregiver({ name: doctor.name, contact: doctor.email });
=======
        const firstAssessment = data.assessments?.[0];
        if (firstAssessment?.doctor) {
          const doctor = firstAssessment.doctor;
          setCaregiver({
            id: doctor.id,
            name: doctor.name,
            contact: doctor.email,
          });
>>>>>>> main
        }
      } catch (err) {
        console.error("Failed to fetch patient", err);
      } finally {
        setLoading(false);
      }
    }

    if (patientId) fetchPatient();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (!patient) return <p>No patient data found</p>;

  return (
    <div className="bg-background-light min-h-screen">
<<<<<<< HEAD
      <Navbar />
=======
      <Navbar showAppointments={false} />
>>>>>>> main
      <main className="flex justify-center py-10 px-28 lg:px-40">
        <div className="max-w-[1200px] w-full space-y-8">
          <div className="ml-2">
            <h1 className="text-3xl font-bold">
              Welcome {patient.user?.name || "Patient"}!
            </h1>
            <p className="text-[#4c739a] mt-2">
              Provide details so we can match you with the best caregiver.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <section className="flex-1 space-y-8">
              <div className="bg-white p-8 rounded-xl border mb-4 grid grid-cols-3 gap-4">
                <p className="text-md font-bold mb-2">{patient.user?.name}</p>
                <p className="text-md font-bold mb-2">{patient.phoneNumber}</p>
              </div>

              <div className="bg-white p-8 rounded-xl border mb-4 flex flex-col">
                <h2 className="font-bold text-xl mb-3 ml-5">
                  Your Current Caregiver
                </h2>
                {caregiver ? (
                  <div className="ml-7">
                    <p className="mb-2 font-semibold">{caregiver.name}</p>
                    <p className="font-semibold">
                      Contact: {caregiver.contact}
                    </p>
<<<<<<< HEAD
=======
                    <div className="mt-4">
                      <CaregiverRatingForm
                        patientId={patientId}
                        caregiverId={caregiver.id}
                      />
                    </div>
>>>>>>> main
                  </div>
                ) : (
                  <p>No caregiver assigned</p>
                )}
<<<<<<< HEAD
                <CaregiverRatingForm />
=======
>>>>>>> main
              </div>

              <div className="flex justify-between">
                <button className="px-8 py-3 bg-[#E01F29] text-white rounded-lg font-bold">
                  Continue
                </button>
              </div>
            </section>

            <aside className="w-full lg:w-[320px] space-y-4">
              <div className="bg-white p-6 rounded-xl border">
<<<<<<< HEAD
                <FileUploadBox />
=======
                {patient.assessments && patient.assessments.length > 0 ? (
                  <FileUploadBox
                    patientId={patient.id}
                    assessmentId={patient.assessments[0].id}
                  />
                ) : (
                  <p className="text-sm text-slate-500">
                    No assessments available yet.
                  </p>
                )}
>>>>>>> main
              </div>
              <div className="bg-[#E01F29]/10 border border-[#E01F29]/20 rounded-xl p-6">
                <p className="text-sm mb-4">
                  Our coordinators are available 24/7.
                </p>
                <a
                  href="tel:1800-CARE-NOW"
                  className="block text-center bg-[#E01F29] text-white py-2 rounded-lg font-bold"
                >
                  Call CARE
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientPage;
