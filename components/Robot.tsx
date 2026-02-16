import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type RobotProps = {
  size?: "large" | "small";
};

export default function Robot({ size = "large" }: RobotProps) {
  const [blinking, setBlinking] = useState(false);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  const scale = size === "large" ? 1 : 0.6;
  const width = size === "large" ? 140 : 84;
  const height = size === "large" ? 140 : 84;

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width, height }}
    >
      <svg width={width} height={height} viewBox="0 0 140 140">
        {/* ANTENNA - FIXED POSITION */}
        <motion.g
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: "70px 20px" }}
        >
          <line
            x1="70"
            y1="20"
            x2="70"
            y2="12"
            stroke="#FFBF00"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <motion.circle
            cx="70"
            cy="10"
            r="4"
            fill="#FFBF00"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.g>

        {/* HEAD */}
        <rect
          x="20"
          y="20"
          width="100"
          height="56"
          rx="16"
          fill="#1F2A44"
          filter="drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
        />

        {/* EYES */}
        <g>
          <motion.ellipse
            cx="52"
            cy="48"
            rx="8"
            ry={blinking ? 1 : 10}
            fill="#FFBF00"
            animate={{ opacity: [1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="52" cy="48" r="4" fill="#1F2A44" />

          <motion.ellipse
            cx="88"
            cy="48"
            rx="8"
            ry={blinking ? 1 : 10}
            fill="#FFBF00"
            animate={{ opacity: [1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="88" cy="48" r="4" fill="#1F2A44" />
        </g>

        {/* SMILE */}
        <motion.path
          d="M 52 62 Q 70 70 88 62"
          stroke="#FFBF00"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* BODY */}
        <rect
          x="30"
          y="80"
          width="80"
          height="48"
          rx="14"
          fill="#1F2A44"
          filter="drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
        />

        {/* SCREEN */}
        <rect
          x="45"
          y="90"
          width="50"
          height="28"
          rx="6"
          fill="#20B2AA"
          opacity="0.3"
        />
        <motion.circle
          cx="70"
          cy="104"
          r="6"
          fill="#FFBF00"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* BODY LIGHTS */}
        <motion.circle
          cx="40"
          cy="117"
          r="3"
          fill="#FFBF00"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="100"
          cy="117"
          r="3"
          fill="#FFBF00"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
        />

        {/* LEFT ARM - STATIC */}
        <rect
          x="8"
          y="84"
          width="14"
          height="36"
          rx="7"
          fill="#1F2A44"
          opacity="0.8"
        />

        {/* RIGHT ARM - STATIC (NO WAVING) */}
        <rect
          x="118"
          y="84"
          width="14"
          height="36"
          rx="7"
          fill="#1F2A44"
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
}
