import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ width = 240, height = 240, className = '' }) {
  return (
    <div className={className} style={{ width, height }}>
      <motion.div
        className="relative w-full h-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#shadow)">
            <path
              d="M200 340 C150 340 80 290 80 220 C80 170 110 140 140 140 C165 140 185 155 200 175 C215 155 235 140 260 140 C290 140 320 170 320 220 C320 290 250 340 200 340Z"
              fill="white"
              stroke="white"
              strokeWidth="16"
              strokeLinejoin="round"
            />
            <path
              d="M200 335 C152 335 85 287 85 220 C85 172 113 145 140 145 C163 145 182 159 200 177 C218 159 237 145 260 145 C287 145 315 172 315 220 C315 287 248 335 200 335Z"
              fill="#FFB3D9"
            />
          </g>

          {/* Yellow Sparkles */}
          <g>
            <motion.path
              d="M120 100 L122 108 L130 110 L122 112 L120 120 L118 112 L110 110 L118 108 Z"
              fill="#FFD966"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle cx="120" cy="110" r="2" fill="#FFD966" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />

            <motion.path
              d="M280 95 L282 103 L290 105 L282 107 L280 115 L278 107 L270 105 L278 103 Z"
              fill="#FFD966"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
            <motion.circle cx="280" cy="105" r="2" fill="#FFD966" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />

            <motion.path
              d="M310 180 L312 188 L320 190 L312 192 L310 200 L308 192 L300 190 L308 188 Z"
              fill="#FFD966"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />

            <motion.path
              d="M95 260 L97 268 L105 270 L97 272 L95 280 L93 272 L85 270 L93 268 Z"
              fill="#FFD966"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            />
            <motion.circle cx="95" cy="270" r="2" fill="#FFD966" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }} />

            <motion.path
              d="M295 275 L297 283 L305 285 L297 287 L295 295 L293 287 L285 285 L293 283 Z"
              fill="#FFD966"
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
          </g>

          {/* Panda Body */}
          <g>
            <ellipse cx="200" cy="230" rx="65" ry="72" fill="white" stroke="white" strokeWidth="8" />
            <ellipse cx="200" cy="230" rx="62" ry="69" fill="white" />
            <ellipse cx="200" cy="235" rx="48" ry="55" fill="#F5F5F5" />
          </g>

          <g>
            <ellipse cx="235" cy="275" rx="22" ry="28" fill="white" stroke="white" strokeWidth="8" />
            <ellipse cx="235" cy="275" rx="20" ry="26" fill="#2C2C2C" />
            <ellipse cx="235" cy="285" rx="12" ry="15" fill="#FFB3C1" />
            <ellipse cx="228" cy="278" rx="4" ry="5" fill="#FFB3C1" />
            <ellipse cx="242" cy="278" rx="4" ry="5" fill="#FFB3C1" />
          </g>

          <g>
            <ellipse cx="165" cy="275" rx="22" ry="28" fill="white" stroke="white" strokeWidth="8" />
            <ellipse cx="165" cy="275" rx="20" ry="26" fill="#2C2C2C" />
            <ellipse cx="165" cy="285" rx="12" ry="15" fill="#FFB3C1" />
            <ellipse cx="158" cy="278" rx="4" ry="5" fill="#FFB3C1" />
            <ellipse cx="172" cy="278" rx="4" ry="5" fill="#FFB3C1" />
          </g>

          <g>
            <ellipse cx="250" cy="205" rx="18" ry="24" fill="white" stroke="white" strokeWidth="8" transform="rotate(-25 250 205)" />
            <ellipse cx="250" cy="205" rx="16" ry="22" fill="#2C2C2C" transform="rotate(-25 250 205)" />
            <ellipse cx="252" cy="213" rx="9" ry="11" fill="#FFB3C1" transform="rotate(-25 252 213)" />
            <ellipse cx="246" cy="205" rx="3" ry="4" fill="#FFB3C1" />
            <ellipse cx="254" cy="205" rx="3" ry="4" fill="#FFB3C1" />
          </g>

          <g>
            <rect x="238" y="150" width="12" height="70" rx="6" fill="#7CB342" stroke="white" strokeWidth="3" transform="rotate(-30 244 185)" />
            <line x1="235" y1="165" x2="248" y2="160" stroke="#558B2F" strokeWidth="2" />
            <line x1="232" y1="180" x2="245" y2="175" stroke="#558B2F" strokeWidth="2" />
            <line x1="229" y1="195" x2="242" y2="190" stroke="#558B2F" strokeWidth="2" />
            <ellipse cx="235" cy="150" rx="8" ry="18" fill="#7CB342" stroke="white" strokeWidth="2" transform="rotate(-30 235 150)" />
            <ellipse cx="248" cy="145" rx="7" ry="16" fill="#7CB342" stroke="white" strokeWidth="2" transform="rotate(20 248 145)" />
            <ellipse cx="240" cy="142" rx="6" ry="15" fill="#8BC34A" stroke="white" strokeWidth="2" transform="rotate(-10 240 142)" />
          </g>

          <g>
            <circle cx="200" cy="160" r="50" fill="white" stroke="white" strokeWidth="8" />
            <circle cx="200" cy="160" r="47" fill="white" />
            <circle cx="170" cy="130" r="18" fill="white" stroke="white" strokeWidth="6" />
            <circle cx="170" cy="130" r="16" fill="#2C2C2C" />
            <circle cx="230" cy="130" r="18" fill="white" stroke="white" strokeWidth="6" />
            <circle cx="230" cy="130" r="16" fill="#2C2C2C" />
            <ellipse cx="182" cy="155" rx="16" ry="20" fill="#2C2C2C" transform="rotate(-10 182 155)" />
            <ellipse cx="218" cy="155" rx="16" ry="20" fill="#2C2C2C" transform="rotate(10 218 155)" />
            <ellipse cx="182" cy="158" rx="10" ry="13" fill="#2C2C2C" />
            <circle cx="182" cy="158" r="9" fill="white" />
            <circle cx="182" cy="158" r="7" fill="#2C2C2C" />
            <circle cx="184" cy="155" r="4" fill="white" />
            <circle cx="180" cy="161" r="2" fill="white" opacity="0.7" />
            <ellipse cx="218" cy="158" rx="10" ry="13" fill="#2C2C2C" />
            <circle cx="218" cy="158" r="9" fill="white" />
            <circle cx="218" cy="158" r="7" fill="#2C2C2C" />
            <circle cx="220" cy="155" r="4" fill="white" />
            <circle cx="216" cy="161" r="2" fill="white" opacity="0.7" />
            <ellipse cx="200" cy="172" rx="7" ry="6" fill="#2C2C2C" />
            <path d="M190 178 Q200 186 210 178" stroke="#2C2C2C" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="165" cy="170" rx="8" ry="6" fill="#FFB3C1" opacity="0.6" />
            <ellipse cx="235" cy="170" rx="8" ry="6" fill="#FFB3C1" opacity="0.6" />
          </g>

          <motion.g animate={{ rotate: [0, 12, -8, 12, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }} style={{ transformOrigin: '145px 185px' }}>
            <ellipse cx="145" cy="185" rx="16" ry="26" fill="white" stroke="white" strokeWidth="8" transform="rotate(-45 145 185)" />
            <ellipse cx="145" cy="185" rx="14" ry="24" fill="#2C2C2C" transform="rotate(-45 145 185)" />
            <ellipse cx="125" cy="155" rx="20" ry="26" fill="white" stroke="white" strokeWidth="8" transform="rotate(-20 125 155)" />
            <ellipse cx="125" cy="155" rx="18" ry="24" fill="#2C2C2C" transform="rotate(-20 125 155)" />
            <ellipse cx="125" cy="162" rx="11" ry="13" fill="#FFB3C1" transform="rotate(-20 125 162)" />
            <ellipse cx="118" cy="150" rx="4" ry="5" fill="#FFB3C1" transform="rotate(-20 118 150)" />
            <ellipse cx="126" cy="147" rx="4" ry="5" fill="#FFB3C1" transform="rotate(-20 126 147)" />
            <ellipse cx="133" cy="152" rx="4" ry="5" fill="#FFB3C1" transform="rotate(-20 133 152)" />
          </motion.g>

          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="0" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B9D" />
              <stop offset="50%" stopColor="#C44569" />
              <stop offset="100%" stopColor="#FF6B9D" />
            </linearGradient>
          </defs>

          <g>
            <text x="200" y="320" textAnchor="middle" fill="white" stroke="white" strokeWidth="8" strokeLinejoin="round" style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '1px' }}>Pet Haven</text>
            <text x="200" y="320" textAnchor="middle" fill="url(#textGradient)" style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '1px' }}>Pet me plz!!</text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
