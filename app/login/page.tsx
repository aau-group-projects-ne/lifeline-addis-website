"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }

      // ✅ Cookie is already set by backend
      // Redirect based on role
      if (data.role === "patient") {
        router.push(`/patient/${data.userId}`);
      } else if (data.role === "doctor") {
        router.push(`/doctor/${data.userId}`);
      } else if (data.role === "nurse") {
        router.push(`/nurse/${data.userId}`);
      } else {
        router.push("/unauthorized");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black antialiased overflow-x-hidden min-h-screen w-full">
      <div className="flex min-h-screen w-full">
        {/* LEFT IMAGE PANEL */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfyqH-5lx2EPsqIm6sVFlaRu-9LBYo_1XSJICZVFEXlHg6TarRgJLqR0ab0rBWLTwao1GLPn3Pa8_1aP_Mcme60M4XaCo-dVC6aENUub4N7uzEDyqTcLwiK2LfsxsCWvGdTFsuR0MZVaSYa37fRbsBt6DOjvHFE17Z1kYo5HsJxHI1I3j-XNt3n2DbWII7sYFuj2TjKXc66SuV7zVfOqD_0WDzb5zT8kp3HDOQbEh5vfctsoJzJPPOUA9t-uJ6_RNg6hdYLKnlCyY")',
            }}
          >
            <div className="absolute inset-0 bg-[#E01F29]/20" />
          </div>
          <div className="absolute bottom-12 left-12 right-12 text-white z-10">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
              Professional Care, Closer to Heart
            </h1>
            <p className="text-lg opacity-90 max-w-md drop-shadow-sm">
              Join our community of caregivers and families dedicated to
              providing the highest standard of support.
            </p>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white overflow-x-hidden">
          {/* HEADER */}
          <div className="px-8 lg:px-12 flex justify-between items-center">
            <div className="flex items-center gap-3 text-[#E01F29]">
              <Image
<<<<<<< HEAD
                src="/tg_image_3199460643.jpeg"
=======
                src="/LLA-logo.svg"
>>>>>>> main
                alt="Logo"
                width={240}
                height={80}
                className="object-contain"
<<<<<<< HEAD
=======
                priority
>>>>>>> main
              />
            </div>
            <Link
              href="/"
              className="text-[#E01F29] text-md font-semibold hover:underline"
            >
              Home
            </Link>
          </div>

          {/* FORM */}
          <div className="flex-1 flex items-center justify-center px-8 lg:px-24">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-black text-black">Welcome Back</h2>
                <p className="mt-2 text-[#4c739a]">
                  Please enter your details to access your secure account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#E01F29] transition-all"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-[#E01F29] transition-all"
                  />
                </div>

                {/* REMEMBER */}
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded text-[#E01F29]"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-[#4c739a]"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {/* ERROR */}
                {error && (
                  <p className="text-sm font-semibold text-red-500">{error}</p>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
<<<<<<< HEAD
                  className="w-full h-14 bg-[#E01F29] hover:bg-[#c81a24] text-white font-bold rounded-xl shadow-lg shadow-[#E01F29]/20 active:scale-[0.98] disabled:opacity-60"
=======
                  className="w-full h-14 bg-[#E01F29] hover:bg-[#c81a24] text-white font-bold rounded-xl shadow-lg shadow-[#E01F29]/20 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
>>>>>>> main
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* SIGN UP */}
              <p className="text-center text-sm text-[#4c739a]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#E01F29] hover:underline"
                >
                  Request Access
                </Link>
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 lg:p-8 text-center text-xs text-[#4c739a]">
            © 2024 HomeCare Services Inc. Secured with 256-bit encryption.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
