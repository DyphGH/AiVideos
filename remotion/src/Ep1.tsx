import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, getStaticFiles, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore — módulo JS gerado por build-art.sh
import {buildShot} from './art';
import {DURATION, FPS, LINES, SHOTS, TITLE} from './timeline';

const fontCss = `
@font-face{font-family:A;src:url(${staticFile('fonts/anton.woff2')}) format('woff2');}
@font-face{font-family:PM;src:url(${staticFile('fonts/marker.woff2')}) format('woff2');}
`;

const COLORS = ['#f6c744', '#4cc3f0'];

function useFonts() {
  const [handle] = useState(() => delayRender('fontes'));
  useEffect(() => {
    const a = new FontFace('A', `url(${staticFile('fonts/anton.woff2')})`);
    const b = new FontFace('PM', `url(${staticFile('fonts/marker.woff2')})`);
    Promise.all([a.load(), b.load()]).then((fs) => {
      fs.forEach((f) => (document as any).fonts.add(f));
      continueRender(handle);
    });
  }, [handle]);
}

function Caption({t, y}: {t: number; y: number}) {
  const line = LINES.find((l) => t >= l.start && t < l.end);
  if (!line) return null;
  const per = (line.end - line.start) / line.chunks.length;
  const i = Math.min(line.chunks.length - 1, Math.floor((t - line.start) / per));
  const local = t - line.start - i * per;
  const scale = local < 0.12 ? 1.18 - (local / 0.12) * 0.18 : 1;
  const hl = COLORS[(LINES.indexOf(line) + i) % 2];
  const parts = line.chunks[i].split('*');
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(540 ${y}) scale(${scale}) translate(-540 ${-y})`}>
        <text x={540} y={y} fontFamily="A" fontSize={150} textAnchor="middle" stroke="#1b1420" strokeWidth={22} paintOrder="stroke fill" strokeLinejoin="round">
          {parts.map((p, k) => (
            <tspan key={k} fill={k % 2 === 1 ? hl : '#ffffff'}>{p}</tspan>
          ))}
        </text>
      </g>
    </svg>
  );
}

function Title({t}: {t: number}) {
  if (t >= TITLE.end) return null;
  const out = t > TITLE.end - 0.3 ? (TITLE.end - t) / 0.3 : 1;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: out}}>
      <rect x={40} y={200} width={1000} height={110} rx={18} fill="#ffffff" stroke="#1b1420" strokeWidth={8} />
      <text x={540} y={278} fontFamily="A" fontSize={62} textAnchor="middle" fill="#1b1420">{TITLE.text}</text>
    </svg>
  );
}

export const Ep1: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const shot = SHOTS.find((s) => t >= s.start && t < s.end) ?? SHOTS[SHOTS.length - 1];
  const local = t - shot.start;
  const svg = buildShot(shot.name, local, shot.end - shot.start);
  const hasVoice = getStaticFiles().some((f) => f.name === 'voz.mp3');
  const hasMusic = getStaticFiles().some((f) => f.name === 'musica.mp3');
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <style>{fontCss}</style>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Title t={t} />
      <Caption t={t} y={shot.captionY} />
      {hasVoice ? <Audio src={staticFile('voz.mp3')} /> : null}
      {hasMusic ? <Audio src={staticFile('musica.mp3')} volume={0.18} /> : null}
    </AbsoluteFill>
  );
};

export const EP1_FRAMES = Math.round(DURATION * FPS);
