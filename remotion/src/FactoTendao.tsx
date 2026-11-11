import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_TD = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'td_tendao', start: 0, end: 10.63, capY: 1470},
  {name: 'td_espiral', start: 10.63, end: 21.38, capY: 1470},
  {name: 'td_mao', start: 21.38, end: 26.35, capY: 1470},
  {name: 'td_fim', start: 26.35, end: 28.8, capY: 1470},
];
export const DUR_TD = 28.8;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 3.05, chunks: ['JUNTA O', 'POLEGAR', 'COM O *MINDINHO*', 'E DOBRA O PULSO']},
  {start: 3.38, end: 5.7, chunks: ['*VIU?*', 'UM TENDÃO', '*SALTOU*', 'NO PULSO']},
  {start: 6.02, end: 10.19, chunks: ['SE NÃO SALTOU', 'NADA...', '*1 EM CADA 7*', 'PESSOAS', 'NASCE SEM', 'ESSE MÚSCULO']},
  {start: 10.63, end: 12.62, chunks: ['OLHA PRO MEIO', 'DA *ESPIRAL*', 'E *NÃO PISCA*']},
  {start: 16.55, end: 17.3, chunks: ['CONTINUA...']},
  {start: 21.38, end: 22.16, chunks: ['OLHA PRA', 'SUA *MÃO*']},
  {start: 22.52, end: 23.6, chunks: ['TÁ SE', '*MEXENDO*, NÉ?']},
  {start: 23.93, end: 26.22, chunks: ['É O SEU', '*CÉREBRO*', 'QUE AINDA ACHA', 'QUE TÁ *GIRANDO*']},
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

export const FactoTendao: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_TD;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-td.mp3')} />
    </AbsoluteFill>
  );
};
export const TD_FRAMES = Math.round(DUR_TD * FPS_TD);
