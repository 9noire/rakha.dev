import Label from "./Label";

export default function Card({
  title,
  description,
  children,
  tech = [],
  className = "",
}) {
  return (
    <div
      className={`bg-[#181818] border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-lime-400/10 hover:-translate-y-1 transition-all ${className}`}
    >
      {title && <h3 className="text-white font-bold mb-2">{title}</h3>}
      {description && (
        <p className="text-gray-400 text-sm mb-3">{description}</p>
      )}

      {children}

      {/* Tech Stack */}
      {tech.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((item, i) => (
            <Label key={i} text={item} className="bg-[#2A2A2A] px-2 py-1 rounded-md border border-gray-700 text-xs" />
          ))}
        </div>
      )}
    </div>
  );
}
