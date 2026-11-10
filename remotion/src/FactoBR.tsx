import React, {useEffect, useState} from 'react';
import {AbsoluteFill, OffthreadVideo, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';

export const FPS_BR = 30;
type Line = {start: number; end: number; chunks: string[]};
const LINES: Record<string, Line[]> = {
  mosquito: [
    {start: 0.0, end: 2.0, chunks: ['UM *MOSQUITO*', 'TE PICA COM', '*6 AGULHAS*']},
    {start: 2.24, end: 3.29, chunks: ['E VOCÊ', 'NEM *PERCEBE*']},
    {start: 3.7, end: 4.63, chunks: ['SÓ AS *FÊMEAS*']},
    {start: 4.95, end: 6.88, chunks: ['ELAS PRECISAM', 'DO SEU *SANGUE*', 'PARA OS *OVOS*']},
    {start: 7.17, end: 8.73, chunks: ['DUAS *AGULHAS*', '*SERRAM* A PELE']},
    {start: 9.03, end: 10.32, chunks: ['OUTRAS DUAS', '*ABREM* CAMINHO']},
    {start: 10.63, end: 12.92, chunks: ['UMA *COSPE*', '*SALIVA*', 'PRO SANGUE', 'NÃO *COAGULAR*']},
    {start: 13.18, end: 14.46, chunks: ['E A ÚLTIMA...', '*SUGA*']},
    {start: 14.89, end: 17.28, chunks: ['A *COCEIRA*', 'É O SEU CORPO', 'REAGINDO', 'À *SALIVA*']},
    {start: 17.71, end: 19.98, chunks: ['MAS O SEGUNDO', 'FATO...', 'É AINDA *PIOR*']},
    {start: 20.42, end: 23.17, chunks: ['TEM GENTE', 'QUE ATRAI', 'ATÉ *100 VEZES*', 'MAIS *MOSQUITOS*']},
    {start: 23.51, end: 26.06, chunks: ['EM *2022*', 'CIENTISTAS', 'DESCOBRIRAM', 'POR QUÊ']},
    {start: 26.36, end: 27.34, chunks: ['O *CHEIRO*', 'DA PELE']},
    {start: 27.67, end: 29.69, chunks: ['E ESSE CHEIRO', '*NÃO MUDA*', 'DURANTE *ANOS*']},
    {start: 30.0, end: 31.87, chunks: ['VOCÊ É DAQUELES', 'QUE SEMPRE', 'SÃO *PICADOS?*']},
    {start: 32.12, end: 33.3, chunks: ['COMENTA', '*SIM* OU *NÃO!*']},
  ],
  mosquito2: [
    {start: 0.0, end: 2.0, chunks: ['UM MOSQUITO', 'TE PICA COM', '*6 AGULHAS*']},
    {start: 2.22, end: 3.23, chunks: ['E VOCÊ', 'NEM *SENTE*']},
    {start: 3.5, end: 6.7, chunks: ['DUAS *SERRAM*', 'A PELE', 'DUAS *ABREM*', 'CAMINHO', 'UMA COSPE', '*SALIVA*']},
    {start: 6.96, end: 7.97, chunks: ['E A ÚLTIMA', '*SUGA*']},
    {start: 8.24, end: 10.91, chunks: ['TEM GENTE', 'QUE ATRAI', 'ATÉ *100 VEZES*', 'MAIS MOSQUITOS']},
    {start: 11.14, end: 12.69, chunks: ['CIENTISTAS', 'DESCOBRIRAM', 'POR QUÊ']},
    {start: 13.0, end: 14.01, chunks: ['O *CHEIRO*', 'DA PELE']},
    {start: 14.31, end: 15.62, chunks: ['E ELE', '*NÃO MUDA*', 'POR ANOS']},
  ],
  cerebro: [
    {start: 0.0, end: 2.15, chunks: ['CRUZA O DEDO', 'DO *MEIO*', 'POR CIMA DO', '*INDICADOR*']},
    {start: 2.58, end: 5.42, chunks: ['AGORA ENCOSTA', 'AS DUAS PONTAS', 'NA PONTA', 'DO *NARIZ*']},
    {start: 5.93, end: 6.78, chunks: ['*FECHA* OS OLHOS']},
    {start: 7.21, end: 8.21, chunks: ['E MEXE', '*DEVAGAR*']},
    {start: 8.63, end: 9.83, chunks: ['*DOIS* NARIZES', 'NÉ?']},
    {start: 10.22, end: 13.38, chunks: ['OS LADOS', 'DOS DEDOS', '*NUNCA* TOCAM', 'A MESMA COISA', 'AO MESMO TEMPO']},
    {start: 13.71, end: 15.48, chunks: ['ENTÃO O *CÉREBRO*', 'ACHA QUE', 'SÃO *DUAS*']},
    {start: 15.88, end: 18.23, chunks: ['MAS O SEGUNDO', 'FATO...', 'É AINDA *PIOR*']},
    {start: 18.66, end: 20.13, chunks: ['FALA A *COR*', 'NÃO A PALAVRA']},
    {start: 20.49, end: 20.87, chunks: ['AZUL...']},
    {start: 21.11, end: 21.37, chunks: ['*NÃO!*']},
    {start: 21.68, end: 23.7, chunks: ['FALA A COR', 'DE *CADA UMA*']},
    {start: 24.09, end: 24.75, chunks: ['VAI, *SEM ERRAR!*']},
    {start: 25.06, end: 26.29, chunks: ['*TRAVOU*, NÉ?']},
    {start: 26.53, end: 28.42, chunks: ['LER É', '*AUTOMÁTICO*', 'SEU CÉREBRO LÊ']},
    {start: 28.64, end: 29.9, chunks: ['ANTES DE', 'VER A *COR*']},
    {start: 30.17, end: 31.07, chunks: ['E AS DUAS', 'RESPOSTAS *BRIGAM*']},
    {start: 31.35, end: 32.45, chunks: ['CONSEGUIU?', '*COMENTA!*']},
  ],
};
export const DUR_BR: Record<string, number> = {mosquito: 33.3, cerebro: 32.45, mosquito2: 17.96};

function useFonts() {
  const [h] = useState(() => delayRender('fonte'));
  useEffect(() => {
    const f = new FontFace('M', `url(${staticFile('fonts/mont900.woff2')})`, {weight: '900'});
    f.load().then((ff) => { (document as any).fonts.add(ff); continueRender(h); });
  }, [h]);
}
const Y = 1205;
function Caption({t, lines}: {t: number; lines: Line[]}) {
  const line = lines.find((l) => t >= l.start && t < l.end + 0.15);
  const band = <rect x={30} y={1092} width={1020} height={190} rx={40} fill="#0b0a22" opacity={0.55} />;
  if (!line) return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{band}</svg>;
  const per = (line.end - line.start) / line.chunks.length;
  const i = Math.min(line.chunks.length - 1, Math.max(0, Math.floor((t - line.start) / per)));
  const local = t - line.start - i * per;
  const sc = local < 0.1 ? 1.15 - (local / 0.1) * 0.15 : 1;
  const parts = line.chunks[i].split('*');
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {band}
      <g transform={`translate(540 ${Y}) scale(${sc}) translate(-540 ${-Y})`}>
        <text x={540} y={Y} fontFamily="M" fontWeight={900} fontSize={92} textAnchor="middle" stroke="#0a0a14" strokeWidth={18} paintOrder="stroke fill" strokeLinejoin="round">
          {parts.map((p, k) => (<tspan key={k} fill={k % 2 === 1 ? '#ffd21f' : '#ffffff'}>{p}</tspan>))}
        </text>
      </g>
    </svg>
  );
}
export const FactoBR: React.FC<{which: string}> = ({which}) => {
  useFonts();
  const t = useCurrentFrame() / FPS_BR;
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <OffthreadVideo src={staticFile(`br-${which}.mp4`)} />
      {!(which === 'mosquito2' && t > 15.8) && <Caption t={t} lines={LINES[which]} />}
    </AbsoluteFill>
  );
};
