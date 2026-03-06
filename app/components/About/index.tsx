import React from "react";
import IngredientsBadge from "../common/IngredientsBadge";
import { ingredients } from "~/constants";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F5F0E6] text-primary-dark min-h-screen py-24 px-4 md:px-8 lg:px-12 font-satoshi selection:bg-primary-dark selection:text-[#F5F0E6]">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
        {/* Header Section */}
        <header className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <img src="/brand/logo.png" className="h-40 w-68  mx-auto" />
          <p className="text-lg md:text-xl font-medium opacity-80 leading-relaxed">
            Redefining indulgence, one guilt-free bite at a time.
          </p>
        </header>

        {/* The Journey Content (Glassmorphism / Premium Card style) */}
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-primary-dark/5 p-8 md:p-16 lg:p-20 space-y-24 md:space-y-32">
          {/* Founders Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6 md:pr-8">
              <h2 className="text-4xl md:text-5xl font-frista text-primary-dark">
                Two Chefs, One Vision
              </h2>
              <div className="w-16 h-1 bg-primary-dark/20 rounded-full"></div>
              <p className="leading-relaxed text-primary-dark/80 text-lg md:text-xl font-medium">
                As two certified pastry chefs, we spent years mastering the art
                of traditional baking. We loved the joy our creations brought to
                people, but we couldn't ignore the heavy reliance on ingredients
                that just weren't good for the body.
              </p>
              <p className="leading-relaxed text-primary-dark/80 text-lg md:text-xl font-medium">
                We wanted to create treats that love you back, and that
                realization sparked the beginning of our brand.
              </p>
            </div>

            {/* Editorial Staggered Images */}
            <div className="order-1 lg:order-2 relative h-100 md:h-125 w-full group">
              {/* Back Image (Shifted up and left) */}
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=600&fit=crop"
                alt="Chef working"
                className="absolute top-0 left-0 w-2/3 h-[75%] object-cover rounded-3xl shadow-lg border-4 border-white transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2 z-10"
              />
              {/* Front Image (Shifted down and right) */}
              <img
                src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=500&h=600&fit=crop"
                alt="Chef presenting dessert"
                className="absolute bottom-0 right-0 w-2/3 h-[75%] object-cover rounded-3xl shadow-2xl border-4 border-white transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 z-20"
              />
            </div>
          </section>

          {/* Philosophy & Ingredients Section */}
          <section className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-frista text-primary-dark">
                Skipping the Bad, Sourcing the Good
              </h2>
              <div className="w-16 h-1 bg-primary-dark/20 rounded-full mx-auto"></div>
              <p className="leading-relaxed text-primary-dark/80 text-lg md:text-xl font-medium">
                We made a strict rule from day one: absolutely{" "}
                <span className="font-bold text-primary-dark">
                  no palm oil, no maida, and zero refined sugar
                </span>
                . Instead, we craft our recipes using nature's finest
                alternatives, ensuring clean eating without ever compromising on
                luxury.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pt-8">
              {ingredients.map((item, idx) => (
                <IngredientsBadge
                  path={item.image}
                  label={item.name}
                  key={idx}
                />
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-primary-dark/5 pt-16 md:pt-24">
            <div className="space-y-6 lg:pl-8 order-2 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-frista text-primary-dark">
                The Pursuit of Perfection
              </h2>
              <div className="w-16 h-1 bg-primary-dark/20 rounded-full"></div>
              <p className="leading-relaxed text-primary-dark/80 text-lg md:text-xl font-medium">
                Replacing conventional baking staples is not an easy task. It
                took months of relentless recipe testing, hundreds of failed
                batches, and countless late nights in the kitchen.
              </p>
              <p className="leading-relaxed text-primary-dark/80 text-lg md:text-xl font-medium">
                We tweaked, we tasted, and we tried again until we hit the
                absolute perfect balance of sweetness, texture, and health.
              </p>
            </div>

            <div className="order-1 lg:order-1 relative rounded-3xl overflow-hidden shadow-sm border border-primary-dark/5 group">
              <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src="/products/healthy.png"
                alt="Healthy ingredients process"
                className="w-full h-full object-cover object-center aspect-square md:aspect-4/3 transition-transform duration-700 group-hover:scale-105 origin-center"
              />
            </div>
          </section>
        </div>

        {/* Closing / Call to Action */}
        <div className="text-center max-w-2xl mx-auto space-y-8 pb-12">
          <p className="text-3xl md:text-4xl font-frista italic text-primary-dark">
            "Welcome to the sweet revolution."
          </p>
          <Button
            variant={"checkout"}
            className="max-w-100 mx-auto"
            onClick={() => navigate("/collection")}
          >
            Taste The Difference
          </Button>
        </div>
      </div>
    </div>
  );
}
