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
    <div className="animate-in fade-in fixed inset-0 z-[100] flex flex-col bg-[#F5F0E6] duration-300">
      {/* Search Header */}
      <div className="border-primary-dark/10 flex h-20 items-center border-b bg-white px-4 md:px-8">
        <Icons.Search className="mr-4 h-5 w-5 text-gray-400" />

        {/* FIX 2: Added explicit text color and placeholder color, updated to use Satoshi font */}
        <input
          autoFocus
          type="text"
          placeholder="Find a product..."
          className="text-primary-dark flex-1 bg-transparent text-xl outline-none placeholder:text-gray-400 md:text-2xl"
        />

        {/* FIX 3: Gave the close button a default resting color (text-gray-400) */}
        <Icons.X
          className="hover:text-primary-dark h-8 w-8 cursor-pointer p-1 text-gray-400 transition-colors"
          onClick={onClose}
        />
      </div>

      {/* Suggestions Body */}
      <div className="flex flex-1 flex-col items-center p-8 pt-24">
        {/* Using Frista font for the heading */}
        <Text
          as="p"
          variant="secondary"
          className="text-primary-dark mb-8 text-3xl"
        >
          Top Sellers
        </Text>

        <div className="flex flex-wrap justify-center gap-4">
          {["Cookie Cakes", "Brownies", "Dubai Surprise"].map((tag) => (
            <button
              key={tag}
              // Upgraded these spans to interactive buttons with hover states
              className="border-primary-dark/20 text-primary-dark hover:bg-primary-dark cursor-pointer rounded-full border px-6 py-2 text-xs font-bold tracking-widest uppercase transition-colors duration-300 hover:text-[#F5F0E6]"
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
