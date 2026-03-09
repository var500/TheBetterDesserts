import { useNavigate } from "react-router";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import Layout from "~/components/Layout/Layout";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[80vh] bg-[#F5F0E6] flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-primary-dark/5 max-w-lg w-full text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icons.Check className="w-10 h-10 text-green-600" />
          </div>

          <Text as="h1" className="text-3xl font-frista text-primary-dark mb-2">
            Order Confirmed!
          </Text>

          <Text as="p" className="text-primary-dark/70 mb-8">
            Your sweet treats are officially in the works. We&apos;ve sent a
            confirmation email with your order details.
          </Text>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1 rounded-xl py-6"
              onClick={() => navigate("/profile")}
            >
              View Order
            </Button>
            <Button
              variant="default"
              className="flex-1 rounded-xl py-6"
              onClick={() => navigate("/collection")}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
