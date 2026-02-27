import { Instagram } from "lucide-react";
import { Link } from "react-router";

const CATEGORIES = [
  "Cookie Cakes",
  "Bundt Cakes",
  "Decadent Cakes",
  "Stuffed Cookies",
  "Dessert Containers",
  "Gifting",
];

export default function Footer() {
  return (
    <footer className="bg-[#1A243F] text-[#F5F0E6] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-3xl md:text-5xl font-serif leading-[1.1] mb-16 flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-3xl">The</span>
            <span className="font-bold">Better</span>
          </div>
          <div className="font-bold tracking-widest">Desserts</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]">
              Links
            </h4>
            {["Home", "Shop", "Cookies", "About", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]">
              Categories
            </h4>
            {CATEGORIES.slice(0, 5).map((link) => (
              <a
                key={link}
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]">
              Customer Service
            </h4>
            {["Shipping & Delivery", "Refund Policy", "Privacy Policies"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ),
            )}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          <span>© 2026 THE BETTER DESSERTS. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center flex-row gap-4">
            <Link
              target="_blank"
              to="https://www.instagram.com/thebetterdesserts/"
            >
              <Instagram className="w-6 h-6 text-[#F5F0E6] hover:text-gray-300 transition-colors cursor-pointer" />
            </Link>
            Follow on Instagram
          </div>
        </div>
      </div>
    </footer>
  );
}
