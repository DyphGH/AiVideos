// Episódio 3 (Dia 3). Ajusta aos tempos da voz final.
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [
  {name: 'c3votos', start: 0, end: 4.5, captionY: 1700},
  {name: 'c3fortao', start: 4.5, end: 8, captionY: 1760},
  {name: 'c3loja', start: 8, end: 13, captionY: 1790},
  {name: 'c3humilha', start: 13, end: 17, captionY: 1780},
  {name: 'c3post', start: 17, end: 22, captionY: 1780},
  {name: 'c3coments', start: 22, end: 27.5, captionY: 1650},
  {name: 'c3fila', start: 27.5, end: 35, captionY: 1020},
  {name: 'c3kleber', start: 35, end: 39, captionY: 1790},
  {name: 'c3votacao', start: 39, end: 46, captionY: 1110},
];
export const DURATION2 = 46;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.1, end: 4.4, chunks: ['SETENTA E CINCO', 'POR CENTO', 'DE VOCÊS', 'MANDARAM', 'PEDIR *DESCULPA*']},
  {start: 4.6, end: 7.9, chunks: ['MAS TEVE', 'UM *FORTÃO*', 'QUE QUERIA', 'BATER NELE', '*KKKK*']},
  {start: 8.1, end: 12.9, chunks: ['PASSO UM:', 'ATRAVESSAR', 'A RUA', 'E O KLÉBER?', '*GRAVOU*', 'TUDO']},
  {start: 13.1, end: 16.9, chunks: ['"FALA', 'MAIS *ALTO!*"', 'E POSTOU', 'NA *INTERNET*']},
  {start: 17.1, end: 21.9, chunks: ['SÓ QUE', 'O VÍDEO', '*BOMBOU*', 'DO JEITO', '*ERRADO*']},
  {start: 22.1, end: 27.4, chunks: ['"ESSE MECÂNICO', 'É *HONESTO!*"', 'E A PRÓPRIA', 'DONA CIDA:', '"ELE É', 'UM *ANJO!*"']},
  {start: 27.6, end: 34.9, chunks: ['NO DIA', 'SEGUINTE...', '*FILA*', 'NA PORTA', 'SEIS', '*CLIENTES*', 'OITOCENTOS', 'E *CINQUENTA*', 'REAIS!']},
  {start: 41.5, end: 45.9, chunks: ['GRAVAR', 'COM O RUBINHO', 'OU SÓ', '*TRABALHAR?*', 'COMENTA!']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
