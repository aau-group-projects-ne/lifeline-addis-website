"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
      router.replace("/");
    } catch (e) {
      router.replace("/");
    }
  };
  return (
    <>
      <header className="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-28 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-primary">
          <div>
            <Image
              width={120}
              height={120}
              // className="w-full h-full"
              src="/LLA-logo.svg"
              alt="Logo"
            />
          </div>
        </div>

        <nav className="flex gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/caregiver"
            className="text-sm font-medium hover:text-primary transition cursor-pointer"
          >
            Appointments
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-[#E01F29] hover:opacity-80 cursor-pointer active:scale-[0.98]"
            aria-label="Logout"
          >
            Logout
          </button>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
