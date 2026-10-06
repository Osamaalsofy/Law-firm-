import React, { useState } from 'react';
import officialLogo from '../assets/images/alzaylai_official_logo_1791286972387.jpg';

interface EmblemLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'saudi-royal' | 'navy' | 'light';
  useImage?: boolean;
}

export const EmblemLogo: React.FC<EmblemLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  theme = 'saudi-royal',
  useImage = true,
}) => {
  const sizeMap = {
    sm: { box: 'w-11 h-11', text: 'text-xs' },
    md: { box: 'w-16 h-16', text: 'text-sm' },
    lg: { box: 'w-24 h-24', text: 'text-base' },
    xl: { box: 'w-36 h-36', text: 'text-lg' },
    hero: { box: 'w-48 h-48 sm:w-56 sm:h-56', text: 'text-xl' },
  };

  const currentSize = sizeMap[size];
  const [imgError, setImgError] = useState(false);

  // Saudi Royal gradient for medallion border
  const medallionBgGrad =
    theme === 'saudi-royal'
      ? { start: '#093B20', mid: '#0C4B29', end: '#062615' }
      : { start: '#132448', mid: '#0B1329', end: '#060A17' };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div
        className={`${currentSize.box} relative flex items-center justify-center transition-transform hover:scale-105 duration-300 drop-shadow-[0_6px_14px_rgba(10,69,38,0.20)]`}
      >
        {useImage && !imgError ? (
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#947118] via-[#ECC867] to-[#0D5B36] shadow-md flex items-center justify-center overflow-hidden">
            <img
              src={officialLogo}
              alt="شعار مكتب المحامي علي عبدالله الزيلعي"
              className="w-full h-full object-cover rounded-full"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="saudiMedallionBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={medallionBgGrad.start} />
                <stop offset="70%" stopColor={medallionBgGrad.mid} />
                <stop offset="100%" stopColor={medallionBgGrad.end} />
              </radialGradient>
              <linearGradient id="saudiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3D1" />
                <stop offset="30%" stopColor="#ECC867" />
                <stop offset="70%" stopColor="#C99E34" />
                <stop offset="100%" stopColor="#947118" />
              </linearGradient>
              <filter id="mizanShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
              </filter>
            </defs>

            <circle cx="150" cy="150" r="142" fill="url(#saudiMedallionBg)" stroke="#D4AF37" strokeWidth="3" />
            <circle cx="150" cy="150" r="135" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="5 4" />

            <g id="laurel-left" stroke="url(#saudiGoldGrad)" fill="url(#saudiGoldGrad)">
              <path
                d="M142 236 C90 220 54 165 62 105 C66 75 80 52 92 40"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 64 96 C 45 92 48 76 68 82 C 78 85 72 98 64 96 Z" />
              <path d="M 60 120 C 40 118 42 102 62 106 C 74 109 70 122 60 120 Z" />
              <path d="M 61 144 C 42 144 42 128 62 130 C 74 132 72 146 61 144 Z" />
              <path d="M 68 168 C 50 172 48 155 68 153 C 80 152 79 168 68 168 Z" />
              <path d="M 80 190 C 64 198 58 180 78 174 C 90 170 92 186 80 190 Z" />
              <path d="M 98 210 C 82 220 74 204 94 194 C 106 188 110 204 98 210 Z" />
              <path d="M 120 226 C 106 238 98 222 116 211 C 127 204 133 218 120 226 Z" />
              <path d="M 75 75 C 68 60 82 56 86 70 C 88 80 78 84 75 75 Z" />
              <path d="M 77 105 C 70 92 84 88 89 101 C 92 110 82 114 77 105 Z" />
              <path d="M 82 132 C 76 120 90 115 95 127 C 98 136 88 141 82 132 Z" />
              <path d="M 92 158 C 86 148 100 142 105 154 C 108 162 98 166 92 158 Z" />
              <path d="M 108 182 C 102 172 116 166 121 178 C 124 186 114 190 108 182 Z" />
            </g>

            <g id="laurel-right" stroke="url(#saudiGoldGrad)" fill="url(#saudiGoldGrad)">
              <path
                d="M158 236 C210 220 246 165 238 105 C234 75 220 52 208 40"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 236 96 C 255 92 252 76 232 82 C 222 85 228 98 236 96 Z" />
              <path d="M 240 120 C 260 118 258 102 238 106 C 226 109 230 122 240 120 Z" />
              <path d="M 239 144 C 258 144 258 128 238 130 C 226 132 228 146 239 144 Z" />
              <path d="M 232 168 C 250 172 252 155 232 153 C 220 152 221 168 232 168 Z" />
              <path d="M 220 190 C 236 198 242 180 222 174 C 210 170 208 186 220 190 Z" />
              <path d="M 202 210 C 218 220 226 204 206 194 C 194 188 190 204 202 210 Z" />
              <path d="M 180 226 C 194 238 202 222 184 211 C 173 204 167 218 180 226 Z" />
              <path d="M 225 75 C 232 60 218 56 214 70 C 212 80 222 84 225 75 Z" />
              <path d="M 223 105 C 230 92 216 88 211 101 C 208 110 218 114 223 105 Z" />
              <path d="M 218 132 C 224 120 210 115 205 127 C 202 136 212 141 218 132 Z" />
              <path d="M 208 158 C 214 148 200 142 195 154 C 192 162 202 166 208 158 Z" />
              <path d="M 192 182 C 198 172 184 166 179 178 C 176 186 186 190 192 182 Z" />
            </g>

            <path
              d="M 130 236 Q 150 246 170 236"
              stroke="url(#saudiGoldGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M 140 242 L 132 254" stroke="url(#saudiGoldGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 160 242 L 168 254" stroke="url(#saudiGoldGrad)" strokeWidth="3.5" strokeLinecap="round" />

            <g id="scales-of-justice" stroke="#FFFFFF" fill="#FFFFFF" filter="url(#mizanShadow)">
              <path d="M150 72 L150 170" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M150 56 L155 70 L145 70 Z" />
              <circle cx="150" cy="74" r="3" />
              <path
                d="M 112 108 C 114 96 126 94 138 98 L 150 102 L 162 98 C 174 94 186 96 188 108"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="112" cy="108" r="4.5" fill="#FFFFFF" />
              <circle cx="188" cy="108" r="4.5" fill="#FFFFFF" />
              <line x1="112" y1="108" x2="98" y2="152" strokeWidth="1.5" strokeOpacity="0.95" />
              <line x1="112" y1="108" x2="126" y2="152" strokeWidth="1.5" strokeOpacity="0.95" />
              <path d="M 96 152 Q 112 165 128 152 Z" strokeWidth="2.5" />
              <line x1="188" y1="108" x2="174" y2="152" strokeWidth="1.5" strokeOpacity="0.95" />
              <line x1="188" y1="108" x2="202" y2="152" strokeWidth="1.5" strokeOpacity="0.95" />
              <path d="M 172 152 Q 188 165 204 152 Z" strokeWidth="2.5" />
              <text
                x="150"
                y="188"
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-amiri select-none"
                style={{
                  fontSize: '34px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                }}
              >
                الزيلعي
              </text>
            </g>
          </svg>
        )}
      </div>

      {showSubtitle && (
        <div className="mt-2 text-center">
          <p
            className={`font-amiri font-bold text-[#143B27] tracking-wide ${currentSize.text}`}
          >
            المحامي: علي عبدالله الزيلعي
          </p>
          <span className="block text-[11px] text-[#A67C1E] font-cairo font-semibold tracking-wider mt-0.5">
            للمحاماة والاستشارات القانونية
          </span>
        </div>
      )}
    </div>
  );
};
