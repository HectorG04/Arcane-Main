import React from 'react';
import type { Theme } from '../App';

const Logo: React.FC<{ className?: string; showSuite?: boolean, theme: Theme }> = ({ className, showSuite = false, theme }) => {
  const svgViewBox = showSuite ? "0 0 340 60" : "0 0 300 60";
  const textX = 150;
  const suiteTextX = 290;
  
  const mainTextColor = theme === 'light' ? 'url(#logo-text-gradient-light)' : 'url(#logo-text-gradient-dark)';
  const underlineColor = theme === 'light' ? '#94a3b8' : '#64748b';
  const suiteTextColor = theme === 'light' ? '#64748b' : '#94a3b8';

  return (
    <div className={`inline-block ${className}`}>
      <svg
        viewBox={svgViewBox}
        className="h-full w-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Arcane Brush Logo"
      >
        <defs>
          <linearGradient id="logo-text-gradient-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="logo-text-gradient-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Main Text */}
        <text 
            x={textX}
            y="28" 
            fontFamily="Poppins, sans-serif" 
            fontSize="28" 
            fill={mainTextColor}
            textAnchor="middle" 
            dominantBaseline="middle"
            fontWeight="700"
            letterSpacing="2"
        >
          ARCANE BRUSH
        </text>

        {/* Simple elegant underline with a diamond in the middle */}
        <path d="M 70 48 L 145 48" stroke={underlineColor} strokeWidth="1.5" fill="none" />
        <path d="M 155 48 L 230 48" stroke={underlineColor} strokeWidth="1.5" fill="none" />
        <path d="M 150 44 L 155 48 L 150 52 L 145 48 Z" fill={underlineColor} />

        {showSuite && (
           <text
            x={suiteTextX}
            y="42"
            fontFamily="Poppins, sans-serif" 
            fontSize="16"
            fill={suiteTextColor}
            opacity="0.7"
            textAnchor="middle" 
            dominantBaseline="middle"
            fontWeight="400"
            letterSpacing="3"
           >
            SUITE
           </text>
        )}
      </svg>
    </div>
  );
};

export default Logo;