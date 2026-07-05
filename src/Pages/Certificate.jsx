import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import Button from "../Elements/Button";
import { useNavigate } from "react-router-dom";

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    fetch("/assets/certificate.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load certificates");
        return res.json();
      })
      .then((data) => {
        setCertificates(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load certificates:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="certificates" className="relative py-20 px-6 sm:px-12 overflow-hidden">
      <div className="flex items-center mb-20">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mr-4">Certificates</h1>
        <div className="flex-grow h-[1px] bg-[var(--color-border)]"></div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
        </div>
      ) : (
        <>
          <div className="relative z-10 flex flex-wrap justify-center gap-6 max-w-7xl mx-auto mb-12">
            {certificates.slice(0, 3).map((cert, index) => (
              <div
                key={index}
                className="flex-[1_1_320px] max-w-[420px] group relative overflow-hidden glitch-hover"
              >
                <div className="cursor-pointer relative overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto border border-[var(--color-border)] group-hover:scale-115 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-black/80 backdrop-blur-sm text-[var(--color-text)] px-3 py-1.5 text-xs border border-[var(--color-border)]">
                      {cert.issuer}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-[var(--color-text)] font-bold text-lg mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-[var(--color-subtext)] text-sm mb-3">
                      {cert.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex justify-center">
            <Button
              icon={<IoMdArrowForward className="text-lg" />}
              text="More Certificate"
              variant="outline"
              onClick={() => navigate("/certificates")}
              className="m-auto px-6 py-3 text-sm sm:text-base  transition-all duration-300"
            />
          </div>
        </>
      )}

      <style jsx>{`
        .group:hover .group-hover:translate-x-1 {
          transform: translateX(0.25rem);
        }
      `}</style>
    </section>
  );
}