"use client";
import { useState } from "react";

function CaregiverRatingForm({ patientId, caregiverId }) {
  const [form, setForm] = useState({ rating: 0, comment: "" });
  const [error, setError] = useState("");
  const MAX_WORDS = 100;

  const wordCount = form.comment.trim()
    ? form.comment.trim().split(/\s+/).length
    : 0;

  const handleRating = (value) => {
    setForm((prev) => ({ ...prev, rating: value }));
    setError("");
  };

  const handleComment = (e) => {
    const text = e.target.value;
    if (text.trim().split(/\s+/).length <= MAX_WORDS) {
      setForm((prev) => ({ ...prev, comment: text }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (form.comment.trim().length < 10) {
      setError("Please write at least 10 characters.");
      return;
    }

    const payload = {
      patientId,
      ratedUserId: caregiverId,
      score: form.rating,
      comment: form.comment,
    };

    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit rating");
      const data = await res.json();

      console.log("Saved rating:", data);
      alert("Thank you for your feedback!");
      setForm({ rating: 0, comment: "" });
    } catch (err) {
      setError("Error submitting rating. Please try again.");
    }
  };

  return (
    <div className="w-full bg-white p-8">
      <h2 className="text-xl font-bold mb-4">Rate Your Caregiver</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STAR RATING */}
        <div>
          <label className="block font-medium mb-2">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => handleRating(star)}
                className={`text-3xl transition ${
                  star <= form.rating ? "text-yellow-400" : "text-slate-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* COMMENT */}
        <div>
          <label className="block font-medium mb-2">Written Feedback</label>
          <textarea
            value={form.comment}
            onChange={handleComment}
            placeholder="Share your experience..."
            className="w-full h-28 p-4 border rounded-xl resize-none"
          />
          <p className="text-xs text-slate-500 mt-1">
            {wordCount}/{MAX_WORDS} words
          </p>
        </div>

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-1/5 justify-self-end bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default CaregiverRatingForm;
