"use client";
import Image from "next/image";
function HomeNav() {
  return (
    <>
      <header className="w-full flex items-center justify-between     shadow-md border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-0 py-2 sticky top-0 z-50">
        <div className="flex  items-center gap-4 text-primary">
          <div className="w-1/2 h-1/2">
            <Image
              width={96}
              height={96}
              className="w-1/2 h-1/2"
              src="/LLA-logo.svg"
              alt="Logo"
              priority
            />
          </div>
          
        </div>

        <nav className="flex items-center justify-end gap-10 pr-0">
          {[
            ["Services", "services"],
            ["How", "how-it-works"],
            ["About", "about-us"],
            ["Careers", "careers"],
            ["Testimonials", "testimonials"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-[#0d141b] hover:text-primary transition cursor-pointer"
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
