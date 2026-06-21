import React from 'react';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';

export const CaribbeanIllustration: React.FC<{width?: number}> = ({width = 940}) => {
  const height = width * (520 / 940);
  return (
    <svg width={width} height={height} viewBox="0 0 940 520" role="img" aria-label="Ilustración tropical del Caribe">
      <defs>
        <clipPath id="seaClip">
          <rect x="8" y="8" width="924" height="504" rx="34" />
        </clipPath>
      </defs>

      <g clipPath="url(#seaClip)">
        <rect x="8" y="8" width="924" height="504" rx="34" fill="#CDEFFC" />
        <circle cx="128" cy="105" r="58" fill={COLORS.gold} stroke={COLORS.ink} strokeWidth="8" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4;
          const x1 = 128 + Math.cos(angle) * 80;
          const y1 = 105 + Math.sin(angle) * 80;
          const x2 = 128 + Math.cos(angle) * 105;
          const y2 = 105 + Math.sin(angle) * 105;
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={COLORS.gold} strokeWidth="8" strokeLinecap="round" />;
        })}

        <path d="M0 280 C145 245, 290 315, 435 280 S725 245, 940 288 V520 H0 Z" fill="#42B7D7" />
        <path d="M0 322 C155 288, 315 355, 470 316 S770 280, 940 330" fill="none" stroke="#E9FAFF" strokeWidth="11" strokeLinecap="round" />
        <path d="M0 386 C140 350, 300 420, 455 378 S760 342, 940 396" fill="none" stroke="#97E4F5" strokeWidth="10" strokeLinecap="round" />
        <path d="M0 448 C150 418, 310 478, 470 442 S760 412, 940 458" fill="none" stroke="#E9FAFF" strokeWidth="10" strokeLinecap="round" />

        <path d="M245 332 C315 250, 470 238, 575 298 C650 340, 620 408, 520 430 C390 458, 250 430, 210 380 C190 356, 205 342, 245 332 Z" fill="#F1D38A" stroke={COLORS.ink} strokeWidth="9" />
        <path d="M290 328 C350 274, 460 270, 535 310 C580 334, 565 374, 495 390 C405 412, 300 392, 270 360 C256 345, 265 334, 290 328 Z" fill="#79B84A" stroke={COLORS.ink} strokeWidth="7" />

        <path d="M430 320 C422 260, 420 204, 425 150" fill="none" stroke="#8A5A2B" strokeWidth="18" strokeLinecap="round" />
        <path d="M425 156 C382 136, 360 112, 347 86" fill="none" stroke="#58A843" strokeWidth="16" strokeLinecap="round" />
        <path d="M425 156 C389 166, 358 166, 330 157" fill="none" stroke="#58A843" strokeWidth="16" strokeLinecap="round" />
        <path d="M425 156 C452 121, 476 96, 508 78" fill="none" stroke="#58A843" strokeWidth="16" strokeLinecap="round" />
        <path d="M425 156 C464 154, 502 158, 536 176" fill="none" stroke="#58A843" strokeWidth="16" strokeLinecap="round" />
        <path d="M425 156 C431 119, 430 89, 420 58" fill="none" stroke="#58A843" strokeWidth="16" strokeLinecap="round" />

        <path d="M724 322 q34 -30 68 0 q-34 20 -68 0 Z" fill="#F1D38A" stroke={COLORS.ink} strokeWidth="7" />
        <path d="M790 362 q26 -22 52 0 q-26 16 -52 0 Z" fill="#F1D38A" stroke={COLORS.ink} strokeWidth="6" />
        <path d="M690 390 q21 -18 42 0 q-21 13 -42 0 Z" fill="#F1D38A" stroke={COLORS.ink} strokeWidth="5" />

        <path d="M752 174 L752 292" stroke={COLORS.ink} strokeWidth="8" />
        <path d="M752 180 L824 242 L752 242 Z" fill={COLORS.paper} stroke={COLORS.ink} strokeWidth="7" strokeLinejoin="round" />
        <path d="M752 245 L700 282 H812 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth="7" strokeLinejoin="round" />

        <rect x="72" y="410" width="214" height="62" rx="16" fill={COLORS.paper} stroke={COLORS.ink} strokeWidth="7" transform="rotate(-3 179 441)" />
        <text x="178" y="452" textAnchor="middle" fontFamily={FONTS.display} fontSize="44" fill={COLORS.ink} transform="rotate(-3 179 441)">EL CARIBE</text>
      </g>

      <rect x="8" y="8" width="924" height="504" rx="34" fill="none" stroke={COLORS.ink} strokeWidth="9" />
    </svg>
  );
};
