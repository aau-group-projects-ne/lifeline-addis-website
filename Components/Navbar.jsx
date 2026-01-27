function Navbar() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-28 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-12">
            <img
              className="w-full h-full"
              src="../assets/LLA svg.svg"
              alt="Logo"
            />
          </div>
        </div>

        <nav className="flex gap-9">
          {["Home", "Appointments"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium hover:text-primary transition"
              linkto={item === "Home" ? "/" : "/PatientDashboard"}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
