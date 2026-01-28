import Link from "next/link";
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

      {/* FEATURES */}
      <section id="careers" className="bg-white py-16 scroll-mt-24">
        <div className="text-center mb-12 mx-10 px-6">
          <h1 className="font-bold text-5xl mb-4">Why Families Trust Us?</h1>
          <p className="font-semibold text-xl md:mx-44">
            We provide peace of mind for families through dedicated and
            professional homecare services that prioritize dignity and
            independence.
          </p>
        </div>
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6 px-6">
          {[
            [
              "Trusted Care",
              "Fully insured and background-checked caregivers.",
            ],
            ["Professional Staff", "Highly trained medical professionals."],
            ["24/7 Availability", "Support and monitoring around the clock."],
          ].map(([title, desc]) => (
            <div key={title} className="p-8 rounded-xl border shadow-lg">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="w-full px-4 md:px-10 flex flex-col bg-white py-14 gap-6 scroll-mt-24"
      >
        <div className="flex items-center flex-col md:px-28">
          <div className="flex items-center justify-between border-b border-[#e63946]/10 pb-4 px-12 w-full">
            <h2 className="text-[#0d141b] text-2xl font-bold leading-tight tracking-[-0.015em]">
              Our Specialized Care Services
            </h2>
            <a
              className="text-[#e63946] font-bold text-sm hover:underline"
              href="#"
            >
              View All Services
            </a>
          </div>
          <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            <div className="border border-[#e63946]/10 p-8 rounded-xl w-full shadow-md">
              <h3 className="text-xl font-bold mb-2">General Consultation</h3>
              <p className="text-slate-500">
                Comprehensive health check-ups and consultations with our
                experienced general practitioners.
              </p>
            </div>
            <div className="border border-[#e63946]/10 p-8 rounded-xl w-full shadow-md">
              <h3 className="text-xl font-bold mb-2">Pediatric Care</h3>
              <p className="text-slate-500">
                Specialized medical care for children, including check-ups,
                vaccinations, and developmental assessments.
              </p>
            </div>
            <div className="border border-[#e63946]/10 p-8 rounded-xl w-full shadow-md">
              <h3 className="text-xl font-bold mb-2">Geriatric Care</h3>
              <p className="text-slate-500">
                Comprehensive healthcare services tailored for elderly patients,
                focusing on chronic conditions and mobility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 px-6 scroll-mt-24">
        <div className="bg-white rounded-2xl p-12 text-center max-w-[1000px] mx-auto">
          <h2 className="text-4xl font-black text-[#e63946] mb-4">
            Ready to provide the best care?
          </h2>
          <p className="mb-6 text-[#e63946]/30">
            Schedule a free consultation today.
          </p>
          <Link href="/login">
            <button className="bg-[#e63946] text-white px-8 py-4 rounded-xl border-[#e63946] font-bold cursor-pointer hover:opacity-90 active:scale-[0.98]">
              Book My Consultation
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <section>
        <footer className="border-t border-[#e63946]/10 py-10 text-center text-sm text-slate-500">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <div className="flex flex-col gap-4 md:ml-28">
              <div className="flex items-center gap-2 text-[#e63946]">
                <div className="size-20 flex items-center justify-center">
                  <img
                    className="w-full h-full"
                    src="/assets/tg_image_3199460643.jpeg"
                    alt="Logo"
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
