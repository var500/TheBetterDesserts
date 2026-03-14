import { Link } from "react-router";
import { Icons } from "~/components/icons";
import { Text } from "~/components/ui/text";

export default function ContactUs() {
  return (
    <div className="text-primary-dark selection:bg-primary-dark min-h-screen bg-[#F5F0E6] px-4 py-24 selection:text-[#F5F0E6] md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-16 text-center md:mb-24">
          <Text
            as={"h1"}
            className="text-primary-dark text-5xl tracking-wide md:text-6xl lg:text-7xl"
          >
            Contact Us
          </Text>
          <p>For general Queries or Builk Orders</p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {/* Card 1: Address */}
          <div className="border-primary-dark/10 flex h-full flex-col border bg-white shadow-sm">
            <div className="border-primary-dark/10 flex items-center justify-between border-b p-6 md:p-8">
              <Text as={"h2"} className="text-primary-dark text-2xl">
                Address
              </Text>
              <Icons.Target className="text-primary-dark/60 h-5 w-5" />{" "}
              {/* Or MapPin icon */}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
              <div className="space-y-2">
                <p className="text-primary-dark/80 leading-relaxed font-medium">
                  Second floor, S-10
                  <br />
                  Baani square, Gurgaon,
                  <br />
                  Haryana 122018
                </p>
              </div>
              <p className="text-primary-dark/60 mt-8 text-sm">
                (7 days a week, 10am-9pm)
              </p>
            </div>
          </div>

          {/* Card 2: Reach Us (Combined Email & Phone) */}
          <div className="border-primary-dark/10 flex h-full flex-col border bg-white shadow-sm">
            <div className="border-primary-dark/10 flex items-center justify-between border-b p-6 md:p-8">
              <Text as={"h2"} className="text-primary-dark text-2xl">
                Reach Us
              </Text>
              <Icons.Mail className="text-primary-dark/60 h-5 w-5" />
            </div>
            <div className="flex-1 space-y-6 p-6 md:p-8">
              <div>
                <Text as={"p"} className="text-primary-dark text-sm">
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
          <div className="border-primary-dark/10 flex h-full flex-col border bg-white shadow-sm">
            <div className="border-primary-dark/10 flex items-center justify-between border-b p-6 md:p-8">
              <Text as={"h2"} className="text-primary-dark text-2xl">
                Contact
              </Text>
              <Icons.Share2 className="text-primary-dark/60 h-5 w-5" />
            </div>
            <div className="flex-1 space-y-6 p-6 md:p-8">
              <div>
                <p className="text-primary-dark/60 mb-1 text-sm">For Support</p>
                <a
                  href="tel:+919958605163"
                  className="text-primary-dark font-bold hover:underline"
                >
                  {"+91 9958605163"}
                </a>
              </div>
              <div>
                <p className="text-primary-dark/60 mb-1 text-sm">
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
