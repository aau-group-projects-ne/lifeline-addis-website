"use client";
import { useState } from "react";
import Link from "next/link";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Store token securely
      localStorage.setItem("token", data.token);

      alert("Login successful!");
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-background-dark text-[#0d141b] dark:text-slate-50 antialiased overflow-x-hidden min-h-screen w-full">
        <div className="flex min-h-screen w-full">
          {/* LEFT IMAGE PANEL */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfyqH-5lx2EPsqIm6sVFlaRu-9LBYo_1XSJICZVFEXlHg6TarRgJLqR0ab0rBWLTwao1GLPn3Pa8_1aP_Mcme60M4XaCo-dVC6aENUub4N7uzEDyqTcLwiK2LfsxsCWvGdTFsuR0MZVaSYa37fRbsBt6DOjvHFE17Z1kYo5HsJxHI1I3j-XNt3n2DbWII7sYFuj2TjKXc66SuV7zVfOqD_0WDzb5zT8kp3HDOQbEh5vfctsoJzJPPOUA9t-uJ6_RNg6hdYLKnlCyY")',
              }}
            >
              <div className="absolute inset-0 bg-primary/20 backdrop-brightness-95" />
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
          <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark overflow-x-hidden">
            {/* HEADER */}
            <div className="px-8 lg:px-12 flex justify-between items-center">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-1/2 h-full">
                  <span>
                    <img
                      className="w-full h-full"
                      src="/tg_image_3199460643.jpeg"
                      alt="Logo"
                    />
                  </span>
                </div>
              </div>

              <div className="w-full flex items-center">
                <Link
                  href="/"
                  className="text-primary text-md font-semibold hover:underline "
                >
                  Home
                </Link>
              </div>
            </div>

            {/* FORM */}
            <div className="flex-1 flex items-center justify-center px-8 lg:px-24">
              <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-black dark:text-white">
                    Welcome Back
                  </h2>
                  <p className="mt-2 text-[#4c739a] dark:text-slate-400">
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary transition-all"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold">Password</label>
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary transition-all"
                    />
                  </div>

                  {/* REMEMBER */}
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded text-primary"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-[#4c739a] dark:text-slate-400"
                    >
                      Remember me for 30 days
                    </label>
                  </div>

                  {/* ERROR */}
                  {error && (
                    <p className="text-sm font-semibold text-red-500">
                      {error}
                    </p>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-60"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>

                {/* SIGN IN */}

                <p className="text-center text-sm text-[#4c739a] dark:text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/Signup"
                    className="font-bold text-primary hover:underline"
                  >
                    Request Access
                  </Link>
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-6 lg:p-8 text-center text-xs text-[#4c739a] dark:text-slate-500">
              © 2024 HomeCare Services Inc. Secured with 256-bit encryption.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
