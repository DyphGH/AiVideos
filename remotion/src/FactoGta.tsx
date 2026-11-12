import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_GTA = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'gta_hype', start: 0, end: 2.52, capY: 1470},
  {name: 'gta_espera', start: 2.52, end: 6.25, capY: 1470},
  {name: 'gta_pergunta', start: 6.25, end: 11.26, capY: 1470},
  {name: 'gta_custo', start: 11.26, end: 14.72, capY: 1470},
  {name: 'gta_pre', start: 14.72, end: 17.56, capY: 1470},
  {name: 'gta_semana', start: 17.56, end: 21.65, capY: 1470},
];
export const DUR_GTA = 21.65;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 2.33, chunks: ['O *GTA 6*', 'SAI DAQUI A', 'UMA SEMANA']},
  {start: 2.52, end: 4.9, chunks: ['E QUEM NASCEU', 'NO DIA DO GTA 5', 'JÁ TEM *13 ANOS*']},
  {start: 5.09, end: 5.97, chunks: ['*13 ANOS*', 'ESPERANDO']},
  {start: 6.25, end: 10.13, chunks: ['QUANTOS ANOS', 'VOCÊ TINHA', 'QUANDO SAIU', 'O *GTA 5*?']},
  {start: 10.39, end: 10.86, chunks: ['*COMENTA AÍ*']},
  {start: 11.26, end: 14.51, chunks: ['ESTIMAM QUE', 'ELE CUSTOU', 'MAIS DE', '*5 BILHÕES*', 'DE REAIS']},
  {start: 14.72, end: 17.25, chunks: ['SÓ NA', '*PRÉ-VENDA*', 'JÁ FATUROU', 'PRATICAMENTE', 'ISSO']},
  {start: 17.56, end: 21.6, chunks: ['E NA', 'PRIMEIRA SEMANA', 'PODE FATURAR', '*25 BILHÕES*']},
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
        <text x={540} y={y} fontFamily="M" fontWeight={900} fontSize={92} textAnchor="middle" stroke="#0a1633" strokeWidth={20} paintOrder="stroke fill" strokeLinejoin="round">
          {parts.map((p, k) => (<tspan key={k} fill={k % 2 === 1 ? '#ffd21f' : '#ffffff'}>{p}</tspan>))}
        </text>
      </g>
    </svg>
  );
}

// nova ordem: dedo -> "mas o segundo é pior" -> pé -> fim. [início novo, início antigo, fim antigo]
const REMAP: [number, number, number][] = [[0, 0, 0]];
const toOld = (nt: number) => { for (let i = REMAP.length - 1; i >= 0; i--) { const [ns, os] = REMAP[i]; if (nt >= ns) return os + (nt - ns); } return nt; };

export const FactoGta: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_GTA;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-gta.mp3')} />
    </AbsoluteFill>
  );
};
export const GTA_FRAMES = Math.round(DUR_GTA * FPS_GTA);
