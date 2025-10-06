    export default function Label({ htmlFor, text, className = "" }) {
    return (
        <label
        htmlFor={htmlFor}
        className={`block text-sm font-semibold text-[var(--color-subtext)] mb-1 ${className}`}
        >
        {text}
        </label>
    );
    }
