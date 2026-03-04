import React from "react";
import { Icons } from "../icons";

export default function AutoRotatingBanner() {
  const phrases = [
    {
      message: "Palm Oil Free",
      icon: <Icons.PalmTree className="w-4 h-4 text-amber-800 " />,
    },
    {
      message: "100% Eggless",
      icon: <Icons.Egg className="w-4 h-4 text-amber-800 " />,
    },
    {
      message: "Refined Sugar Free",
      icon: <Icons.Box className="w-4 h-4 text-amber-800 " />,
    },
    {
      message: "Refined Flour Free",
      icon: <Icons.wheatOff className="w-4 h-4 text-amber-800 " />,
    },
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
                    <div key={phraseIndex} className="flex items-center mx-20">
                      <span className=" text-sm mx-2 font-semibold tracking-wider text-amber-900 uppercase whitespace-nowrap">
                        {phrase.message}
                      </span>
                      <div className="relative flex justify-center items-center">
                        <Icons.Ban className="w-6 h-6 text-amber-800 absolute " />
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
