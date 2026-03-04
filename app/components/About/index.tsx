import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-primary-light text-primary-dark min-h-screen py-16 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-wider uppercase">
            The Better Desserts
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-80">
            Redefining indulgence, one guilt-free bite at a time.
          </p>
        </div>

        {/* The Journey Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 space-y-16">
          {/* Founders Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <h2 className="text-3xl font-bold border-b-2 border-primary-dark inline-block pb-1">
                Two Chefs, One Vision
              </h2>
              <p className="leading-relaxed text-gray-800 text-lg">
                As two certified pastry chefs, we spent years mastering the art
                of traditional baking. We loved the joy our creations brought to
                people, but we couldn't ignore the heavy reliance on ingredients
                that just weren't good for the body. We wanted to create treats
                that love you back, and that realization sparked the beginning
                of our brand.
              </p>
            </div>

            {/* Founders Images */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=600&fit=crop"
                alt="Founder 1"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=600&fit=crop"
                alt="Founder 2"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md mt-8"
              />
            </div>
          </section>

          {/* Philosophy & Ingredients Section */}
          <section className="text-center space-y-8">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold border-b-2 border-primary-dark inline-block pb-1">
                Skipping the Bad, Sourcing the Good
              </h2>
              <p className="leading-relaxed text-gray-800 text-lg">
                We made a strict rule from day one: absolutely{" "}
                <strong>no palm oil, no maida, and zero refined sugar</strong>.
                Instead, we craft our recipes using nature's finest
                alternatives. It is our commitment to clean eating without ever
                compromising on the luxurious taste and texture of a real,
                decadent dessert.
              </p>
            </div>

            {/* Ingredients Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <div className="flex flex-col items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=300&h=300&fit=crop"
                  alt="Oats Flour"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <span className="font-bold text-lg">Oats Flour</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img
                  src="https://d61341d0.delivery.rocketcdn.me/wp-content/uploads/Almond-Milk-scaled.jpg"
                  alt="Almond Milk"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <span className="font-bold text-lg">Almond Milk</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img
                  src="https://www.metropolisindia.com/upgrade/blog/upload/25/02/Benefits_of_Dates1738939150.webp"
                  alt="Dates"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <span className="font-bold text-lg">Dates</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQm4ZM3lQexlvr-yMm_R1uejqERGy8JKEYYA&s"
                  alt="High Quality Chocolate"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <span className="font-bold text-lg">Dark Chocolate</span>
              </div>
            </div>
          </section>

          {/* The Process */}
          <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
            <h2 className="text-3xl font-bold border-b-2 border-primary-dark inline-block pb-1">
              The Pursuit of Perfection
            </h2>
            <p className="leading-relaxed text-gray-800 text-lg">
              Replacing conventional baking staples is not an easy task. It took
              months of relentless recipe testing, hundreds of failed batches,
              and countless late nights in the kitchen. We tweaked, we tasted,
              and we tried again until we hit the absolute perfect balance of
              sweetness, texture, and health.
            </p>

            <div className="flex flex-col items-center gap-3">
              <img
                src="/products/healthy.png"
                alt="Oats Flour"
                className=" shadow-lg  rounded-md object-cover"
              />
            </div>
          </section>
        </div>

        {/* Closing / Call to Action */}
        <div className="text-center">
          <p className="text-2xl font-semibold italic mb-8">
            Welcome to the sweet revolution.
          </p>
          <button className="bg-primary-dark text-white px-10 py-4 font-black tracking-widest uppercase text-sm md:text-base hover:bg-opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer">
            Taste The Difference
          </button>
        </div>
      </div>
    </div>
  );
}
