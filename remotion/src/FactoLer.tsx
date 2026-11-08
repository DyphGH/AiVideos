import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_LER = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'ler1', start: 0, end: 11.6, capY: 1800},
  {name: 'ler_ponte', start: 11.6, end: 14.4, capY: 1700},
  {name: 'ler2', start: 14.4, end: 25.05, capY: 1760},
  {name: 'ler_fim', start: 25.05, end: 28.34, capY: 1700},
];
export const DUR_LER = 28.34;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 1.09, chunks: ['LÊ ISTO EM', '*VOZ ALTA*']},
  {start: 1.26, end: 1.67, chunks: ['*RÁPIDO!*']},
  {start: 2.08, end: 3.26, chunks: ['LESTE', '"UM PASSEIO', 'NO *PARQUE*"?']},
  {start: 3.57, end: 4.7, chunks: ['LÊ OUTRA', 'VEZ...']},
  {start: 4.8, end: 5.43, chunks: ['*DEVAGAR*']},
  {start: 5.79, end: 7.51, chunks: ['ESTÁ LÁ "NO"', '*DUAS VEZES!*']},
  {start: 7.76, end: 9.48, chunks: ['O TEU CÉREBRO', '*ADIVINHA*', 'A FRASE']},
  {start: 9.58, end: 11.36, chunks: ['E SALTA', 'O QUE ACHA', 'QUE NÃO', '*INTERESSA*']},
  {start: 14.49, end: 15.28, chunks: ['LÊ ESTA', '*FRASE*']},
  {start: 18.67, end: 19.47, chunks: ['AS LETRAS', 'ESTÃO']},
  {start: 19.65, end: 20.58, chunks: ['TODAS', '*TROCADAS*']},
  {start: 20.76, end: 21.86, chunks: ['E TU LESTE', '*NA MESMA!*']},
  {start: 22.17, end: 24.89, chunks: ['O CÉREBRO LÊ', 'A *PALAVRA*', '*INTEIRA*', 'NÃO LETRA', 'A LETRA']},
  {start: 25.2, end: 28.34, chunks: ['QUANTAS TE', '*APANHARAM?*', 'ZERO, UMA', 'OU DUAS?', '*COMENTA!*']},
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

export const FactoLer: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_LER;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-ler.mp3')} />
    </AbsoluteFill>
  );
};
export const LER_FRAMES = Math.round(DUR_LER * FPS_LER);
