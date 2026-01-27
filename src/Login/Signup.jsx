import { useState } from "react";

function Signup(){
      const [form, setForm] = useState({
    userType: "family",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (form.fullName.trim().length < 2)
      e.fullName = "Full name must be at least 2 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address";

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password))
      e.password =
        "Password must be at least 8 characters with uppercase, lowercase, and numbers";

    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!form.agreeTerms)
      e.agreeTerms = "You must agree to the terms and conditions";

    setErrors(e);
    
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Form submitted:", form);
    alert("Registration successful! (Demo)");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
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
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="p-8 border-b dark:border-slate-800 flex justify-between">
          <span className="font-bold text-xl text-primary">LifeLine Addis</span>
          <a href="/" className="text-primary text-sm font-semibold">
            Back to Home
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center justify-center px-8"
        >
          <div className="w-full max-w-md space-y-6">

            <h2 className="text-3xl font-black">Create Your Account</h2>

            {/* USER TYPE */}
            <div className="flex gap-6">
              {["family", "caregiver"].map((type) => (
                <label key={type} className="flex gap-2 items-center">
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
            </div>

            {/* INPUTS */}
            {[
              ["fullName", "Full Name", "text"],
              ["email", "Email Address", "email"],
              ["password", "Password", "password"],
              ["confirmPassword", "Confirm Password", "password"],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label className="font-bold text-sm">{label}</label>
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  onBlur={validate}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 mt-1"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name]}</p>
                )}
              </div>
            ))}

            {/* TERMS */}
            <div className="flex gap-2 items-start">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
              />
              <span className="text-sm">
                I agree to the{" "}
                <a className="text-primary font-bold">Terms</a> and{" "}
                <a className="text-primary font-bold">Privacy Policy</a>
              </span>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
            )}

            {/* SUBMIT */}
            <button className="w-full h-14 bg-primary text-white rounded-xl font-bold">
              Create Account
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-bold">
                Sign In
              </a>
            </p>
          </div>
        </form>

        <div className="p-6 text-xs text-center dark:text-slate-500">
          © 2024 LifeLine Addis HomeCare Services Inc.
        </div>
      </div>
    </div>
  );
    
}
export default Signup;