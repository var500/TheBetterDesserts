import { Link } from "react-router";
import { Icons } from "../icons";
import { Text } from "../ui/text"; // Adjust import path if needed

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
    <footer className="bg-primary-dark text-[#F5F0E6] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <img src="/brand/betterDesserts.jpeg" className="h-40 w-68 -mx-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          <div className="space-y-4">
            <Text
              as="h4"
              variant="primary"
              className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]"
            >
              Links
            </Text>
            {["Home", "Shop", "Cookies", "About", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {/* Use Text as a span inside the anchor */}
                <Text as="span" variant="primary">
                  {link}
                </Text>
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <Text
              as="h4"
              variant="primary"
              className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]"
            >
              Categories
            </Text>
            {CATEGORIES.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                <Text as="span" variant="primary">
                  {link}
                </Text>
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <Text
              as="h4"
              variant="primary"
              className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A0A0A0]"
            >
              Customer Service
            </Text>
            {["Shipping & Delivery", "Refund Policy", "Privacy Policies"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  {/* Use Text as a span inside the anchor */}
                  <Text as="span" variant="primary">
                    {link}
                  </Text>
                </a>
              ),
            )}
          </div>
        </div>

        {/* Bottom Bar - Using Primary Font (Satoshi) */}
        <div className="mt-20 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400">
          <Text
            as="span"
            variant="primary"
            className="font-bold uppercase tracking-[0.2em]"
          >
            © 2026 THE BETTER DESSERTS. ALL RIGHTS RESERVED.
          </Text>

          <div className="flex items-center flex-row gap-4">
            <Link
              target="_blank"
              to="https://www.instagram.com/thebetterdesserts/"
              className="group flex items-center gap-3"
            >
              <Icons.instagram className="w-6 h-6 text-white group-hover:text-[#F5F0E6]/70 transition-colors cursor-pointer" />
              <Text
                as="span"
                variant="primary"
                className="font-bold uppercase tracking-widest text-white group-hover:text-[#F5F0E6]/70 transition-colors"
              >
                Follow on Instagram
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
