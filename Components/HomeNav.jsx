"use client";
import Image from "next/image";
function HomeNav() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-16">
            <Image
              width={128}
              height={128}
              className="w-full h-full"
              src="/LLA-logo.svg"
              alt="Logo"
              priority
            />
          </div>
          <h2 className="text-xl font-bold text-[#e63946]">HomeCare</h2>
        </div>

        <nav className="flex items-center gap-9 pr-12">
          {[
            ["Services", "services"],
            ["How It Works", "how-it-works"],
            ["About Us", "about-us"],
            ["Careers", "careers"],
            ["Testimonials", "testimonials"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium hover:text-primary transition cursor-pointer"
            >
              {label}
            </a>
          ))}
          <a
            href="/signup"
            className="ml-4 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold cursor-pointer hover:opacity-90 active:scale-[0.98]"
          >
            Get Care
          </a>
        </nav>
      </header>
    </>
  );
}

export default HomeNav;
