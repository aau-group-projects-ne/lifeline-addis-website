function HomeNav() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-12">
            <img
              className="w-full h-full"
              src="/tg_image_3199460643.jpeg"
              alt="Logo"
            />
          </div>
          <h2 className="text-xl font-bold">HomeCare</h2>
        </div>

        <nav className="flex gap-9 pr-12">
          {[
            ["Services", "services"],
            ["About Us", "about-us"],
            ["Careers", "careers"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}

export default HomeNav;
