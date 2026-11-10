import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_LERBR = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'lerBR1', start: 0, end: 9.4, capY: 1800},
  {name: 'lerBR2', start: 9.4, end: 16.5, capY: 1780},
  {name: 'lerBR_fim', start: 16.5, end: 21.0, capY: 1830},
];
export const DUR_LERBR = 21.0;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 1.08, chunks: ['LÊ ISSO EM', '*VOZ ALTA*']},
  {start: 1.28, end: 1.71, chunks: ['*RÁPIDO!*']},
  {start: 2.05, end: 3.75, chunks: ['LEU "UM PASSEIO', 'NO *PARQUE*"?']},
  {start: 4.1, end: 4.6, chunks: ['*ERROU.*']},
  {start: 4.93, end: 6.35, chunks: ['TEM "NO"', '*DUAS VEZES!*']},
  {start: 6.64, end: 9.27, chunks: ['SEU CÉREBRO', '*PULOU*', 'UMA PALAVRA', 'E NEM', 'TE AVISOU']},
  {start: 9.64, end: 10.63, chunks: ['E ESSA AQUI?', '*LÊ.*']},
  {start: 13.43, end: 16.33, chunks: ['TÁ TUDO', '*EMBARALHADO*', 'E VOCÊ LEU', '*DE BOA!*']},
  {start: 16.63, end: 18.66, chunks: ['MANDA PRA', 'ALGUÉM', 'E VÊ SE *CAI*']},
];

function useFonts() {
  const [h] = useState(() => delayRender('fonte'));
  useEffect(() => {
    const f = new FontFace('M', `url(${staticFile('fonts/mont900.woff2')})`, {weight: '900'});
    f.load().then((ff) => { (document as any).fonts.add(ff); continueRender(h); });
  }, [h]);
}

function Caption({t, y}: {t: number; y: number}) {
  const line = LINES.find((l) => t >= l.start && t < l.end);
  if (!line) return null;
  const per = (line.end - line.start) / line.chunks.length;
  const i = Math.min(line.chunks.length - 1, Math.floor((t - line.start) / per));
  const local = t - line.start - i * per;
  const sc = local < 0.1 ? 1.15 - (local / 0.1) * 0.15 : 1;
  const parts = line.chunks[i].split('*');
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(540 ${y}) scale(${sc}) translate(-540 ${-y})`}>
        <text x={540} y={y} fontFamily="M" fontWeight={900} fontSize={104} textAnchor="middle" stroke="#0a1633" strokeWidth={20} paintOrder="stroke fill" strokeLinejoin="round">
          {parts.map((p, k) => (<tspan key={k} fill={k % 2 === 1 ? '#ffd21f' : '#ffffff'}>{p}</tspan>))}
        </text>
      </g>
    </svg>
  );
}

// nova ordem: dedo -> "mas o segundo é pior" -> pé -> fim. [início novo, início antigo, fim antigo]
const REMAP: [number, number, number][] = [[0, 0, 0]];
const toOld = (nt: number) => { for (let i = REMAP.length - 1; i >= 0; i--) { const [ns, os] = REMAP[i]; if (nt >= ns) return os + (nt - ns); } return nt; };

export const FactoLerBR: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_LERBR;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-lerbr.mp3')} />
    </AbsoluteFill>
  );
};
export const LERBR_FRAMES = Math.round(DUR_LERBR * FPS_LERBR);
