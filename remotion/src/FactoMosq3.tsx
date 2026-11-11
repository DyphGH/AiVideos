import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_MQ3 = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'mq_corte', start: 0, end: 8.65, capY: 1800},
  {name: 'mq_buffet', start: 8.65, end: 13.7, capY: 1870},
  {name: 'mq_sinto', start: 13.7, end: 16.7, capY: 1870},
  {name: 'mq_fim', start: 16.7, end: 18.9, capY: 1840},
];
export const DUR_MQ3 = 18.9;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 2.29, chunks: ['ESSE MOSQUITO', 'VAI TE PICAR', 'COM *6 AGULHAS*']},
  {start: 2.47, end: 4.6, chunks: ['DUAS *SERRAM*', 'SUA PELE', 'DUAS *ABREM*', 'CAMINHO']},
  {start: 4.78, end: 5.91, chunks: ['UMA COSPE', '*SALIVA*']},
  {start: 6.11, end: 8.48, chunks: ['E A ÚLTIMA', 'TOMA SEU SANGUE', 'DE *CANUDINHO*']},
  {start: 8.8, end: 11.19, chunks: ['TEM GENTE', 'QUE ATRAI', '*100 VEZES*', 'MAIS MOSQUITO']},
  {start: 11.41, end: 13.53, chunks: ['NÃO É AZAR', 'É O SEU', '*CHEIRO*']},
  {start: 13.84, end: 15.35, chunks: ['E ELE', '*NÃO MUDA*', 'POR ANOS']},
  {start: 15.69, end: 16.38, chunks: ['*SINTO MUITO*']},
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

export const FactoMosq3: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_MQ3;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-mosq3.mp3')} />
    </AbsoluteFill>
  );
};
export const MQ3_FRAMES = Math.round(DUR_MQ3 * FPS_MQ3);
