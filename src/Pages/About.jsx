import Button from "../Elements/Button";
import profileImg from "../assets/img/photo.jpeg";
import { FaFileDownload } from "react-icons/fa";

export default function About() {

  return (
    <section
      id="about"
      className="text-[var(--color-text)] py-24 px-6 md:px-12 flex justify-center items-center"
    >
      <div className="w-full max-w-4xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] shadow-xl transition-all duration-300 hover:border-[var(--color-accent)] glitch-hover">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2 bg-[var(--color-card)]">
          <div className="flex space-x-3 text-[var(--color-subtext)] text-sm cursor-pointer select-none">
             <span className="hover:text-[var(--color-text)]">_</span>
             <span className="hover:text-[var(--color-text)]">□</span>
             <span className="hover:text-red-500">×</span>
          </div>
          <div className="text-xs text-[var(--color-subtext)] uppercase font-semibold tracking-widest">
            root@rakha.dev: ~/about
          </div>
          <div className="w-12"></div> {/* Spacer for center alignment */}
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 md:p-10 text-left space-y-6 text-sm sm:text-base">
          <div className="text-[var(--color-accent)] flex items-center gap-2">
            <span className="text-[var(--color-subtext)]">rakha@system:~$</span> cat about_me.txt
          </div>
          
          <p className="text-[var(--color-subtext)] leading-relaxed pl-4 border-l-2 border-[var(--color-border)]">
            Hola! I'm <span className="text-[var(--color-accent)] font-bold">Rakha Fausta Adinata Raharja</span>,
            a <span className="text-[var(--color-text)] font-bold">Fullstack Developer</span> and <span className="text-[var(--color-text)] font-bold">Cybersecurity Learner.</span>
            <br /><br />
            I'm passionate about building scalable web applications that balance user experience and system architecture.
            <br /> <br />
            Beyond development, I explore cybersecurity to better understand how modern systems work.
          </p>
          
          <div className="text-[var(--color-accent)] flex items-center gap-2 mt-8">
            <span className="text-[var(--color-subtext)]">rakha@system:~$</span> ./download_cv.sh
          </div>
          
          <div className="flex pl-4">
            <a
              href="https://drive.google.com/file/d/1Ib66_isCocoEEHrqQB-KaJvCNKCJt-K2/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                icon={<FaFileDownload className="text-lg" />}
                text="Download CV"
              />
            </a>
          </div>
          
          <div className="text-[var(--color-accent)] flex items-center gap-2 mt-6">
            <span className="text-[var(--color-subtext)]">rakha@system:~$</span> <span className="w-2.5 h-5 bg-[var(--color-accent)] animate-pulse inline-block"></span>
          </div>
        </div>

      </div>
    </section>
  );
}
