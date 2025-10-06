export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-[#181818] rounded-xl shadow-lg p-6 w-11/12 md:w-1/2 relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-lime-400"
        >
          ✕
        </button>
        {title && <h2 className="text-xl text-lime-400 font-bold mb-4">{title}</h2>}
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
}
