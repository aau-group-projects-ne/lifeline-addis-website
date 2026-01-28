"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

function NurseDashboard({ nurseId }: { nurseId: string }) {
  const [nurse, setNurse] = useState<any>(null);
  const [updateForm, setUpdateForm] = useState({
    assessmentId: "",
    statusUpdate: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNurse = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/nurse/${nurseId}`, { cache: "no-store" });

        // read raw text once
        const text = await res.text();
        if (!text) {
          setError(`Empty response from backend (status ${res.status})`);
          return;
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          setError(`Non‑JSON response (status ${res.status}): ${text}`);
          return;
        }

        if (!res.ok) {
          setError(
            `Backend error ${res.status}: ${data.error || "Unknown error"}`,
          );
          return;
        }

        if (data.error) {
          setError(data.error);
          return;
        }

        setNurse(data);
      } catch (err: any) {
        setError(`Fetch failed: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };
    loadNurse();
  }, [nurseId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateForm.assessmentId || !updateForm.statusUpdate) return;

    try {
      const payload = {
        assessmentId: Number(updateForm.assessmentId),
        nurseId: nurse.id,
        statusUpdate: updateForm.statusUpdate,
      };

      const res = await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!text) {
        setError(`Update failed ${res.status}: empty response`);
        return;
      }

      let newUpdate;
      try {
        newUpdate = JSON.parse(text);
      } catch {
        setError(`Update failed ${res.status}: ${text}`);
        return;
      }

      if (!res.ok) {
        setError(
          `Update failed ${res.status}: ${newUpdate.error || "Unknown error"}`,
        );
        return;
      }

      // append into nurse.nurseUpdates
      setNurse((prev: any) => ({
        ...prev,
        nurseUpdates: [newUpdate, ...(prev.nurseUpdates || [])],
      }));

      setUpdateForm({ assessmentId: "", statusUpdate: "" });
    } catch (err: any) {
      setError(`Update failed: ${err.message || err}`);
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-600">Error: {error}</p>;
  if (!nurse) return <p className="p-10">No nurse data found.</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      {/* HEADER */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Welcome, {nurse.name}</h1>
          <p className="text-slate-500">Role: {nurse.role}</p>
        </div>
        <Link href="/" className="text-[#e63946] font-semibold">
          Home
        </Link>
      </header>

      {/* Add Update */}
      <section className="bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-bold mb-4">Add Update</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Assessment ID</label>
            <input
              type="text"
              name="assessmentId"
              value={updateForm.assessmentId}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter assessment ID"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Status Update</label>
            <textarea
              name="statusUpdate"
              value={updateForm.statusUpdate}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Patient stable, medication administered..."
            />
          </div>
          <button
            type="submit"
<<<<<<< HEAD
            className="w-full bg-[#e63946] text-white py-3 rounded-xl font-bold"
=======
            className="w-full bg-[#e63946] text-white py-3 rounded-xl font-bold cursor-pointer active:scale-[0.98] hover:opacity-90"
>>>>>>> main
          >
            Submit Update
          </button>
        </form>
      </section>

      {/* Nurse's own updates */}
      <section className="bg-white rounded-xl p-6 border mt-8">
        <h2 className="text-xl font-bold mb-4">My Updates</h2>
        {nurse.nurseUpdates?.length === 0 ? (
          <p className="text-slate-400">No updates submitted yet.</p>
        ) : (
          nurse.nurseUpdates.map((u: any) => (
            <div key={u.id} className="border rounded-xl p-4 mb-4">
              <p className="text-sm">{u.statusUpdate}</p>
              <span className="text-xs text-slate-400">
                {new Date(u.updatedAt).toLocaleString()} — Assessment #
                {u.assessmentId}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default NurseDashboard;
