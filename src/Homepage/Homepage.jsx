import { Link } from 'react-router-dom';
import HomeNav from '../Components/HomeNav.jsx';
import { useState, useEffect } from 'react';

function Homepage() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(data => {
        setServices(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-slate-50 min-h-screen">
      {/* HEADER */}

      <HomeNav />

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
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
            Professional, personalized caregiving services tailored to your family's unique needs.
          </p>

          <div className="flex gap-4">
            <Link to="/Login">
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold">
                Book a Consultation
              </button>
            </Link>
            <button className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold">
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="text-center mb-12 mx-10 px-6">
          <h1 className='font-bold text-5xl mb-4'>Why Families Trust Us?</h1>
          <p className='font-semibold text-xl mx-44'>We provide peace of mind for families through dedicated and professional homecare services that prioritize dignity and independence.</p>
        </div>
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6 px-6">
          {[
            ["Trusted Care", "Fully insured and background-checked caregivers."],
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
      <div className="w-full px-4 md:px-10 flex flex-col bg-white dark:bg-slate-900 py-14 gap-6">
        <div className='flex items-center flex-col px-28'>
          <div className="flex items-center justify-between border-b border-primary/10 pb-4 px-12 w-full">
            <h2
              className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
              Our Specialized Care Services</h2>
            <a className="text-primary font-bold text-sm hover:underline" href="#">View All Services</a>
          </div>
          <div className='flex items-center justify-between'>
            {services.map((service) => (
              <div key={service.id} className='border border-primary/10 p-8 rounded-xl w-1/3 shadow-sm'>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-slate-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="bg-white text-white rounded-2xl p-12 text-center max-w-[1000px] mx-auto">
          <h2 className="text-4xl font-black text-primary mb-4">
            Ready to provide the best care?
          </h2>
          <p className="mb-6 text-primary/30">
            Schedule a free consultation today.
          </p>
          <Link to="/Login">
            <button className="bg-primary text-white px-8 py-4 rounded-xl border-primary font-bold">
              Book My Consultation
            </button>
          </Link>
        </div>
      </section>
      <section>

        {/* FOOTER */}
        <footer className="border-t border-primary/10 py-10 text-center text-sm text-slate-500">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <div className="flex flex-col gap-4 ml-28">
              <div className="flex items-center gap-2 text-primary">
                <div className="size-20 flex items-center justify-center">
                  <img className="w-full h-full" src="../assets/tg_image_3199460643.jpeg" alt="Logo" />
                </div>
              </div>
              <p className="text-[#4c739a] dark:text-slate-400 text-sm">Professional caregiving you can trust,
                delivered with compassion and excellence since 2010.</p>
            </div>
            <div>
              <h4 className="text-[#0d141b] dark:text-white font-bold mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2 text-sm text-[#4c739a] dark:text-slate-400">
                <li><a className="hover:text-primary" href="#">Services</a></li>
                <li><a className="hover:text-primary" href="#">About Us</a></li>
                <li><a className="hover:text-primary" href="#">Careers</a></li>
              </ul>
            </div>

          </div>
          <div
            className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-primary/5 text-center text-sm text-[#4c739a] dark:text-slate-500">
            © 2024 Lifeline Addis. All rights reserved.
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Homepage;
