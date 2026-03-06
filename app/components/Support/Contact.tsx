import { Link } from "react-router";
import { Icons } from "~/components/icons";
import { Text } from "~/components/ui/text";

export default function ContactUs() {
  return (
    <div className="bg-[#F5F0E6] text-primary-dark min-h-screen py-24 px-4 md:px-8 lg:px-12 font-satoshi selection:bg-primary-dark selection:text-[#F5F0E6]">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-frista text-primary-dark tracking-wide">
            Contact Us
          </h1>
          <p>For general Queries or Builk Orders</p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Address */}
          <div className="bg-white border border-primary-dark/10 flex flex-col h-full shadow-sm">
            <div className="p-6 md:p-8 border-b border-primary-dark/10 flex justify-between items-center">
              <Text as={"h2"} className="text-2xl text-primary-dark">
                Address
              </Text>
              <Icons.Target className="w-5 h-5 text-primary-dark/60" />{" "}
              {/* Or MapPin icon */}
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-primary-dark/80 font-medium leading-relaxed">
                  Second floor, S-10
                  <br />
                  Baani square, Gurgaon,
                  <br />
                  Haryana 122018
                </p>
              </div>
              <p className="text-primary-dark/60 text-sm mt-8">
                (7 days a week, 10am-9pm)
              </p>
            </div>
          </div>

          {/* Card 2: Reach Us (Combined Email & Phone) */}
          <div className="bg-white border border-primary-dark/10 flex flex-col h-full shadow-sm">
            <div className="p-6 md:p-8 border-b border-primary-dark/10 flex justify-between items-center">
              <Text as={"h2"} className="text-2xl text-primary-dark">
                Reach Us
              </Text>
              <Icons.Mail className="w-5 h-5 text-primary-dark/60" />
            </div>
            <div className="p-6 md:p-8 space-y-6 flex-1">
              <div>
                <Text as={"p"} className="text-sm text-primary-dark">
                  Email us at
                </Text>
                <Link
                  to="mailto:thebetterdesserts.com"
                  className="text-primary-dark font-bold hover:underline"
                >
                  thebetterdesserts.com
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Social Media */}
          <div className="bg-white border border-primary-dark/10 flex flex-col h-full shadow-sm">
            <div className="p-6 md:p-8 border-b border-primary-dark/10 flex justify-between items-center">
              <Text as={"h2"} className="text-2xl text-primary-dark">
                Contact
              </Text>
              <Icons.Share2 className="w-5 h-5 text-primary-dark/60" />
            </div>
            <div className="p-6 md:p-8 space-y-6 flex-1">
              <div>
                <p className="text-primary-dark/60 text-sm mb-1">For Support</p>
                <a
                  href="tel:+919958605163"
                  className="text-primary-dark font-bold hover:underline"
                >
                  {"+91 9958605163"}
                </a>
              </div>
              <div>
                <p className="text-primary-dark/60 text-sm mb-1">
                  Business & Bulk Inquiries
                </p>
                <a
                  href="tel:+919958605163"
                  className="text-primary-dark font-bold hover:underline"
                >
                  {"+91 9958605163"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
