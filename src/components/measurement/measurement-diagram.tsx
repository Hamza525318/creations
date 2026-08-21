import React from "react";

export function CurtainMeasurementDiagram({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/80 bg-card p-6 flex flex-col items-center text-center space-y-3 ${className || ""}`}>
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px] h-auto text-espresso"
      >
        {/* Wall & Ceiling line */}
        <line x1="20" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
        
        {/* Curtain Rod / Track */}
        <rect x="35" y="36" width="250" height="6" rx="3" fill="#722F37" />
        <circle cx="35" cy="39" r="6" fill="#B58A4A" />
        <circle cx="285" cy="39" r="6" fill="#B58A4A" />

        {/* Width Dimension Arrow (A) */}
        <line x1="45" y1="26" x2="275" y2="26" stroke="#722F37" strokeWidth="1.5" />
        <polygon points="45,23 39,26 45,29" fill="#722F37" />
        <polygon points="275,23 281,26 275,29" fill="#722F37" />
        <rect x="135" y="16" width="50" height="18" rx="4" fill="#F8F4EC" stroke="#722F37" strokeWidth="1" />
        <text x="160" y="29" fill="#722F37" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          WIDTH (A)
        </text>

        {/* Window opening */}
        <rect x="70" y="58" width="180" height="130" rx="4" fill="#EEE6D8" stroke="#DED5C8" strokeWidth="1.5" />
        {/* Window panes */}
        <line x1="160" y1="58" x2="160" y2="188" stroke="#DED5C8" strokeWidth="1.5" />
        <line x1="70" y1="123" x2="250" y2="123" stroke="#DED5C8" strokeWidth="1.5" />

        {/* Drapery Outline (Semi-sheer) */}
        <path
          d="M45 42 L65 215 L95 215 L115 42 Z"
          fill="#722F37"
          fillOpacity="0.12"
          stroke="#722F37"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />
        <path
          d="M205 42 L225 215 L255 215 L275 42 Z"
          fill="#722F37"
          fillOpacity="0.12"
          stroke="#722F37"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />

        {/* Floor Line */}
        <line x1="20" y1="220" x2="300" y2="220" stroke="#746B62" strokeWidth="1.5" />
        <text x="30" y="233" fill="#746B62" fontSize="9" fontFamily="sans-serif">
          FLOOR
        </text>

        {/* Drop / Height Dimension Arrow (B) */}
        <line x1="295" y1="42" x2="295" y2="216" stroke="#722F37" strokeWidth="1.5" />
        <polygon points="292,48 295,42 298,48" fill="#722F37" />
        <polygon points="292,210 295,216 298,210" fill="#722F37" />
        <rect x="270" y="120" width="50" height="18" rx="4" fill="#F8F4EC" stroke="#722F37" strokeWidth="1" />
        <text x="295" y="133" fill="#722F37" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          DROP (B)
        </text>
      </svg>
      <p className="font-sans text-xs text-taupe font-medium">
        Measure full Track Width (A) and from Top of Hanging Point to Floor (B)
      </p>
    </div>
  );
}

export function BlindMeasurementDiagram({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/80 bg-card p-6 flex flex-col items-center text-center space-y-3 ${className || ""}`}>
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px] h-auto text-espresso"
      >
        {/* Wall Frame */}
        <rect x="40" y="25" width="240" height="190" rx="6" fill="#F8F4EC" stroke="#DED5C8" strokeWidth="2" />
        {/* Recess Window */}
        <rect x="65" y="45" width="190" height="150" rx="4" fill="#EEE6D8" stroke="#722F37" strokeWidth="1.5" />

        {/* Top Width Arrow */}
        <line x1="72" y1="60" x2="248" y2="60" stroke="#722F37" strokeWidth="1.2" />
        <polygon points="77,58 71,60 77,62" fill="#722F37" />
        <polygon points="243,58 249,60 243,62" fill="#722F37" />

        {/* Middle Width Arrow */}
        <line x1="72" y1="120" x2="248" y2="120" stroke="#722F37" strokeWidth="1.2" />
        <polygon points="77,118 71,120 77,122" fill="#722F37" />
        <polygon points="243,118 249,120 243,122" fill="#722F37" />
        <rect x="135" y="111" width="50" height="18" rx="4" fill="#F8F4EC" stroke="#722F37" strokeWidth="1" />
        <text x="160" y="124" fill="#722F37" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          WIDTH
        </text>

        {/* Bottom Width Arrow */}
        <line x1="72" y1="180" x2="248" y2="180" stroke="#722F37" strokeWidth="1.2" />
        <polygon points="77,178 71,180 77,182" fill="#722F37" />
        <polygon points="243,178 249,180 243,182" fill="#722F37" />

        {/* Left Height Arrow */}
        <line x1="85" y1="52" x2="85" y2="188" stroke="#722F37" strokeWidth="1.2" />
        <polygon points="83,57 85,51 87,57" fill="#722F37" />
        <polygon points="83,183 85,189 87,183" fill="#722F37" />

        {/* Centre Height Arrow */}
        <line x1="160" y1="52" x2="160" y2="188" stroke="#722F37" strokeWidth="1.2" />
        <polygon points="158,57 160,51 162,57" fill="#722F37" />
        <polygon points="158,183 160,189 162,183" fill="#722F37" />

        {/* Right Height Arrow with Label */}
        <line x1="230" y1="52" x2="230" y2="188" stroke="#722F37" strokeWidth="1.2" />
        <polygon points="228,57 230,51 232,57" fill="#722F37" />
        <polygon points="228,183 230,189 232,183" fill="#722F37" />
        <rect x="205" y="80" width="50" height="18" rx="4" fill="#F8F4EC" stroke="#722F37" strokeWidth="1" />
        <text x="230" y="93" fill="#722F37" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          HEIGHT
        </text>
      </svg>
      <p className="font-sans text-xs text-taupe font-medium">
        For inside recess mount, measure width in 3 spots and height in 3 spots
      </p>
    </div>
  );
}
