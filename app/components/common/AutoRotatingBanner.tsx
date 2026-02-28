import React from "react";

export default function AutoRotatingBanner() {
  const phrases = [
    "Palm Oil Free",
    "100% Eggless",
    "Refined Sugar Free",
    "Refined Flour Free",
  ];

  const repeatCount = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className=" bg-[#F5F0E6] text-[#1A243F] font-sans selection:bg-[#1A243F] selection:text-[#F5F0E6]">
      <div
        id="home"
        className="flex w-full py-2 overflow-hidden bg-amber-100/50 border-y border-amber-200"
      >
        <div className="flex w-max animate-infinite-scroll">
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center">
              {repeatCount.map((repeatIndex) => (
                <React.Fragment key={repeatIndex}>
                  {phrases.map((phrase, phraseIndex) => (
                    <div key={phraseIndex} className="flex items-center">
                      <span className="mx-20 text-sm font-semibold tracking-wider text-amber-900 uppercase whitespace-nowrap">
                        {phrase}
                      </span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
