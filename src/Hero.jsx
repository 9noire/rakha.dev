import Button from "./Elements/Button";
import heroImg from "./assets/img/hero.jpeg"; // kamu bisa ganti dengan ilustrasi kamu sendiri

export default function Hero() {
  // Fungsi scroll ke bagian #project
  const handleScroll = () => {
    const section = document.querySelector("#project");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-20 bg-[var(--color-bg)] pt-28 md:pt-36"
    >
      {/* ======= LEFT SIDE ======= */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
          Hello World! 👋
        </h2>
        <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-accent)]">
          I’m Rakha.
        </h1>
        <p className="text-[var(--color-subtext)] max-w-md mx-auto md:mx-0 leading-relaxed">
          I’m a <span className="text-[var(--color-accent)]">Front-End Developer</span> who loves
          crafting interactive and responsive web experiences. Passionate about{" "}
          <span className="text-[var(--color-accent)]">UI/UX design</span> and turning creative
          ideas into functional, beautiful interfaces. 🚀
        </p>

        {/* Buttons */}
        <div className="flex justify-center md:justify-start gap-4 pt-4">
          <Button text="See My Works" onClick={handleScroll} />
        </div>
      </div>

      {/* ======= RIGHT SIDE (IMAGE) ======= */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src={heroImg}
          alt="Rakha illustration"
          className="w-72 md:w-[22rem] drop-shadow-[0_0_15px_rgba(232,255,155,0.3)]"
        />
      </div>
    </section>
  );
}
