export default function SuggestionBox({ open,onClose, children }) {
    return (
        <div 
            className={`absolute top-full left-0 w-full z-10 
            ${open ? "visible bg-black border border-gray-300 rounded shadow-lg" : "invisible"}`}
            onClick={onClose}
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className={`transition-all ${open ? "scale-100 opacity-100 " : "scale-125 opacity-0"}`}
            >
                {children}
            </div>
        </div>
    );
}
