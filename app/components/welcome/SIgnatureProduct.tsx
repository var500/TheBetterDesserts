export default function SignatureProduct() {
  return (
    <div className="bg-white h-screen  flex justify-center px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left Side - Image */}
        <div className="w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <img
              src="/products/caszel.png"
              alt="Signature Production Showcase"
              className="w-full h-auto object-cover "
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full justify-center md:w-1/2 flex flex-col items-center text-center">
          <h2 className="text-[#1A243F] font-mono text-5xl md:text-6xl lg:text-7xl mb-10 leading-tight">
            Signature Product
          </h2>

          {/* Theme-matching Buy Now Button */}
          <button className="bg-[#1A243F] cursor-pointer text-white px-10 py-4 font-black tracking-widest uppercase text-sm md:text-base hover:bg-opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg">
            Buy Now
          </button>

          {/* PAN India Text */}
          <p className="text-[#1A243F] font-medium text-sm md:text-base tracking-[0.2em] uppercase mt-6 opacity-70">
            Available PAN India
          </p>
        </div>
      </div>
    </div>
  );
}
