import React from "react";
import { Icons } from "../icons";

export default function AutoRotatingBanner() {
  const phrases = [
    {
      message: "Palm Oil Free",
      icon: <Icons.PalmTree className="h-4 w-4 text-amber-800" />,
    },
    {
      message: "100% Eggless",
      icon: <Icons.Egg className="h-4 w-4 text-amber-800" />,
    },
    {
      message: "Refined Sugar Free",
      icon: <Icons.Box className="h-4 w-4 text-amber-800" />,
    },
    {
      message: "Refined Flour Free",
      icon: <Icons.wheatOff className="h-4 w-4 text-amber-800" />,
    },
  ];

  const repeatCount = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="text-primary-dark selection:bg-primary-dark bg-[#F5F0E6] font-sans selection:text-[#F5F0E6]">
      <div
        id="home"
        className="flex w-full overflow-hidden border-y border-amber-200 bg-amber-100/50 py-2"
      >
        <div className="animate-infinite-scroll flex w-max">
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center">
              {repeatCount.map((repeatIndex) => (
                <React.Fragment key={repeatIndex}>
                  {phrases.map((phrase, phraseIndex) => (
                    <div key={phraseIndex} className="mx-20 flex items-center">
                      <span className="mx-2 text-sm font-semibold tracking-wider whitespace-nowrap text-amber-900 uppercase">
                        {phrase.message}
                      </span>
                      <div className="relative flex items-center justify-center">
                        <Icons.Ban className="absolute h-6 w-6 text-amber-800" />
                        {phrase.icon}
                      </div>
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
