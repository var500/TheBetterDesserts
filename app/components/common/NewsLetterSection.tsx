export const NewsletterSection = () => (
  <section className="py-24 bg-[#E8C265] text-center px-4">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-[#1A243F] font-serif italic text-4xl md:text-5xl font-bold mb-4">
        Join The Club
      </h2>
      <p className="text-[#1A243F] mb-10 font-medium">
        Unlock offers, seasonal menus & freshly baked launches before anyone
        else
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
        <input
          type="email"
          placeholder="EMAIL"
          className="w-full md:w-auto flex-1 px-6 py-4 rounded-md bg-white text-[#1A243F] outline-none font-bold placeholder-gray-400 border border-transparent focus:border-[#1A243F]"
        />
        <button className="w-full md:w-auto bg-[#1A243F] text-white px-8 py-4 rounded-md font-bold tracking-widest uppercase hover:bg-opacity-90 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  </section>
);
