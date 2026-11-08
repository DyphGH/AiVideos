// Episódio 5 (Dia 5) — "O golpe e a lona". Ajusta aos tempos da voz final.
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [
  {name: 'e5golpe', start: 0, end: 3, captionY: 1820},
  {name: 'e5gleeb', start: 3, end: 7, captionY: 1700},
  {name: 'e5lona', start: 7, end: 10, captionY: 1250},
  {name: 'e5chamada', start: 10, end: 17, captionY: 1880},
  {name: 'e5grito', start: 17, end: 22, captionY: 1850},
  {name: 'e5desligou', start: 22, end: 24, captionY: 1780},
  {name: 'e5turbo', start: 24, end: 31, captionY: 1820},
  {name: 'e5porta', start: 31, end: 35, captionY: 1820},
  {name: 'e5oferta', start: 35, end: 42, captionY: 1890},
  {name: 'e5votacao', start: 42, end: 48, captionY: 1310},
];
export const DURATION2 = 48;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.0, end: 2.9, chunks: ['O INFLUENCER', 'DOS DOIS *MILHÕES*', 'TINHA', '*DOIS MIL*']},
  {start: 3.1, end: 6.9, chunks: ['E UM DE VOCÊS', 'DESCOBRIU', 'ANTES DE', '*TODO MUNDO*']},
  {start: 7.1, end: 9.9, chunks: ['MAS VOCÊS', 'QUERIAM', 'OUTRA COISA:', 'A *LONA!*']},
  {start: 10.1, end: 13.1, chunks: ['SÓ TINHA', 'UM PROBLEMA...', 'O *PAI*']},
  {start: 22.1, end: 23.9, chunks: ['ELE *DESLIGOU*', 'NA CARA DELE']},
  {start: 24.1, end: 30.9, chunks: ['AÍ O TURBO', 'RESOLVEU', '*SOZINHO*']},
  {start: 31.1, end: 34.9, chunks: ['E *ALGUÉM*', 'VIU']},
  {start: 42.1, end: 47.9, chunks: ['METADE', 'DA DÍVIDA...', 'OU O QUE TEM', 'DEBAIXO', 'DA *LONA?*', 'COMENTA!']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
