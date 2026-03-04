import { Button } from "../ui/button";
import { Text } from "../ui/text";

export default function SignatureProduct() {
  return (
    // Changed to min-h-[80vh] for better responsiveness and used your off-white brand color
    <section className="relative bg-[#F5F0E6] min-h-[80vh] py-20 flex justify-center px-4 md:px-8 overflow-hidden">
      {/* Subtle background decorative shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A243F]/5 rounded-l-full -z-0"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24 relative z-10">
        {/* Left Side - Image with Layered Effect */}
        <div className="w-full md:w-1/2 relative group">
          {/* Decorative offset background block */}
          <div className="absolute inset-0 bg-[#1A243F] rounded-2xl transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>

          {/* Main Image Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-[#F5F0E6] bg-white">
            <img
              src="/products/caszel.png"
              alt="The Signature Caszel"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Floating Review Badge */}
          <div className="absolute -bottom-6 hidden sm:inline-block md:-left-8 bg-white py-1 px-3  md:py-3 md:px-6 rounded-full shadow-xl md:flex items-center gap-3">
            <span className="text-yellow-400 text-xl ">★</span>
            <Text
              as="span"
              variant="primary"
              className="font-bold text-[#1A243F]"
            >
              4.9/5
            </Text>
            <span className="text-sm text-gray-500 whitespace-nowrap ">
              (2k+ cravings satisfied)
            </span>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left pt-8 md:pt-0">
          {/* Eyebrow text */}
          <Text
            as="span"
            variant="primary"
            className="text-sm md:text-base tracking-[0.2em] uppercase text-[#1A243F]/70 mb-4 font-bold"
          >
            Our Masterpiece
          </Text>

          <Text
            variant="secondary"
            as="h2"
            className="text-5xl md:text-6xl lg:text-7xl text-[#1A243F] mb-6 leading-[1.1]"
          >
            The Signature <br className="hidden md:block" /> Caszel
          </Text>

          <Text
            as="p"
            variant="primary"
            className="text-lg text-[#1A243F]/80 mb-8 max-w-md leading-relaxed"
          >
            A perfect symphony of roasted cashews and rich hazelnut truffle.
            Crafted without a single grain of white sugar or maida, this is
            indulgence redefined.
          </Text>

          {/* Action Area with Price */}
          <div className="flex flex-wrap items-center gap-6">
            <Button className="group flex items-center gap-2 px-8">
              Shop Now
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 line-through">₹1,299</span>
              <span className="text-2xl font-bold text-[#1A243F]">₹999</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
