import React from "react";
import IngredientsBadge from "../common/IngredientsBadge";
import { ingredients } from "~/constants";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Text } from "../ui/text";

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <div className="text-primary-dark selection:bg-primary-dark min-h-screen bg-[#F5F0E6] px-4 py-24 selection:text-[#F5F0E6] md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
        {/* Header Section */}
        <header className="animate-in fade-in slide-in-from-bottom-6 mx-auto max-w-3xl space-y-6 text-center duration-1000">
          <img src="/brand/logo.png" className="mx-auto h-[30%] w-[30%]" />
          <Text
            as={"p"}
            className="text-lg leading-relaxed font-medium opacity-80 md:text-xl"
          >
            Redefining indulgence, one guilt-free bite at a time.
          </Text>
        </header>

        {/* The Journey Content (Glassmorphism / Premium Card style) */}
        <div className="border-primary-dark/5 space-y-24 rounded-[2.5rem] border bg-white p-8 shadow-sm md:space-y-32 md:rounded-[3rem] md:p-16 lg:p-20">
          {/* Founders Section */}
          <section className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 space-y-6 md:pr-8 lg:order-1">
              <Text
                as={"h2"}
                className="text-primary-dark text-4xl md:text-5xl"
              >
                Two Chefs, One Vision
              </Text>
              <div className="bg-primary-dark/20 h-1 w-16 rounded-full"></div>
              <Text
                as={"p"}
                className="text-primary-dark/80 text-lg leading-relaxed font-medium md:text-xl"
              >
                {
                  "As two certified pastry chefs, we spent years mastering the art of traditional baking. We loved the joy our creations brought to people, but we couldn't ignore the heavy reliance on ingredients that just weren't good for the body."
                }
              </Text>
              <Text
                as={"p"}
                className="text-primary-dark/80 text-lg leading-relaxed font-medium md:text-xl"
              >
                {
                  " We wanted to create treats that love you back, and that realization sparked the beginning of our brand."
                }
              </Text>
            </div>

            {/* Editorial Staggered Images */}
            <div className="group relative order-1 h-100 w-full md:h-125 lg:order-2">
              {/* Back Image (Shifted up and left) */}
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=600&fit=crop"
                alt="Chef working"
                className="absolute top-0 left-0 z-10 h-[75%] w-2/3 rounded-3xl border-4 border-white object-cover shadow-lg transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"
              />
              {/* Front Image (Shifted down and right) */}
              <img
                src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=500&h=600&fit=crop"
                alt="Chef presenting dessert"
                className="absolute right-0 bottom-0 z-20 h-[75%] w-2/3 rounded-3xl border-4 border-white object-cover shadow-2xl transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2"
              />
            </div>
          </section>

          {/* Philosophy & Ingredients Section */}
          <section className="space-y-16">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Text
                as={"h2"}
                className="text-primary-dark text-4xl md:text-5xl"
              >
                {" Skipping the Bad, Sourcing the Good"}
              </Text>
              <div className="bg-primary-dark/20 mx-auto h-1 w-16 rounded-full"></div>
              <p className="text-primary-dark/80 text-lg leading-relaxed font-medium md:text-xl">
                {"We made a strict rule from day one: absolutely"}{" "}
                <span className="text-primary-dark font-bold">
                  {" no palm oil, no maida, and zero refined sugar"}
                </span>
                {
                  ". Instead, we craft our recipes using nature's finest alternatives, ensuring clean eating without ever compromising on luxury."
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 md:grid-cols-4 md:gap-10">
              {ingredients.map((item, idx) => (
                <IngredientsBadge
                  path={item.image}
                  label={item.name}
                  key={idx}
                />
              ))}
            </div>
          </section>

          <section className="border-primary-dark/5 grid grid-cols-1 items-center gap-16 border-t pt-16 md:pt-24 lg:grid-cols-2">
            <div className="order-2 space-y-6 lg:order-2 lg:pl-8">
              <Text
                as={"h2"}
                className="text-primary-dark text-4xl md:text-5xl"
              >
                The Pursuit of Perfection
              </Text>
              <div className="bg-primary-dark/20 h-1 w-16 rounded-full"></div>
              <Text
                as={"p"}
                className="text-primary-dark/80 text-lg leading-relaxed font-medium md:text-xl"
              >
                {
                  "Replacing conventional baking staples is not an easy task. It took months of relentless recipe testing, hundreds of failed batches, and countless late nights in the kitchen."
                }
              </Text>
              <Text
                as={"p"}
                className="text-primary-dark/80 text-lg leading-relaxed font-medium md:text-xl"
              >
                {
                  "We tweaked, we tasted, and we tried again until we hit the absolute perfect balance of sweetness, texture, and health."
                }
              </Text>
            </div>

            <div className="border-primary-dark/5 group relative order-1 overflow-hidden rounded-3xl border shadow-sm lg:order-1">
              <div className="bg-primary-dark/10 absolute inset-0 z-10 transition-colors duration-500 group-hover:bg-transparent" />
              <img
                src="/products/healthy.png"
                alt="Healthy ingredients process"
                className="aspect-square h-full w-full origin-center object-cover object-center transition-transform duration-700 group-hover:scale-105 md:aspect-4/3"
              />
            </div>
          </section>
        </div>

        {/* Closing / Call to Action */}
        <div className="mx-auto max-w-2xl space-y-8 pb-12 text-center">
          <Text
            as={"p"}
            className="text-primary-dark text-3xl italic md:text-4xl"
          >
            {`"Welcome to the sweet revolution."`}
          </Text>
          <Button
            variant={"checkout"}
            className="mx-auto max-w-100"
            onClick={() => navigate("/collection")}
          >
            {"Taste The Difference"}
          </Button>
        </div>
      </div>
    </div>
  );
}
