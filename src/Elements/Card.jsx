import Label from "./Label";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Card({
  title,
  description,
  children,
  tech = [],
  date,
  id, // Tambahkan prop id
  className = "",
  onReadMore,
  onDetails, // Tambahkan prop onDetails
  detailsPath // Tambahkan prop detailsPath untuk custom path
}) {
  const navigate = useNavigate();

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDetails = () => {
    if (onDetails) {
      // Jika onDetails props disediakan, panggil fungsi tersebut
      onDetails(id);
    } else {
      // Fallback ke navigasi default jika onDetails tidak disediakan
      const path = detailsPath || `/projects/${id}`;
      navigate(path);
    }
  };

  return (
    <div
      className={`
        group relative
        bg-gradient-to-b from-[#1e1e1e] to-[#181818]
        border border-[#2a2a2a] hover:border-[var(--color-accent)]/30
        rounded-2xl
        shadow-lg hover:shadow-[0_8px_20px_-4px_rgba(232,255,155,0.15)]
        transition-all duration-300 ease-out
        flex flex-col
        overflow-hidden
        ${className}
      `}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[var(--color-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Inner glow border effect */}
      <div className="absolute inset-0 rounded-2xl border border-[var(--color-accent)]/0 group-hover:border-[var(--color-accent)]/20 transition-colors duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Gambar Project */}
        <div className="w-full">
          {children}
        </div>

        {/* Container untuk konten text */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Date - di atas title */}
          {date && (
            <div className="mb-2">
              <span className="text-xs text-gray-500 bg-[#242424] px-2 py-1 rounded-md border border-[#323232] inline-flex items-center gap-1 mb-3">
                {formatDate(date)}
              </span>
            </div>
          )}

          {/* Title */}
          {title && (
            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-[var(--color-accent)]/90 transition-colors duration-300">
              {title}
            </h3>
          )}
          
          {/* Description */}
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-4 flex-grow">
              {description}
            </p>
          )}

          {/* Tech Stack dan Button dalam satu baris (flex) */}
          <div className="flex items-center justify-between gap-4 mt-2">
            {/* Tech Stack - di kiri */}
            {tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tech.slice(0, 2).map((item, i) => (
                  <Label
                    key={i}
                    text={item}
                    className="
                      bg-[#242424] 
                      border border-[#323232] 
                      group-hover:border-[var(--color-accent)]/20 
                      group-hover:bg-[#2a2a2a]
                      px-2.5 py-1 
                      rounded-lg 
                      text-[11px] font-medium
                      text-gray-300 group-hover:text-[var(--color-accent)]/90
                      transition-all duration-300 ease-out
                    "
                  />
                ))}
                {tech.length > 2 && (
                  <span className="text-[11px] text-gray-500 bg-[#242424] px-2.5 py-1 rounded-lg border border-[#323232]">
                    +{tech.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Details Button - di kanan */}
            <Button
              text="Details"
              onClick={handleDetails}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            />
          </div>
        </div>
      </div>
    </div>
  );
}