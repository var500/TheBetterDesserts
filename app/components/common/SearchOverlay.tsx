import { Search, X } from "lucide-react";

export const SearchOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 bg-[#F5F0E6] animate-in fade-in duration-300 flex flex-col">
      <div className="h-20 border-b border-gray-300 flex items-center px-8 bg-white">
        <Search className="w-5 h-5 text-gray-400 mr-4" />
        <input
          autoFocus
          type="text"
          placeholder="Find a product..."
          className="flex-1 outline-none text-xl font-serif italic bg-transparent"
        />
        <X
          className="w-6 h-6 cursor-pointer hover:text-[#1A243F] transition-colors"
          onClick={onClose}
        />
      </div>
      <div className="p-8 flex-1 flex flex-col items-center justify-center text-gray-400">
        <p className="text-lg font-serif italic text-[#1A243F]">Top Sellers</p>
        <div className="flex flex-wrap gap-4 mt-8 justify-center opacity-80">
          {["Cookie Cakes", "Brownies", "Dubai Surprise"].map((tag) => (
            <span
              key={tag}
              className="border border-gray-300 text-[#1A243F] px-4 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
