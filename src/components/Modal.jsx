export default function Modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0  flex items-center justify-center
        ${
          open ? "visible bg-black bg-opacity-25 backdrop-blur-sm" : "invisible"
        }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-gray-400 hover:text-gray-700 text-lg"
        >
          <span>X</span>
        </button>
        {children}
      </div>
    </div>
  );
}
