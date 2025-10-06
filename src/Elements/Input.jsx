export default function Input({ type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 rounded-md bg-[#222] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 ${className}`}
    />
  );
}