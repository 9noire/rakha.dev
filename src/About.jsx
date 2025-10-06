import Button from "./Elements/Button";
import profileImg from "./assets/img/profile.jpeg"; // ganti dengan foto/avatar kamu

export default function About() {
  // Fungsi scroll ke section #contact
  const handleScrollToContact = () => {
    const section = document.querySelector("#contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="bg-[var(--color-bg-alt)] text-[var(--color-text)] py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12"
    >
      {/* ======= LEFT SIDE (IMAGE) ======= */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <img
            src={profileImg}
            alt="Rakha Profile"
            className="rounded-full w-full h-full object-cover border-4 border-[var(--color-accent)] shadow-[0_0_25px_rgba(232,255,155,0.3)]"
          />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-[var(--color-accent)] rounded-full blur-2xl opacity-30"></div>
        </div>
      </div>

      {/* ======= RIGHT SIDE (CONTENT) ======= */}
      <div className="flex-1 text-center md:text-left space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
          About Me
        </h2>
        <p className="text-[var(--color-subtext)] leading-relaxed max-w-xl mx-auto md:mx-0">
          Hello! I’m <span className="text-[var(--color-accent)]">Rakha Fausta Adinata Raharja</span>, 
          a <b>Front-End Developer</b> and tech enthusiast from{" "}
          <span className="text-[var(--color-accent)]">SMK Negeri 7 Semarang</span>, majoring in{" "}
          <b>SIJA (Sistem Informatika, Jaringan, dan Aplikasi)</b>, Class of{" "}
          <span className="text-[var(--color-accent)]">2027</span>.  
          <br /><br />
          I love bringing ideas to life through code — blending{" "}
          <span className="text-[var(--color-accent)]">design</span>,{" "}
          <span className="text-[var(--color-accent)]">interactivity</span>, and{" "}
          <span className="text-[var(--color-accent)]">user experience</span> into beautiful websites.  
          Currently, I’m focused on sharpening my skills in{" "}
          <b>React</b> and <b>Tailwind CSS</b> to build modern and responsive interfaces.
        </p>

        <div className="flex justify-center md:justify-start gap-4 pt-4">
          <a
            href="https://drive.google.com/file/d/1-ZS3xp38wxaH9EfbOOWD6gMO0ZreBklj/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button text="Download CV" />
          </a>

          <Button
            text="Contact Me"
            className="bg-transparent border text-white border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black"
            onClick={handleScrollToContact}
          />
        </div>
      </div>
    </section>
  );
}
