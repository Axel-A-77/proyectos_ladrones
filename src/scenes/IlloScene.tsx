import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {FONTS} from '../fonts';
import {Appear} from '../effects/Appear';
import {useReducedMotion} from '../lib/reducedMotion';

type ColorKey = keyof typeof COLORS;

export type SceneLabel = {
  text: string;
  bg?: ColorKey;
  color?: ColorKey;
  rotate?: number;
  place?: 'top' | 'bottom';
};

export type SceneImage = {src: string; height?: number; label?: SceneLabel};

// Cartel/etiqueta como TEXTO en el código (nunca dentro de la imagen).
const Tag: React.FC<{label: SceneLabel}> = ({label}) => (
  <div
    style={{
      fontFamily: FONTS.poster,
      background: COLORS[label.bg ?? 'gold'],
      color: COLORS[label.color ?? 'ink'],
      fontSize: 36,
      lineHeight: 1.12,
      padding: '6px 20px',
      borderRadius: 10,
      border: `5px solid ${COLORS.ink}`,
      transform: `rotate(${label.rotate ?? -3}deg)`,
      boxShadow: '4px 6px 0 rgba(21,18,13,0.22)',
      whiteSpace: 'nowrap',
    }}
  >
    {label.text}
  </div>
);

const idleTransform = (
  frame: number,
  mode: 'float' | 'sway' | undefined,
  reduced: boolean
): string | undefined => {
  if (!mode || reduced) return undefined;
  if (mode === 'float') return `translateY(${Math.sin(frame / 18) * 10}px)`;
  return `rotate(${Math.sin(frame / 22) * 2.2}deg)`;
};

const ImageItem: React.FC<{
  img: SceneImage;
  idle?: 'float' | 'sway';
  onDark?: boolean;
}> = ({img, idle, onDark}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const transform = idleTransform(frame, idle, reduced);
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        transform,
      }}
    >
      {img.label && (img.label.place ?? 'top') === 'top' && (
        <div style={{position: 'absolute', top: -10, zIndex: 2}}>
          <Tag label={img.label} />
        </div>
      )}
      <Img
        src={staticFile('ilustraciones/' + img.src)}
        style={{
          height: img.height ?? 480,
          objectFit: 'contain',
          // En fondo oscuro, las líneas negras del doodle se perderían:
          // un halo crema las separa del fondo y las mantiene legibles.
          filter: onDark ? 'drop-shadow(0 0 16px rgba(251,248,241,0.55))' : undefined,
        }}
      />
      {img.label && img.label.place === 'bottom' && (
        <div style={{marginTop: -6, zIndex: 2}}>
          <Tag label={img.label} />
        </div>
      )}
    </div>
  );
};

// Escena de ilustración genérica: elementos centrados y simétricos que
// aparecen uno a uno con rebote suave. Cubre toda la pantalla (sobre el Overlay).
export const IlloScene: React.FC<{
  images: SceneImage[];
  hero?: SceneImage; // imagen grande arriba (ej. la casa con elementos debajo)
  heading?: {text: string; color?: ColorKey};
  caption?: string;
  splitLabels?: {left: string; right: string}; // para antes/después
  idle?: 'float' | 'sway';
  vanishing?: string; // texto que sube y se desvanece (ej. "$")
  onDark?: boolean;
  animate?: boolean; // false: sin rebote (lo usa RotateScene)
  gap?: number;
}> = ({
  images,
  hero,
  heading,
  caption,
  splitLabels,
  idle,
  vanishing,
  onDark,
  animate = true,
  gap = 70,
}) => {
  const frame = useCurrentFrame();
  const reduced = useReducedMotion();
  const textColor = onDark ? COLORS.cream : COLORS.ink;

  const wrap = (key: number, delay: number, node: React.ReactNode) =>
    animate ? (
      <Appear key={key} delay={reduced ? 0 : delay}>
        {node}
      </Appear>
    ) : (
      <div key={key}>{node}</div>
    );

  // "$" que sube y se desvanece en bucle (dinero que desaparece).
  let vanishStyle: React.CSSProperties | undefined;
  if (vanishing && !reduced) {
    const cycle = 48;
    const ph = (frame % cycle) / cycle;
    vanishStyle = {opacity: Math.sin(ph * Math.PI), transform: `translateY(${-ph * 130}px)`};
  } else if (vanishing) {
    vanishStyle = {opacity: 0.9};
  }

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '40px 60px 170px'}}>
      {heading && (
        <div
          style={{
            fontFamily: FONTS.poster,
            color: heading.color ? COLORS[heading.color] : textColor,
            fontSize: 68,
            letterSpacing: 1,
            marginBottom: 22,
            textAlign: 'center',
          }}
        >
          {heading.text}
        </div>
      )}

      {hero && (
        <div style={{marginBottom: 10}}>
          {wrap(-1, 0, <ImageItem img={hero} idle={idle} onDark={onDark} />)}
        </div>
      )}

      <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap, width: '100%'}}>
        {images.map((img, i) => wrap(i, i * 14, <ImageItem img={img} idle={idle} onDark={onDark} />))}

        {vanishing && (
          <div
            style={{
              position: 'absolute',
              top: '14%',
              fontFamily: FONTS.poster,
              color: COLORS.gold,
              fontSize: 90,
              ...vanishStyle,
            }}
          >
            {vanishing}
          </div>
        )}

        {splitLabels && (
          <>
            <div style={{position: 'absolute', top: -6, left: '7%', zIndex: 3}}>
              <Tag label={{text: splitLabels.left, bg: 'cream', rotate: -3}} />
            </div>
            <div style={{position: 'absolute', top: -6, right: '7%', zIndex: 3}}>
              <Tag label={{text: splitLabels.right, bg: 'red', color: 'cream', rotate: 3}} />
            </div>
          </>
        )}
      </div>

      {caption && (
        <div
          style={{
            fontFamily: FONTS.hand,
            color: textColor,
            fontSize: 40,
            marginTop: 22,
            opacity: 0.85,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {caption}
        </div>
      )}
    </AbsoluteFill>
  );
};
