// Episódio 6 (Dia 6). Ajusta aos tempos da voz final.
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [
  {name: 'f6abre', start: 0, end: 3, captionY: 1860},
  {name: 'f6contexto', start: 3, end: 7.6, captionY: 1820},
  {name: 'f6kleber', start: 7.6, end: 9.9, captionY: 1820},
  {name: 'f6promo', start: 9.9, end: 15, captionY: 1880},
  {name: 'f6vazio', start: 15, end: 19, captionY: 860},
  {name: 'f6noite', start: 19, end: 25.5, captionY: 1880},
  {name: 'f6audio', start: 25.5, end: 32, captionY: 1880},
  {name: 'f6chave', start: 32, end: 36, captionY: 1800},
  {name: 'f6votacao', start: 36, end: 41, captionY: 1310},
];
export const DURATION2 = 41;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.0, end: 2.9, chunks: ['ELE RECUSOU', '*40 MIL*', 'POR CAUSA', '*DISSO*']},
  {start: 3.1, end: 7.5, chunks: ['O NANDO', 'TEM 25 DIAS', 'PRA PAGAR', '*81 MIL*', 'OU PERDE', 'A OFICINA']},
  {start: 10.0, end: 14.2, chunks: ['NO DIA', 'SEGUINTE', 'O KLÉBER', 'SE *VINGOU*', 'ÓLEO', 'A *NOVE E NOVENTA*']},
  {start: 15.1, end: 17.3, chunks: ['DEZESSETE', 'CLIENTES', '*SUMIRAM*']},
  {start: 19.1, end: 22.3, chunks: ['À NOITE', 'SOZINHO', 'ELE LEVANTOU', 'SÓ UMA *PONTA*']},
  {start: 32.2, end: 33.3, chunks: ['A *LATA*', 'DE BISCOITO']},
  {start: 36.2, end: 39.0, chunks: ['USA A CHAVE', 'HOJE', 'OU *ESPERA?*', 'COMENTA!']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
