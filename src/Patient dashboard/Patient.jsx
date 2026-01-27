import Navbar from "../Components/Navbar.jsx";
import Services from "../Components/Services.jsx";
import { useState, useEffect, use } from 'react';

function Patient() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(data => {
                setServices(data);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <>
            <div className="bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-slate-50 min-h-screen">
                {/* HEADER */}
                <Navbar />
                <div>
                    {services.map((service) => (
                        <div key={service.id} className='border '>
                            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                            <p className="text-slate-500">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
      <main className="flex justify-center py-10 px-6 lg:px-40">
        <div className="max-w-[1200px] w-full space-y-8">
          {/* Header Text */}
          <div>
            <h1 className="text-3xl font-bold">
              Request Care for Your Loved One
            </h1>
            <p className="text-[#4c739a] dark:text-slate-400 mt-2">
              Provide details so we can match you with the best caregiver.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <section className="flex-1 space-y-8">
              {/* Patient Info */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border dark:border-slate-800">
                <h2 className="text-xl font-bold mb-6">Patient Information</h2>

                <div className="flex flex-col gap-4">
                    <label className="font-medium text-md">Full Name</label>
                  <input
                    placeholder="Full Name"
                    className="input border rounded px-4 py-2 w-3/4"
                    type="text"
                  />
                  <label className="font-medium text-md">Age</label>
                  <input placeholder="Age" className="input border rounded px-4 py-2 w-3/4" type="number" />

                  <div className="flex flex-row items-center">
                    <label className="font-medium text-md ">Gender</label>
                    {["Female", "Male"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center justify-center gap-2 px-3 py-1 border rounded-lg cursor-pointer ml-5"
                      >
                        <input type="radio" name="gender" />
                        {g}
                      </label>
                    ))}
                  </div>

                  <textarea
                    rows="4"
                    placeholder="Medical conditions..."
                    className="md:col-span-2 input border rounded px-4 py-2"
                  />
                </div>
              </div>

              {/* Care Type */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border dark:border-slate-800">
                <h2 className="text-xl font-bold mb-6">Select Care Type</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
              <div key={service.id} className='border border-primary/10 p-8 rounded-xl w-1/3 shadow-sm'>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-slate-500">{service.description}</p><button
                      key={label}
                      className="p-4 border rounded-xl text-left hover:border-primary transition"
                    >
                      <span className="font-bold">{label}</span>
                    </button>
              </div>
            ))}
                    
                  
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold">
                  Continue
                </button>
              </div>
            </section>

            {/* Sidebar */}
            <aside className="w-full lg:w-[320px] space-y-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800">
                <h3 className="font-bold mb-4">Care Summary</h3>
                <p className="text-sm text-slate-500">Patient: Martha Smith</p>
                <p className="text-sm text-primary font-bold mt-2">
                  Companion Care
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <p className="text-sm mb-4">
                  Our coordinators are available 24/7.
                </p>
                <a
                  href="tel:1800-CARE-NOW"
                  className="block text-center bg-primary text-white py-2 rounded-lg font-bold"
                >
                  Call CARE
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
            </div>

      
    
  
        </>
    )
}
export default Patient;