import { useNavigate } from "react-router";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#F5F0E6] px-4 py-12">
      <div className="border-primary-dark/15 shadow-primary-dark/5 animate-in zoom-in-95 w-full max-w-lg rounded-3xl border bg-white p-8 text-center shadow-xl duration-500 md:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Icons.Check className="h-10 w-10 text-green-600" />
        </div>

        <Text as="h1" className="text-primary-dark mb-2 text-3xl">
          Order Confirmed!
        </Text>

        <Text as="p" className="text-primary-dark/70 mb-8">
          Your sweet treats are officially in the works. We&apos;ve sent a
          confirmation email with your order details.
        </Text>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            variant="default"
            className="flex-1 rounded-xl py-6"
            onClick={() => navigate("/my-account")}
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
  );
}
