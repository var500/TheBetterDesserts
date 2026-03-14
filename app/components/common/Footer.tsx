import { Link } from "react-router";
import { Icons } from "../icons";
import { Text } from "../ui/text"; // Adjust import path if needed
import { CustomerServiceLinks, NavLinks } from "~/constants";

export default function Footer() {
  return (
    <footer className="bg-primary-dark pt-20 pb-10 text-[#F5F0E6]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 text-sm md:grid-cols-3">
          <img src="/brand/betterDesserts.jpeg" className="-mx-12 h-40 w-68" />
          <div className="space-y-4">
            <Text
              as="h4"
              variant="primary"
              className="mb-6 text-lg font-bold tracking-widest uppercase"
            >
              Links
            </Text>
            {NavLinks.map((link) => (
              <a
                key={link?.key}
                href={link?.value}
                className="block text-gray-300 transition-colors hover:text-white"
              >
                {/* Use Text as a span inside the anchor */}
                <Text as="span" variant="primary">
                  {link?.key}
                </Text>
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <Text
              as="h4"
              variant="primary"
              className="mb-6 text-lg font-bold tracking-widest uppercase"
            >
              Customer Service
            </Text>
            {CustomerServiceLinks.map((link) => (
              <a
                key={link.key}
                href={link.value}
                className="block text-gray-300 transition-colors hover:text-white"
              >
                {/* Use Text as a span inside the anchor */}
                <Text as="span" variant="primary">
                  {link.key}
                </Text>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Using Primary Font (Satoshi) */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-gray-700 pt-8 text-[10px] text-gray-400 md:flex-row">
          <Text
            as="span"
            variant="primary"
            className="font-bold tracking-[0.2em] uppercase"
          >
            © 2026 THE BETTER DESSERTS. ALL RIGHTS RESERVED.
          </Text>

          <div className="flex flex-row items-center gap-4">
            <Link
              target="_blank"
              to="https://www.instagram.com/thebetterdesserts/"
              className="group flex items-center gap-3"
            >
              <Icons.instagram className="h-6 w-6 cursor-pointer text-white transition-colors group-hover:text-[#F5F0E6]/70" />
              <Text
                as="span"
                variant="primary"
                className="font-bold tracking-widest text-white uppercase transition-colors group-hover:text-[#F5F0E6]/70"
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
