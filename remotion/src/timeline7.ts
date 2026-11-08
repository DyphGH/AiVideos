// Episódio 7 (Dia 7). Tempos acertados à voz final (public/voz7.mp3).
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [
  {name: 'g7chave', start: 0, end: 2.95, captionY: 1860},
  {name: 'g7votos', start: 2.95, end: 5.85, captionY: 1860},
  {name: 'g7conta', start: 5.85, end: 8.5, captionY: 1840},
  {name: 'g7gol', start: 8.5, end: 10.2, captionY: 1880},
  {name: 'g7cliente', start: 10.2, end: 14.55, captionY: 1880},
  {name: 'g7nando', start: 14.55, end: 17.1, captionY: 1860},
  {name: 'g7grana', start: 17.1, end: 22.55, captionY: 1880},
  {name: 'g7lona', start: 22.55, end: 25.75, captionY: 1880},
  {name: 'g7prova', start: 25.75, end: 27.7, captionY: 1820},
  {name: 'g7votacao', start: 27.7, end: 33.6, captionY: 1310},
];
export const DURATION2 = 33.6;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.12, end: 2.81, chunks: ['ELE TINHA', 'A *CHAVE*', 'E GUARDOU', 'DE *VOLTA*']},
  {start: 3.18, end: 5.86, chunks: ['*62%*', 'MANDARAM', '*ESPERAR*']},
  {start: 6.0, end: 8.47, chunks: ['24 DIAS', '*81 MIL*', 'SÓ 4', 'CLIENTES']},
  {start: 8.57, end: 9.96, chunks: ['UM GOL', 'SOLTANDO *FUMAÇA*']},
  {start: 10.2, end: 14.43, chunks: ['TROCA DE', '*9,90*', 'NO KLÉBER', 'E AGORA', 'O MOTOR', 'TÁ *BATENDO!*']},
  {start: 14.55, end: 16.98, chunks: ['ELE BOTOU', 'ÓLEO', '*ERRADO!*']},
  {start: 17.16, end: 22.41, chunks: ['MIL E', '*DUZENTOS*', 'DE CONSERTO', 'E TROUXE', 'MAIS *CINCO!*']},
  {start: 22.63, end: 25.5, chunks: ['E ESSE CARRO', 'DEBAIXO', 'DA LONA', '*TÁ À VENDA?*']},
  {start: 25.81, end: 27.5, chunks: ['MAS ELE', 'GUARDOU', 'UMA *PROVA*']},
  {start: 27.74, end: 31.8, chunks: ['POSTA', 'E *EXPÕE*', 'O KLÉBER', 'OU FICA', '*QUIETO?*']},
  {start: 32.1, end: 32.9, chunks: ['*COMENTA!*']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
