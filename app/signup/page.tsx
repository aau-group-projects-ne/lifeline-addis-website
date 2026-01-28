"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */
interface SignupForm {
  userType: "patient" | "nurse" | "doctor";
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

function Signup() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    userType: "patient",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  /* ---------------- PASSWORD STRENGTH ---------------- */
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return { score, label: levels[score - 1] || "Very Weak" };
  };

  const passwordStrength = getPasswordStrength(form.password);

  /* ---------------- FIELD VALIDATION ---------------- */
  const validateField = (name: string, value: any) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (value.trim().length < 2)
          error = "Full name must be at least 2 characters";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Please enter a valid email address";
        break;
      case "password":
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value))
          error =
            "Password must be 8+ chars with uppercase, lowercase, and number";
        break;
      case "confirmPassword":
        if (value && value !== form.password) error = "Passwords do not match";
        break;
      case "agreeTerms":
        if (!value) error = "You must agree to the terms";
        break;
    }
    return error;
  };

  const validateAll = () => {
    const newErrors: FormErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validateField(field, (form as any)[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, fieldValue) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
          role: form.userType.toLowerCase(), // ensures "Patient" → "patient"
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }
      // Redirect to login so user can sign in
      alert("Registration successful! Please sign in to continue.");
      router.push("/login");
      setForm({
        userType: "patient",
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  /* ---------------- RENDER ---------------- */
  return (
    <div className="bg-white text-[#0d141b] min-h-screen flex overflow-x-hidden">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfyqH-5lx2EPsqIm6sVFlaRu-9LBYo_1XSJICZVFEXlHg6TarRgJLqR0ab0rBWLTwao1GLPn3Pa8_1aP_Mcme60M4XaCo-dVC6aENUub4N7uzEDyqTcLwiK2LfsxsCWvGdTFsuR0MZVaSYa37fRbsBt6DOjvHFE17Z1kYo5HsJxHI1I3j-XNt3n2DbWII7sYFuj2TjKXc66SuV7zVfOqD_0WDzb5zT8kp3HDOQbEh5vfctsoJzJPPOUA9t-uJ6_RNg6hdYLKnlCyY")',
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h1 className="text-4xl font-black mb-4">Join Our Care Community</h1>
          <p className="text-lg max-w-md opacity-90">
            HomeCare connects families and caregivers to provide compassionate
            support.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="px-8 flex items-center justify-between">
          <span className="font-bold text-xl text-[#E01F29] w-full h-full">
            <Image
              src="/LLA-logo.svg"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
          </span><div >
          <Link
            href="/"
            className="text-[#E01F29] text-md font-semibold w-full"
          >
            Home
          </Link></div>
        </div>

        {/* SIGNUP FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center justify-center px-8 "
        >
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-black text-center">
              Create Your Account
            </h2>

            {/* USER TYPE */}
            <fieldset className="flex gap-6 items-center">
              <legend className="sr-only">User Type</legend>
              {["patient", "doctor", "nurse"].map((type) => (
                <label
                  key={type}
                  className="flex gap-2 items-center capitalize"
                >
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={form.userType === type}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              ))}
            </fieldset>

            {/* ROLE MESSAGING */}
            <div className="rounded-xl bg-slate-50 p-4 text-sm">
              {form.userType === "patient" && (
                <p>
                  You are signing up as a{" "}
                  <span className="font-bold">patient</span> to request care.
                  We'll help connect you with nurses and doctors.
                </p>
              )}
              {form.userType === "nurse" && (
                <p>
                  You are signing up as a{" "}
                  <span className="font-bold">nurse</span> to apply for a job
                  and care for others.
                </p>
              )}
              {form.userType === "doctor" && (
                <p>
                  You are applying as a{" "}
                  <span className="font-bold">doctor</span> to perform initial
                  examinations and support patient assessments.
                </p>
              )}
            </div>

            {/* INPUTS */}
            {[
              ["fullName", "Full Name", "text", "name"],
              ["phone", "Phone Number", "tel", "tel"],
              ["email", "Email Address", "email", "email"],
              ["password", "Password", "password", "new-password"],
              [
                "confirmPassword",
                "Confirm Password",
                "password",
                "new-password",
              ],
            ].map(([name, label, type, auto]) => (
              <div key={name}>
                <label className="font-bold text-sm">{label}</label>
                <input
                  name={name}
                  type={type}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete={auto}
                  placeholder={label}
                  required
                  className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50 mt-1"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name]}</p>
                )}

                {/* PASSWORD STRENGTH */}
                {name === "password" && form.password && (
                  <div className="mt-2">
                    <div className="h-2 w-full bg-slate-200 rounded">
                      <div
                        className="h-2 rounded bg-[#E01F29] transition-all"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1">
                      Strength: {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* TERMS */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-[#E01F29] font-bold">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#E01F29] font-bold">
                  Privacy Policy
                </Link>
              </span>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
            )}

            {/* SUBMIT */}
            <button
              disabled={isSubmitting}
              className="w-full h-14 bg-[#E01F29] text-white rounded-xl font-bold disabled:opacity-50 hover:bg-[#E01F29]/90"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#E01F29] font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </form>

        {/* FOOTER */}
        <div className="p-6 text-xs text-center text-slate-500">
          © 2024 LifeLine Addis HomeCare Services Inc.
        </div>
      </div>
    </div>
  );
}

export default Signup;
