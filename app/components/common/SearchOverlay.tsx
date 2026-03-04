import { Icons } from "../icons";
import { Text } from "../ui/text";

export const SearchOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    // FIX 1: Changed z-100 to z-[100] so it safely covers the z-50 Navbar
    <div className="fixed inset-0 z-[100] bg-[#F5F0E6] animate-in fade-in duration-300 flex flex-col">
      {/* Search Header */}
      <div className="h-20 border-b border-[#1A243F]/10 flex items-center px-4 md:px-8 bg-white">
        <Icons.Search className="w-5 h-5 text-gray-400 mr-4" />

        {/* FIX 2: Added explicit text color and placeholder color, updated to use Satoshi font */}
        <input
          autoFocus
          type="text"
          placeholder="Find a product..."
          className="flex-1 outline-none text-xl md:text-2xl font-satoshi text-[#1A243F] placeholder:text-gray-400 bg-transparent"
        />

        {/* FIX 3: Gave the close button a default resting color (text-gray-400) */}
        <Icons.X
          className="w-8 h-8 p-1 text-gray-400 cursor-pointer hover:text-[#1A243F] transition-colors"
          onClick={onClose}
        />
      </div>

      {/* Suggestions Body */}
      <div className="p-8 flex-1 flex flex-col items-center pt-24">
        {/* Using Frista font for the heading */}
        <Text
          as="p"
          variant="secondary"
          className="text-3xl text-[#1A243F] mb-8"
        >
          Top Sellers
        </Text>

        <div className="flex flex-wrap gap-4 justify-center">
          {["Cookie Cakes", "Brownies", "Dubai Surprise"].map((tag) => (
            <button
              key={tag}
              // Upgraded these spans to interactive buttons with hover states
              className="border border-[#1A243F]/20 text-[#1A243F] hover:bg-[#1A243F] hover:text-[#F5F0E6] transition-colors duration-300 px-6 py-2 rounded-full text-xs tracking-widest uppercase font-bold cursor-pointer"
            >
              <Text as="span" variant="primary">
                {tag}
              </Text>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
