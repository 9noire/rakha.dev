import { useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("/assets/project.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load project.json");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // Show only first 3 projects
  const displayedProjects = projects.slice(0, 3);

  // Function to get the correct image path
  const getImagePath = (imagePath) => {
    // If it's already a full URL or data URL, return as is
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // Remove any leading dots and ensure proper path format
    const cleanPath = imagePath.replace(/^\.\.?\/+/, '/');
    
    // Ensure the path starts with a forward slash for public directory
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  };

  // Function to get main image (first image from array or single image)
  const getMainImage = (project) => {
    if (!project.image) return null;
    
    // If image is an array, take the first image
    if (Array.isArray(project.image)) {
      return project.image[0];
    }
    
    // If image is a string, return as is
    return project.image;
  };

  // Handle image error for specific project
  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <section id="project" className="relative py-16 px-4 sm:py-20 sm:px-8 lg:px-12">
      {/* Header dengan garis accent */}
      <div className="flex items-center mb-20">
        <h2 className="text-2xl font-bold text-white mr-4">Projects</h2>
        <div className="flex-grow h-[1px] bg-[var(--color-accent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Projects List */}
            <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
              {displayedProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                const projectId = project.id?.toString() || index.toString();
                const hasImageError = imageErrors[projectId];
                const mainImage = getMainImage(project);
                const hasMultipleImages = Array.isArray(project.image) && project.image.length > 1;

                return (
                  <div
                    key={project.id || index}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center"
                  >
                    {/* Image - kiri untuk index genap, kanan untuk index ganjil */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} order-1`}>
                      <div
                        className="relative cursor-pointer max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[500px] mx-auto lg:mx-0"
                        style={{
                          transform: isEven ? 'rotate(-2deg)' : 'rotate(2deg)',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = isEven ? 'scale(1) rotate(-2deg)' : 'scale(1) rotate(2deg)';
                        }}
                      >
                        {/* Stack effect background */}
                        {mainImage && !hasImageError && (
                          <div
                            className="absolute -top-3 -right-3 w-full h-full rounded-xl border border-[var(--color-border)] bg-cover bg-center blur-[1px] brightness-60"
                            style={{
                              backgroundImage: `url(${getImagePath(mainImage)})`,
                              transform: 'rotate(-2deg)',
                              zIndex: 0
                            }}
                          />
                        )}

                        {mainImage && !hasImageError ? (
                          <>
                            <img
                              src={getImagePath(mainImage)}
                              alt={project.title}
                              className="w-full h-auto rounded-xl border border-[var(--color-border)] relative z-10 shadow-xl"
                              onError={() => handleImageError(projectId)}
                            />
                          </>
                        ) : (
                          <div className="w-full h-48 sm:h-56 md:h-64 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-subtext)] text-4xl sm:text-5xl relative z-10">
                            📁
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content - kanan untuk index genap, kiri untuk index ganjil */}
                    <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} order-2 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-left`}>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                        {project.title}
                      </h3>

                      <p className="text-[var(--color-subtext)] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-2xl lg:max-w-none">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technology && project.technology.length > 0 && (
                        <div className={`flex flex-wrap gap-2 mb-5 sm:mb-6 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-start`}>
                          {project.technology.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-white/5 text-[var(--color-subtext)] px-3 py-1.5 rounded-md text-xs sm:text-sm border border-[var(--color-border)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Buttons menggunakan Button component */}
                      <div className={`flex flex-wrap gap-3 ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-start`}>
                        {project.link && (
                          <Button
                            icon={<MdOpenInNew className="text-lg"/>}
                            text="Live Project"
                            variant="solid"
                            onClick={() => window.open(project.link, "_blank")}
                          />
                        )}
                        {project.github && (
                          <Button
                            icon={<FaCode className="text-lg"/>}
                            text="Code"
                            variant="outline"
                            onClick={() => window.open(project.github, "_blank")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More Button - menggunakan Button component juga */}
            {projects.length > 3 && (
              <div className="text-center mt-12 sm:mt-16 lg:mt-20">
                <Button
                  icon={<FaArrowRight className="text-lg"/>}
                  text="More Project"
                  variant="outline"
                  onClick={() => navigate("/projects")}
                  className="m-auto px-6 py-3 text-sm sm:text-base rounded-full transition-all duration-300"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}