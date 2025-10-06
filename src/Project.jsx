import { useEffect, useState } from "react";
import Card from "./Elements/Card";
import Button from "./Elements/Button";
import { FaGithub } from "react-icons/fa";

export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/assets/project.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load project.json");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="project" className="py-20 bg-[#1F1F1F] text-white px-6 sm:px-12 text-center">
      {/* Judul dengan garis */}
      <div className="flex items-center mb-10">
        <h2 className="text-2xl font-bold mr-4">Projects</h2>
        <div className="flex-grow h-[1px] bg-[#E8FF9B]"></div>
      </div>

      {/* Grid project cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {projects.map((proj, i) => (
          <Card
            key={i}
            title={proj.title}
            description={proj.description}
            tech={proj.technology || []}
            className="hover:-translate-y-1 transition-all"
          >
            {/* Gambar Project */}
            {proj.image && (
              <img
                src={proj.image}
                alt={proj.title}
                className="rounded-lg w-full h-44 object-cover mb-3 border border-gray-700"
              />
            )}

            {/* Link Project */}
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8FF9B] text-sm font-semibold hover:underline"
              >
                Visit Project →
              </a>
            )}
          </Card>
        ))}
      </div>

      {/* Tombol See More pakai Button.jsx */}
      <div className="flex justify-center">
        <Button
          text="See more"
          icon={<FaGithub className="text-lg" />}
          className="bg-[#E8FF9B] text-black font-semibold hover:bg-[#d9f372]"
          onClick={() => window.open("https://github.com/rakhaafd", "_blank")}
        />
      </div>
    </section>
  );
}
