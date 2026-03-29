import React from "react";
import { useNavigate } from "react-router";
import { Text } from "../ui/text"; // Adjust path if necessary
import { Button } from "../ui/button"; // Adjust path if necessary
import { Icons } from "../icons";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-[#F5F0E6] px-4 py-16 text-center md:px-8">
      <div className="animate-in fade-in slide-in-from-bottom-4 flex max-w-lg flex-col items-center space-y-8 duration-700">
        {/* Playful Bakery SVG (A cookie with a bite taken out) */}
        <div className="text-primary-dark/20">
          <Icons.cookie className="h-32 w-32" />
        </div>

        <div className="space-y-4">
          <Text
            as="h1"
            className="text-primary-dark text-7xl font-bold tracking-tight md:text-9xl"
          >
            404
          </Text>
          <Text
            as="h2"
            className="text-primary-dark text-3xl font-semibold tracking-widest uppercase md:text-4xl"
          >
            Oh Crumbs!
          </Text>
          <Text
            as="p"
            variant="secondary"
            className="text-primary-dark/70 mx-auto max-w-sm text-base leading-relaxed md:text-lg"
          >
            Looks like someone took a bite out of this page. The dessert
            you&apos;re looking for doesn&apos;t exist or has been moved.
          </Text>
        </div>

        <div className="pt-4">
          <Button
            onClick={() => navigate("/collection")}
            variant="default"
            size="lg"
            className="rounded-2xl px-8 py-6 text-lg shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    </main>
  );
}
