import { useEffect, useState } from "react";
import Card from "./Elements/Card";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch("/assets/certificate.json")
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch((err) => console.error("Failed to load certificates:", err));
  }, []);

  return (
    <section id="certificates" className="py-16 bg-[#0e0e0e]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Certificates
        </h2>

        <div className="flex flex-col items-center gap-10">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-8 w-full max-w-4xl`}
            >
              {/* Gambar Sertifikat */}
              <div
                className="w-full md:w-1/2 flex justify-center"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <Card className="p-0 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lime-400/10">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="rounded-2xl w-full object-cover"
                  />
                </Card>
              </div>

              {/* Keterangan Sertifikat */}
              <div
                className="w-full md:w-1/2 text-center md:text-left"
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              >
                <Card className="max-w-lg w-full text-center">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs mb-3">{cert.date}</p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#E8FF9B] text-sm font-semibold hover:underline"
                    >
                      View Certificate <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
