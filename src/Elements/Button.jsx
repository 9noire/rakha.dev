export default function Button({
  text,
  icon,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
}) {
  const baseStyle =
    "cursor-pointer text-md flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300";

  const variants = {
    solid:
      "text-[var(--color-bg)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]",

    outline:
      "bg-transparent border border-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:text-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
}
