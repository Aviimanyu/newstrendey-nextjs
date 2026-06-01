"use client";

import { useEffect } from "react";

interface AdSenseSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: "true" | "false";
  layout?: string;
  className?: string;
  type: "billboard" | "sidebar" | "inline";
}

export default function AdSenseSlot({
  slot,
  format = "auto",
  responsive = "true",
  layout,
  className = "",
  type,
}: AdSenseSlotProps) {
  useEffect(() => {
    try {
      // Initialize adsbygoogle after component mounts
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // Silence initialization errors on dev / empty scripts
    }
  }, []);

  const dimensions = {
    billboard: "min-h-[90px] md:min-h-[250px] max-w-[970px] mx-auto",
    sidebar: "min-h-[250px] md:min-h-[600px] max-w-[300px] mx-auto",
    inline: "min-h-[100px] md:min-h-[200px] w-full",
  };

  return (
    <div className={`my-8 text-center ${className}`}>
      {/* Tiny Advertisement Label to comply with Google AdSense Policies */}
      <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#666666] mb-1.5 block">
        Advertisement
      </span>
      
      {/* Sleek Visual Ad Placeholder wrapper */}
      <div 
        className={`bg-[#f1f7f7] border border-dashed border-[#e5e5e5] rounded-md flex items-center justify-center relative overflow-hidden transition-all duration-300 ${dimensions[type]}`}
      >
        {/* Real AdSense Slot markup */}
        <ins
          className="adsbygoogle w-full h-full block"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXX" // User replaces with their real AdSense Publisher ID
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
          {...(layout && { "data-ad-layout": layout })}
        />
        
        {/* Placeholder Watermark (Visible only when AdSense hasn't served an active ad) */}
        <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center p-4 bg-[#f1f7f7]/60">
          <span className="text-[10px] font-mono tracking-wider text-[#737373]">
            [Google AdSlot ca-pub-{slot}]
          </span>
          <span className="text-[9px] text-[#a3a3a3] mt-1 font-light">
            Placeholder for Premium Responsive Ads
          </span>
        </div>
      </div>
    </div>
  );
}
