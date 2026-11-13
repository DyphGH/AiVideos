import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
// @ts-ignore
import {buildFacto} from './art';

export const FPS_MB = 30;
const HAS_VOZ = false;
type Seg = {name: string; start: number; end: number; capY: number};
// tempos acertados à voz (voz-pe.mp3, 30,3 s)
// voz nova (eleven v4) + 3,6 s de silêncio depois de "foca bem nele"
const SEGS: Seg[] = [
  {name: 'mb_mindinho', start: 0, end: 7.9, capY: 1470},
  {name: 'mb_bandeira', start: 7.9, end: 21.3, capY: 1470},
  {name: 'mb_branco', start: 21.3, end: 25.6, capY: 1470},
];
export const DUR_MB = 25.6;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Line[] = [
  {start: 0.0, end: 2.3, chunks: ['DOBRA SÓ A', 'PONTA DO', '*MINDINHO*']},
  {start: 2.5, end: 4.2, chunks: ['NÃO DÁ SEM', 'DOBRAR O *RESTO*,', 'NÉ?']},
  {start: 4.4, end: 7.6, chunks: ['O MÚSCULO QUE', 'DOBRA A PONTA', 'É O *MESMO*', 'QUE PUXA OS', 'OUTROS DEDOS']},
  {start: 7.9, end: 10.6, chunks: ['OLHA PRO', '*PONTO*', 'E *NÃO PISCA*']},
  {start: 13.5, end: 14.3, chunks: ['CONTINUA...']},
  {start: 21.3, end: 22.4, chunks: ['AGORA OLHA', 'PRO *BRANCO*']},
  {start: 22.6, end: 24.3, chunks: ['VIU A *BANDEIRA*', 'DE VERDADE?']},
  {start: 24.5, end: 25.6, chunks: ['AGORA TENTA', '*DE NOVO*']},
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

export const FactoMindinho: React.FC = () => {
  useFonts();
  const nt = useCurrentFrame() / FPS_MB;
  const t = toOld(nt);
  const seg = SEGS.find((s) => t >= s.start && t < s.end) ?? SEGS[SEGS.length - 1];
  const svg = buildFacto(seg.name, t - seg.start, seg.end - seg.start) ;
  return (
    <AbsoluteFill style={{backgroundColor: '#07112a'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" dangerouslySetInnerHTML={{__html: svg}} />
      <Caption t={t} y={seg.capY} />
      {HAS_VOZ && <Audio src={staticFile('voz-mb.mp3')} />}
    </AbsoluteFill>
  );
};
export const MB_FRAMES = Math.round(DUR_MB * FPS_MB);
