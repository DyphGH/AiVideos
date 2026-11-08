import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_PE = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
const SEGS: Seg[] = [
  {name: 'pe', start: 0, end: 9.7, capY: 1780},
  {name: 'cerebro', start: 9.7, end: 15.4, capY: 1790},
  {name: 'pior', start: 15.4, end: 17.5, capY: 1700},
  {name: 'mao', start: 17.5, end: 23.1, capY: 1850},
  {name: 'naoda', start: 23.1, end: 28.0, capY: 1850},
  {name: 'fim', start: 28.0, end: 30.6, capY: 1320},
];
export const DUR_PE = 30.6;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 3.25, chunks: ['LEVANTA', 'O PÉ *DIREITO*', 'E RODA-O', 'ASSIM']},
  {start: 3.5, end: 6.7, chunks: ['SEM PARAR...', 'DESENHA', 'UM *6*', 'COM A MÃO']},
  {start: 7.0, end: 9.55, chunks: ['VISTE?', 'O PÉ *MUDOU*', 'DE DIREÇÃO']},
  {start: 9.9, end: 15.2, chunks: ['É O TEU', '*CÉREBRO*', 'JUNTA OS', 'MOVIMENTOS', 'DO MESMO LADO', 'E NÃO AGUENTA', '*DOIS*']},
  {start: 17.75, end: 20.95, chunks: ['PÕE A MÃO', 'NA MESA', 'E DOBRA', 'O DO *MEIO*']},
  {start: 21.29, end: 22.95, chunks: ['AGORA LEVANTA', 'O *ANELAR*']},
  {start: 23.26, end: 24.7, chunks: ['NÃO DÁ,', '*POIS NÃO?*']},
  {start: 25.0, end: 27.75, chunks: ['ESTÁ PRESO', 'AO DO MEIO', 'PELO MESMO', '*TENDÃO*']},
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
const REMAP: [number, number, number][] = [[0, 17.5, 28.0], [10.5, 15.4, 17.5], [12.6, 0, 15.4], [28.0, 28.0, 30.6]];
const toOld = (nt: number) => { for (let i = REMAP.length - 1; i >= 0; i--) { const [ns, os] = REMAP[i]; if (nt >= ns) return os + (nt - ns); } return nt; };

export const FactoPe: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_PE;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) + (nt < 3.0 ? buildFacto('hook', nt, 3) : '');
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-pe2.mp3')} />
    </AbsoluteFill>
  );
};
export const PE_FRAMES = Math.round(DUR_PE * FPS_PE);
