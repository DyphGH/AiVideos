import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_BOC = 30;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'boc_pe', start: 0, end: 9.1, capY: 1830},
  {name: 'boc_ponte', start: 9.1, end: 12.0, capY: 1700},
  {name: 'boc_bocejo', start: 12.0, end: 22.3, capY: 1840},
  {name: 'boc_fim', start: 22.3, end: 26.7, capY: 1840},
];
export const DUR_BOC = 26.7;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 2.02, chunks: ['TENTA MEXER', 'SÓ O *4.º DEDO*', 'DO PÉ']},
  {start: 2.31, end: 4.79, chunks: ['SÓ *ESSE*', 'SEM MEXER', 'OS OUTROS']},
  {start: 5.03, end: 8.84, chunks: ['NÃO DÁ', 'POIS NÃO?', 'PARTILHAM', 'OS MESMOS', '*TENDÕES*']},
  {start: 9.29, end: 11.58, chunks: ['MAS O SEGUNDO', 'VAIS FAZER', '*SEM QUERER*']},
  {start: 12.08, end: 14.26, chunks: ['*AHHH...*', 'DESCULPA']},
  {start: 14.73, end: 18.75, chunks: ['VER ALGUÉM', 'A BOCEJAR', 'OUVIR', 'OU ATÉ LER', 'A PALAVRA', '*BOCEJO*']},
  {start: 19.16, end: 22.09, chunks: ['FAZ *METADE*', 'DAS PESSOAS', '*BOCEJAR*', 'TAMBÉM']},
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

export const FactoBocejo: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_BOC;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      <Audio src={staticFile('voz-bocejo.mp3')} />
    </AbsoluteFill>
  );
};
export const BOC_FRAMES = Math.round(DUR_BOC * FPS_BOC);
