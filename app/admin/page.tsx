import Navbar from "@/Components/Navbar";

export default function Admin() {
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
        <div className="flex h-screen overflow-hidden">
          {/* SIDEBAR */}
          <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between py-6">
            <div className="flex flex-col gap-8">
              {/* Profile */}
              <div className="px-6 flex items-center gap-3">
                <div
                  className="bg-cover bg-center rounded-full size-12 border-2 border-primary/20"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA05i3g88oMRH4uc_wh2X8SHQkmXOdn5v4uZjiSeCaiOsePQWuooHKVw7OytmemcXUzmnlCEP1n-WcvpwEGZyhq3HRZ93K-xleZVTuq3lv3IFN0Kgq-AFp13GItCW5TwMogMUvVisvkJ9dYXpadDR9kMYepaHN_0MLnty-3natjYo25FDEaHV6tHEm7aYyYdyO78B34G4HV1v3OboAgm4Jy93jKW5iC1aOFaAiELYwr0_kIoPzVrQiFaXlreSIGj2rf4i70Y4zPrLM")',
                  }}
                />
                <div>
                  <h1 className="font-bold">Doctor</h1>
                  <p className="text-xs uppercase text-slate-400">Admin</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-1">
                {[
                  ["calendar_today", "Schedule", true],
                  ["groups", "Patients"],
                  ["mail", "Messages"],
                ].map(([icon, label, active], i) => (
                  <a
                    key={i}
                    href="#"
                    className={`flex items-center gap-4 px-6 py-3 transition-colors ${
                      active
                        ? "active-nav"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                    <span className="text-sm font-semibold">{label}</span>
                    {label === "Messages" && (
                      <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        3
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 flex flex-col gap-2">
              <a className="flex items-center gap-4 py-2 text-slate-500 hover:text-primary">
                <span className="material-symbols-outlined">settings</span>
                Settings
              </a>
              <a className="flex items-center gap-4 py-2 text-slate-500 hover:text-red-500">
                <span className="material-symbols-outlined">logout</span>
                Sign Out
              </a>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1 overflow-y-auto px-8 py-10 max-w-5xl mx-auto">
            {/* Heading */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-4xl font-black">Today&apos;s Schedule</h1>
                <p className="flex items-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-sm">
                    event
                  </span>
                  Monday, October 14th, 2024
                </p>
              </div>
            </div>

            {/* Timeline */}
            <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border mb-10">
              <h2 className="font-bold text-xl mb-6">Timeline</h2>

              <div className="grid grid-cols-[60px_1fr] gap-x-4">
                {[
                  [
                    "notifications_active",
                    "Martha Smith",
                    "08:00 AM • 123 Maple St.",
                    true,
                  ],
                  ["person", "James Wilson", "11:30 AM • 456 Oak Ave."],
                  [
                    "medical_services",
                    "Robert Miller",
                    "05:00 PM • 789 Pine Rd.",
                  ],
                ].map(([icon, name, details, active], i) => (
                  <div key={i} className="contents">
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-8 rounded-full flex items-center justify-center ${
                          active
                            ? "bg-primary text-white ring-4 ring-primary/20"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {icon}
                        </span>
                      </div>
                      {i < 2 && (
                        <div className="w-[2px] h-16 bg-slate-200 dark:bg-slate-700" />
                      )}
                    </div>

                    <div className="pb-8">
                      <p
                        className={`font-bold ${active ? "text-primary" : ""}`}
                      >
                        {name}
                      </p>
                      <p className="text-sm text-slate-400">{details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Current Patient */}
            <section className="bg-white dark:bg-slate-900 p-8 rounded-xl border mb-10">
              <h2 className="text-2xl font-black mb-6">Current Patient</h2>

              <div className="flex gap-8 flex-col md:flex-row">
                <div
                  className="w-48 aspect-square bg-cover bg-center rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwL0i0fL9-M8rqxnLf5ex7wc47xAmghRU3pRlrrIkgt40ip4En6rpD-5XWRs910mK36GsrNRUOhdraTPs3nYYRX7JihyU9YiXvajIdh6Y1yur6ZywyPpOfbEoqpmElbWVd-g-mypA45mGqkGD80i_ivnkJCznaquqbT2E7_MWrRgAXTE3QNtMVoQrz4tITVOsqtzOLSFrALdf88vNLG_r1y3UgxR3NDV12e0gomAy0AFY9K2LMPHeb3SxU-RNlo7-FFacUspgEiOw")',
                  }}
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-black">Martha Smith</h3>
                  <p className="text-primary font-bold">82 years old</p>

                  <div className="flex gap-3 mt-6">
                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold">
                      Match
                    </button>
                    <button className="border px-6 py-3 rounded-xl font-bold">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
