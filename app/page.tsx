import Link from "next/link";
import Image from "next/image";
import HomeNav from "../Components/HomeNav.jsx";

function Homepage() {
  return (
    <div className="bg-background-light text-[#0d141b] min-h-screen">
      <HomeNav />

      {/* HERO */}
      <section
        id="about-us"
        className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center scroll-mt-24"
      >
        <div
          className="aspect-video rounded-xl bg-cover bg-center shadow-xl"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfyqH-5lx2EPsqIm6sVFlaRu-9LBYo_1XSJICZVFEXlHg6TarRgJLqR0ab0rBWLTwao1GLPn3Pa8_1aP_Mcme60M4XaCo-dVC6aENUub4N7uzEDyqTcLwiK2LfsxsCWvGdTFsuR0MZVaSYa37fRbsBt6DOjvHFE17Z1kYo5HsJxHI1I3j-XNt3n2DbWII7sYFuj2TjKXc66SuV7zVfOqD_0WDzb5zT8kp3HDOQbEh5vfctsoJzJPPOUA9t-uJ6_RNg6hdYLKnlCyY")',
          }}
        />

        <div>
          <h1 className="text-5xl font-black mb-4">
            Compassionate Care in the Comfort of Your Home
          </h1>
          <p className="text-lg text-slate-500 mb-6">
            Professional, personalized caregiving services tailored to your
            family's unique needs.
          </p>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="bg-[#e63946] text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:opacity-90 active:scale-[0.98]">
                Book a Consultation
              </button>
            </Link>
            <a
              href="#services"
              className="border-2 border-[#e63946] text-[#e63946] px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-[#e63946]/5 active:scale-[0.98]"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            ["200+", "Families Supported"],
            ["120+", "Certified Caregivers"],
            ["24/7", "On-call Support"],
            ["4+", "Years of Service"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-[#e63946]/10 p-6 shadow-sm"
            >
              <p className="text-4xl font-black text-[#e63946]">{value}</p>
              <p className="mt-1 text-[#4c739a] font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-16 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-black mb-8 text-[#0d141b]">
            How It Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Sign Up", "Create an account and tell us your needs."],
              ["Get Matched", "We recommend a caregiver or doctor for you."],
              [
                "First Visit",
                "Schedule an initial assessment or consultation.",
              ],
              ["Ongoing Care", "Receive continuous support and updates."],
            ].map(([title, desc], idx) => (
              <div
                key={title}
                className="rounded-xl border border-[#e63946]/10 p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#e63946]/10 flex items-center justify-center font-bold text-[#e63946] mb-3">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-white py-16 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-black mb-8 text-[#0d141b]">
            What Families Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [
                "Kidist H.",
                "The nurse was kind and professional. Our family felt supported.",
              ],
              [
                "Yonatan M.",
                "Booking a doctor for our parents was seamless and reassuring.",
              ],
              [
                "Marta D.",
                "Consistent updates and compassionate care—highly recommended.",
              ],
            ].map(([name, quote]) => (
              <div
                key={name}
                className="rounded-xl border border-[#e63946]/10 p-6 shadow-sm"
              >
                <p className="text-[#0d141b] font-semibold">{name}</p>
                <p className="text-slate-600 mt-2 text-sm">“{quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section>
        <footer className="border-t border-[#e63946]/10 py-10 text-center text-sm text-slate-500">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 ">
            <div className="flex flex-col gap-4 md:ml-28">
              <div className="flex items-center gap-2 text-[#e63946]">
                <div className="size-20 flex items-center justify-center">
                  <Image
                    src="/LLA-logo.svg"
                    alt="Logo"
                    width={96}
                    height={96}
                    priority
                  />
                </div>
              </div>
              <p className="text-[#4c739a] text-sm">
                Professional caregiving you can trust, delivered with compassion
                and excellence since 2010.
              </p>
            </div>
            <div>
              <h4 className="text-[#0d141b] font-bold mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2 text-sm text-[#4c739a]">
                <li>
                  <a
                    className="hover:text-[#e63946] cursor-pointer"
                    href="#services"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#e63946] cursor-pointer"
                    href="#about-us"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#e63946] cursor-pointer"
                    href="#careers"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#0d141b] font-bold mb-4">Contact</h4>
              <ul className="flex flex-col gap-2 text-sm text-[#4c739a]">
                <li>
                  <span className="font-semibold text-[#0d141b]">Phone:</span>{" "}
                  +251 90 000 0000
                </li>
                <li>
                  <span className="font-semibold text-[#0d141b]">Email:</span>{" "}
                  hello@lifelineaddis.com
                </li>
                <li>
                  <span className="font-semibold text-[#0d141b]">Address:</span>{" "}
                  Bole, Addis Ababa
                </li>
              </ul>
              <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="size-8 rounded-full bg-[#e63946]/10 text-[#e63946] flex items-center justify-center hover:bg-[#e63946]/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6-1a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="size-8 rounded-full bg-[#e63946]/10 text-[#e63946] flex items-center justify-center hover:bg-[#e63946]/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.2 1.3-3.5 3.3-3.5.96 0 1.97.17 1.97.17v2.16h-1.11c-1.1 0-1.44.68-1.44 1.38V12h2.45l-.39 2.9h-2.06v7A10 10 0 0022 12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#e63946]/5 text-center text-sm text-[#4c739a]">
            © 2024 Lifeline Addis. All rights reserved.
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Homepage;
