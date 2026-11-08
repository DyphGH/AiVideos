import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_OLHO = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'dedos', start: 0, end: 12.05, capY: 1820},
  {name: 'pior2', start: 12.05, end: 14.75, capY: 1700},
  {name: 'olho', start: 14.75, end: 25.38, capY: 1800},
  {name: 'cego', start: 25.38, end: 31.5, capY: 1780},
  {name: 'fim2', start: 31.5, end: 35.0, capY: 1700},
];
export const DUR_OLHO = 35.0;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 0.99, chunks: ['*PARA TUDO!*']},
  {start: 1.31, end: 2.77, chunks: ['ENTRELAÇA', 'OS DEDOS', '*JÁ!*']},
  {start: 3.13, end: 6.89, chunks: ['ESTICA OS', '*INDICADORES*', 'E AFASTA-OS', 'O *MÁXIMO*', 'QUE CONSEGUIRES']},
  {start: 7.28, end: 8.78, chunks: ['DEIXA DE', 'FAZER *FORÇA*']},
  {start: 9.14, end: 10.89, chunks: ['ESTÃO A', '*JUNTAR-SE*', 'SOZINHOS...']},
  {start: 11.18, end: 11.68, chunks: ['NÃO ESTÃO?']},
  {start: 14.82, end: 16.09, chunks: ['AGORA OLHA', 'PARA O *X*']},
  {start: 16.4, end: 17.52, chunks: ['FECHA O OLHO', '*ESQUERDO*']},
  {start: 17.84, end: 18.99, chunks: ['E *FOCA* BEM', 'NELE...']},
  {start: 23.03, end: 23.71, chunks: ['DE REPENTE...']},
  {start: 24.06, end: 25.16, chunks: ['A BOLA', '*DESAPARECE!*']},
  {start: 25.43, end: 29.35, chunks: ['É O TEU', '*PONTO CEGO*', 'ONDE O NERVO', 'SAI DO OLHO', 'NÃO VÊ', '*NADA*']},
  {start: 29.61, end: 31.44, chunks: ['O CÉREBRO', '*INVENTA*', 'O QUE FALTA']},
  {start: 31.77, end: 35.0, chunks: ['QUANTOS', '*CONSEGUISTE?*', 'ZERO, UM', 'OU DOIS?', '*COMENTA!*']},
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

export const FactoOlho: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_OLHO;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-olho4.mp3')} />
    </AbsoluteFill>
  );
};
export const OLHO_FRAMES = Math.round(DUR_OLHO * FPS_OLHO);
