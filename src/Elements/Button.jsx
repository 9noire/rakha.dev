export default function Button({ text, icon, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[var(--color-bg)] bg-[var(--color-accent)] font-semibold hover:bg-[var(--color-accent-hover)] transition-all ${className}`}
    >
      {text}
      {icon && <span>{icon}</span>}
    </button>
  );
}
