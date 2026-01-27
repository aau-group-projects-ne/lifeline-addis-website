import { Link } from 'react-router-dom'
function Login() {
    return (
        <>

            <div className="bg-white dark:bg-background-dark text-[#0d141b] dark:text-slate-50 antialiased overflow-hidden">
                <div className="flex min-h-screen w-full">

                    {/* LEFT IMAGE PANEL */}
                    <div className="hidden lg:block lg:w-1/2 relative">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
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
                                Join our community of caregivers and families dedicated to providing
                                the highest standard of support.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT FORM PANEL */}
                    <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark">

                        {/* HEADER */}
                        <div className="p-8 lg:p-12 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-primary">
                                <div className="size-8">
                                    <svg viewBox="0 0 48 48" fill="currentColor">
                                        <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold dark:text-white">HomeCare</span>
                            </div>
                            <Link to={'/'} >
                            <a href="#" className="text-primary text-sm font-semibold hover:underline">
                                Back to website
                            </a>
                            </Link>
                        </div>

                        {/* FORM */}
                        <div className="flex-1 flex items-center justify-center px-8 lg:px-24">
                            <div className="w-full max-w-md space-y-8">

                                <div>
                                    <h2 className="text-3xl font-black dark:text-white">
                                        Welcome Back
                                    </h2>
                                    <p className="mt-2 text-[#4c739a] dark:text-slate-400">
                                        Please enter your details to access your secure account.
                                    </p>
                                </div>

                                <form className="space-y-6">
                                    {/* EMAIL */}
                                    <div>
                                        <label className="block text-sm font-bold mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary transition-all"
                                        />
                                    </div>

                                    {/* PASSWORD */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-bold">Password</label>
                                            <a href="#" className="text-sm font-bold text-primary hover:underline">
                                                Forgot password?
                                            </a>
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary transition-all"
                                        />
                                    </div>

                                    {/* REMEMBER */}
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="h-4 w-4 rounded text-primary"
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-[#4c739a] dark:text-slate-400">
                                            Remember me for 30 days
                                        </label>
                                    </div>

                                    {/* SUBMIT */}
                                    <button
                                        type="submit"
                                        className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98]"
                                    >
                                        Sign In
                                    </button>
                                </form>

                                {/* DIVIDER */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                                    </div>
                                    <div className="relative text-center">
                                        <span className="px-4 bg-white dark:bg-background-dark text-xs font-semibold tracking-wider uppercase text-[#4c739a] dark:text-slate-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                {/* SOCIAL */}
                                <div className="grid grid-cols-2 gap-4">
                                    {["Google", "Apple"].map((provider) => (
                                        <button
                                            key={provider}
                                            className="h-12 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
                                        >
                                            {provider}
                                        </button>
                                    ))}
                                </div>

                                <p className="text-center text-sm text-[#4c739a] dark:text-slate-400">
                                    Don&apos;t have an account?{" "}
                                    <Link to="/Signup">
                                    <a href="#" className="font-bold text-primary hover:underline">
                                        Request Access
                                    </a>
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="p-8 lg:p-12 text-center text-xs text-[#4c739a] dark:text-slate-500">
                            © 2024 HomeCare Services Inc. Secured with 256-bit encryption.
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login;