import React from "react";
import vegetables from "../../assets/vegetables.png";
import Button from "../button/Button";

const HeroSection = () => {
  // throw new Error("Error aaoyu hou machikney ")
  return (
    <section className="min-h-[85vh] bg-[#e6eee1] flex items-center px-8 md:px-16 lg:px-24 py-12 justify-around">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
        
       
        <div className="flex flex-col gap-y-6 md:gap-y-8 text-left justify-center">
          
          <div>
            <span className="text-xs md:text-sm font-semibold tracking-widest text-gray-500 uppercase block mb-3">
              Fresh From Farm To Your Plate
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1f2937] leading-tight">
              Healthy eating <br />
              the organic way
            </h1>
          </div>

          <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed">
            Discover fresh, organic and handpicked vegetables directly from local...!!
          </p>

          {/* Button Container: यसले बटनलाई तल धकेल्छ र ट्याक्क मिल्ने स्पेस दिन्छ */}
          <div className="pt-4 md:pt-6 block">
            <Button text="Explore Menu" variant="primary" />
          </div>

        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center md:justify-end w-full">
          <div className="relative w-[320px] sm:w-90 md:w-[420] lg:w-120">
            <div className="w-full h-full rounded-[150px] overflow-hidden border-4 border-white shadow-2xl">
              <img
                src={vegetables}
                alt="Fresh Organic Vegetables"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;