import { useState } from "react";

export default function VennGame() {
  const [selected, setSelected] = useState({
    A: false,
    B: false,
    AB: false,
  });

  const toggle = (region) => {
    setSelected((prev) => ({
      ...prev,
      [region]: !prev[region],
    }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <svg width="400" height="200" viewBox="0 0 200 100">
        <defs>
          {/* A only = A minus B */}
          <mask id="maskA">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="130" cy="50" r="40" fill="black" />
          </mask>

          {/* B only = B minus A */}
          <mask id="maskB">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="70" cy="50" r="40" fill="black" />
          </mask>

          {/* Intersection = A and B */}
          <mask id="maskAB">
            <circle cx="70" cy="50" r="40" fill="white" />
            <circle cx="130" cy="50" r="40" fill="white" />
          </mask>
        </defs>

        {/* A-only region */}
        <circle
          cx="70"
          cy="50"
          r="40"
          fill={
            selected.A ? "rgba(200, 200, 200, 1)" : "rgba(255, 255, 255, 1)"
          }
          className="z-50"
          stroke="black"
          mask="url(#maskA)"
          onClick={() => toggle("A")}
          style={{ cursor: "pointer" }}
        />

        {/* B-only region */}
        <circle
          cx="130"
          cy="50"
          r="40"
          className="z-50"
          fill={
            selected.B ? "rgba(200, 200, 200, 1)" : "rgba(255, 255, 255, 1)"
          }
          stroke="black"
          mask="url(#maskB)"
          onClick={() => toggle("B")}
          style={{ cursor: "pointer" }}
        />

        {/* Intersection region */}
        <g mask="url(#maskAB)" className="z-0">
          <circle
            cx="100"
            cy="50"
            r="40"
            fill={selected.AB ? "rgba(200, 200, 200, 1)" : "transparent"}
            stroke="none"
            onClick={() => toggle("AB")}
            style={{ cursor: "pointer" }}
          />
        </g>

        {/* Outline strokes */}
        <circle cx="70" cy="50" r="40" fill="none" stroke="black" />
        <circle cx="130" cy="50" r="40" fill="none" stroke="black" />

        {/* Labels */}
        <text x="55" y="95" fontSize="12" fontFamily="sans-serif">
          A
        </text>
        <text x="135" y="95" fontSize="12" fontFamily="sans-serif">
          B
        </text>
      </svg>
    </div>
  );
}
