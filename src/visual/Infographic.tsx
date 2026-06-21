import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';

export const IllustratedSlide: React.FC<{
  title: string;
  children: React.ReactNode;
  titleWidth?: number;
  titleAlign?: 'left' | 'center';
}> = ({title, children, titleWidth = 1320, titleAlign = 'center'}) => (
  <AbsoluteFill style={{backgroundColor: COLORS.sun, color: COLORS.ink}}>
    <div
      style={{
        position: 'absolute',
        top: 42,
        left: titleAlign === 'center' ? (1920 - titleWidth) / 2 : 104,
        width: titleWidth,
        textAlign: titleAlign,
        fontFamily: FONTS.display,
        fontSize: 74,
        lineHeight: 1,
        letterSpacing: 1,
        zIndex: 20,
      }}
    >
      {title}
    </div>
    <div style={{position: 'absolute', left: 92, right: 92, top: 145, bottom: 54}}>{children}</div>
  </AbsoluteFill>
);

export const PaperPanel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  padding?: number;
}> = ({children, style, padding = 28}) => (
  <div
    style={{
      position: 'absolute',
      boxSizing: 'border-box',
      padding,
      background: COLORS.paper,
      border: `7px solid ${COLORS.ink}`,
      borderRadius: 28,
      boxShadow: '8px 10px 0 rgba(21,18,13,0.15)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const SplitPanel: React.FC<{
  leftTitle: string;
  rightTitle: string;
  left: React.ReactNode;
  right: React.ReactNode;
  dividerColor?: string;
}> = ({leftTitle, rightTitle, left, right, dividerColor = COLORS.ink}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <PaperPanel style={{left: 20, top: 18, width: 820, height: 790}}>
      <div style={{fontFamily: FONTS.display, fontSize: 54, textAlign: 'center', marginBottom: 10}}>{leftTitle}</div>
      {left}
    </PaperPanel>
    <div style={{position: 'absolute', left: 865, top: 30, width: 12, height: 760, borderRadius: 8, background: dividerColor}} />
    <PaperPanel style={{right: 20, top: 18, width: 820, height: 790}}>
      <div style={{fontFamily: FONTS.display, fontSize: 54, textAlign: 'center', marginBottom: 10}}>{rightTitle}</div>
      {right}
    </PaperPanel>
  </div>
);

export const ObjectLabel: React.FC<{
  text: string;
  color?: string;
  style?: React.CSSProperties;
  size?: number;
}> = ({text, color = COLORS.ink, style, size = 42}) => (
  <div
    style={{
      position: 'absolute',
      fontFamily: FONTS.display,
      fontSize: size,
      color,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {text}
  </div>
);

export const HangingSign: React.FC<{
  text: string;
  color?: string;
  style?: React.CSSProperties;
}> = ({text, color = COLORS.red, style}) => (
  <div style={{position: 'absolute', ...style}}>
    <div style={{position: 'absolute', left: 26, top: -44, width: 7, height: 46, background: COLORS.ink, transform: 'rotate(12deg)', transformOrigin: 'bottom'}} />
    <div style={{position: 'absolute', right: 26, top: -44, width: 7, height: 46, background: COLORS.ink, transform: 'rotate(-12deg)', transformOrigin: 'bottom'}} />
    <div
      style={{
        background: COLORS.paper,
        border: `6px solid ${COLORS.ink}`,
        borderRadius: 12,
        padding: '14px 24px',
        fontFamily: FONTS.display,
        fontSize: 42,
        color,
        boxShadow: '5px 6px 0 rgba(21,18,13,0.16)',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  </div>
);

export const StampLabel: React.FC<{
  text: string;
  color?: string;
  style?: React.CSSProperties;
  size?: number;
}> = ({text, color = COLORS.red, style, size = 48}) => (
  <div
    style={{
      position: 'absolute',
      border: `8px solid ${color}`,
      color,
      borderRadius: 18,
      padding: '12px 24px 8px',
      fontFamily: FONTS.display,
      fontSize: size,
      lineHeight: 1,
      transform: 'rotate(-4deg)',
      background: 'rgba(255,248,231,0.8)',
      ...style,
    }}
  >
    {text}
  </div>
);

export const PriceTag: React.FC<{
  text: string;
  style?: React.CSSProperties;
}> = ({text, style}) => (
  <div style={{position: 'absolute', ...style}}>
    <svg width="280" height="118" viewBox="0 0 280 118">
      <path d="M18 20 H225 L264 59 L225 98 H18 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth="7" strokeLinejoin="round" />
      <circle cx="226" cy="59" r="10" fill={COLORS.paper} stroke={COLORS.ink} strokeWidth="5" />
      <text x="118" y="70" textAnchor="middle" fontFamily={FONTS.display} fontSize="34" fill={COLORS.paper}>{text}</text>
    </svg>
  </div>
);

export const Arrow: React.FC<{
  from: [number, number];
  to: [number, number];
  color?: string;
  width?: number;
  label?: string;
}> = ({from, to, color = COLORS.ink, width = 8, label}) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: from[0],
          top: from[1],
          width: len,
          height: width,
          background: color,
          borderRadius: width,
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -2,
            top: '50%',
            width: 24,
            height: 24,
            borderTop: `${width}px solid ${color}`,
            borderRight: `${width}px solid ${color}`,
            transform: 'translateY(-50%) rotate(45deg)',
          }}
        />
      </div>
      {label && <ObjectLabel text={label} size={32} style={{left: (from[0] + to[0]) / 2 - 70, top: (from[1] + to[1]) / 2 - 46}} />}
    </>
  );
};

export const MiniCard: React.FC<{
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: string;
}> = ({title, children, style, accent = COLORS.blue}) => (
  <div
    style={{
      position: 'absolute',
      background: COLORS.paper,
      border: `6px solid ${COLORS.ink}`,
      borderRadius: 24,
      padding: 18,
      boxShadow: '6px 7px 0 rgba(21,18,13,0.14)',
      ...style,
    }}
  >
    <div style={{fontFamily: FONTS.display, fontSize: 34, color: accent, textAlign: 'center', marginBottom: 8}}>{title}</div>
    {children}
  </div>
);
