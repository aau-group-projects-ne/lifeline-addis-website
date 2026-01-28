"use client";
import Image from "next/image";
function HomeNav() {
  return (
    <>
      <header className="w-full flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-0 py-2 sticky top-0 z-50">
        <div className="flex  items-center gap-4 text-primary">
          <div className="size-24">
            <Image
              width={192}
              height={192}
              className="w-full h-full"
              src="/LLA-logo.svg"
              alt="Logo"
              priority
            />
          </div>
          <h2 className="text-xl font-bold text-[#e63946]">HomeCare</h2>
        </div>

        <nav className="ml-auto flex items-center justify-end gap-4 pr-0">
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
              className="text-base md:text-l font-medium text-[#0d141b] hover:text-primary transition cursor-pointer"
            >
              {label}
            </a>
          ))}
          <a
            href="/signup"
            className="ml-2 px-5 py-3 rounded-xl bg-primary text-[#e63946] text-base md:text-l font-bold cursor-pointer hover:opacity-90 active:scale-[0.98]"
          >
            Get Care
          </a>
        </nav>
      </header>
    </>
  );
}

export default HomeNav;
