import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';

const titleSize = (text: string) => {
  if (text.length > 34) return 56;
  if (text.length > 27) return 62;
  if (text.length > 21) return 68;
  return 74;
};

const cardTitleSize = (text: string) => {
  if (text.length > 20) return 25;
  if (text.length > 15) return 28;
  if (text.length > 11) return 31;
  return 34;
};

export const IllustratedSlide: React.FC<{
  title: string;
  children: React.ReactNode;
  titleWidth?: number;
  titleAlign?: 'left' | 'center';
}> = ({title, children, titleWidth = 1510, titleAlign = 'center'}) => (
  <AbsoluteFill style={{backgroundColor: COLORS.sun, color: COLORS.ink, overflow: 'hidden'}}>
    <div
      style={{
        position: 'absolute',
        top: 26,
        left: titleAlign === 'center' ? 76 : 104,
        width: titleWidth,
        minHeight: 82,
        display: 'flex',
        alignItems: 'center',
        justifyContent: titleAlign === 'center' ? 'center' : 'flex-start',
        textAlign: titleAlign,
        fontFamily: FONTS.display,
        fontSize: titleSize(title),
        lineHeight: 0.94,
        letterSpacing: 0.5,
        zIndex: 20,
        overflowWrap: 'break-word',
      }}
    >
      {title}
    </div>
    <div style={{position: 'absolute', left: 92, right: 92, top: 132, bottom: 44}}>{children}</div>
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
      overflow: 'visible',
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
      <div style={{fontFamily: FONTS.display, fontSize: cardTitleSize(leftTitle), lineHeight: 0.95, textAlign: 'center', marginBottom: 10}}>{leftTitle}</div>
      {left}
    </PaperPanel>
    <div style={{position: 'absolute', left: 865, top: 30, width: 12, height: 760, borderRadius: 8, background: dividerColor}} />
    <PaperPanel style={{right: 20, top: 18, width: 820, height: 790}}>
      <div style={{fontFamily: FONTS.display, fontSize: cardTitleSize(rightTitle), lineHeight: 0.95, textAlign: 'center', marginBottom: 10}}>{rightTitle}</div>
      {right}
    </PaperPanel>
  </div>
);

export const ObjectLabel: React.FC<{
  text: string;
  color?: string;
  style?: React.CSSProperties;
  size?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
}> = ({text, color = COLORS.ink, style, size = 42, maxWidth = 520, align = 'center'}) => (
  <div
    style={{
      position: 'absolute',
      maxWidth,
      fontFamily: FONTS.display,
      fontSize: size,
      color,
      lineHeight: 0.95,
      textAlign: align,
      overflowWrap: 'break-word',
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
  maxWidth?: number;
}> = ({text, color = COLORS.red, style, maxWidth = 330}) => {
  const size = text.length > 15 ? 30 : text.length > 10 ? 35 : 42;
  return (
    <div style={{position: 'absolute', maxWidth, ...style}}>
      <div style={{position: 'absolute', left: 26, top: -44, width: 7, height: 46, background: COLORS.ink, transform: 'rotate(12deg)', transformOrigin: 'bottom'}} />
      <div style={{position: 'absolute', right: 26, top: -44, width: 7, height: 46, background: COLORS.ink, transform: 'rotate(-12deg)', transformOrigin: 'bottom'}} />
      <div
        style={{
          background: COLORS.paper,
          border: `6px solid ${COLORS.ink}`,
          borderRadius: 12,
          padding: '14px 20px',
          boxSizing: 'border-box',
          fontFamily: FONTS.display,
          fontSize: size,
          lineHeight: 0.92,
          textAlign: 'center',
          color,
          boxShadow: '5px 6px 0 rgba(21,18,13,0.16)',
          overflowWrap: 'break-word',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const StampLabel: React.FC<{
  text: string;
  color?: string;
  style?: React.CSSProperties;
  size?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
}> = ({text, color = COLORS.red, style, size = 48, maxWidth = 560, align = 'center'}) => (
  <div
    style={{
      position: 'absolute',
      maxWidth,
      boxSizing: 'border-box',
      border: `8px solid ${color}`,
      color,
      borderRadius: 18,
      padding: '12px 22px 9px',
      fontFamily: FONTS.display,
      fontSize: size,
      lineHeight: 0.92,
      textAlign: align,
      overflowWrap: 'break-word',
      transform: 'rotate(-4deg)',
      background: 'rgba(255,248,231,0.9)',
      ...style,
    }}
  >
    {text}
  </div>
);

export const PriceTag: React.FC<{
  text: string;
  style?: React.CSSProperties;
}> = ({text, style}) => {
  const fontSize = text.length > 18 ? 19 : text.length > 14 ? 22 : text.length > 10 ? 26 : 32;
  return (
    <div style={{position: 'absolute', width: 320, height: 118, ...style}}>
      <svg width="320" height="118" viewBox="0 0 320 118">
        <path d="M18 20 H262 L304 59 L262 98 H18 Z" fill={COLORS.red} stroke={COLORS.ink} strokeWidth="7" strokeLinejoin="round" />
        <circle cx="265" cy="59" r="10" fill={COLORS.paper} stroke={COLORS.ink} strokeWidth="5" />
        <text x="137" y="69" textAnchor="middle" fontFamily={FONTS.display} fontSize={fontSize} fill={COLORS.paper}>{text}</text>
      </svg>
    </div>
  );
};

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
      {label && <ObjectLabel text={label} size={30} maxWidth={220} style={{left: (from[0] + to[0]) / 2 - 105, top: (from[1] + to[1]) / 2 - 50}} />}
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
      boxSizing: 'border-box',
      background: COLORS.paper,
      border: `6px solid ${COLORS.ink}`,
      borderRadius: 24,
      padding: 18,
      boxShadow: '6px 7px 0 rgba(21,18,13,0.14)',
      overflow: 'visible',
      ...style,
    }}
  >
    <div
      style={{
        width: '100%',
        minHeight: 42,
        boxSizing: 'border-box',
        padding: '0 4px',
        fontFamily: FONTS.display,
        fontSize: cardTitleSize(title),
        lineHeight: 0.94,
        color: accent,
        textAlign: 'center',
        overflowWrap: 'break-word',
        marginBottom: 8,
      }}
    >
      {title}
    </div>
    {children}
  </div>
);
