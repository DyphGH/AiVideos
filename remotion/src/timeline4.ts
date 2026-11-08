// Episódio 4 (Dia 4) — "O vídeo". Ajusta aos tempos da voz final.
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [
  {name: 'd4abre', start: 0, end: 2.8, captionY: 1760},
  {name: 'd4votos', start: 2.8, end: 6.8, captionY: 1700},
  {name: 'd4ideia', start: 6.8, end: 10.5, captionY: 1760},
  {name: 'd4danca', start: 10.5, end: 15, captionY: 1780},
  {name: 'd4turbo', start: 15, end: 19, captionY: 1780},
  {name: 'd4uno', start: 19, end: 26.5, captionY: 1780},
  {name: 'd4clientes', start: 26.5, end: 32, captionY: 1880},
  {name: 'd4lona', start: 32, end: 38, captionY: 1780},
  {name: 'd4dm', start: 38, end: 43, captionY: 1780},
  {name: 'd4votacao', start: 43, end: 49, captionY: 1310},
];
export const DURATION2 = 49;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.0, end: 2.7, chunks: ['ESSE VÍDEO', 'TEVE *48 MIL*', 'VIEWS...', 'MAS OLHA', 'O *FUNDO*']},
  {start: 2.9, end: 6.7, chunks: ['E TUDO', 'COMEÇOU', 'COM VOCÊS:', '*GRAVAR*', 'GANHOU', 'COM 50%']},
  {start: 6.9, end: 10.4, chunks: ['E O SNTZ', 'DEU A IDEIA:', '"GRAVA ELE', '*TRABALHANDO*"']},
  {start: 10.6, end: 14.9, chunks: ['MAS O RUBINHO', 'QUIS FAZER', 'DO JEITO DELE', 'PRIMEIRO', 'UMA *DANCINHA*']},
  {start: 15.1, end: 18.9, chunks: ['DEPOIS', 'O DESAFIO', 'DO *TURBO*', 'CENTO', 'E QUARENTA', 'VIEWS']},
  {start: 19.1, end: 26.4, chunks: ['AÍ CHEGOU', 'O UNO', 'DO SEU ARMANDO', 'FUMAÇA', 'NO PORTA-LUVAS', 'O RUBINHO', 'SÓ FILMOU', '*QUARENTA', 'E OITO MIL*']},
  {start: 26.6, end: 31.9, chunks: ['O WHATSAPP', '*EXPLODIU*', 'QUATRO', 'CLIENTES', 'NOVOS', 'E O SEU', 'ARMANDO', 'PAGOU...', 'EM *OVOS*']},
  {start: 32.1, end: 35.3, chunks: ['MAS TODO MUNDO', 'REPAROU', 'NUMA COISA', 'NO FUNDO', 'DO VÍDEO']},
  {start: 38.1, end: 42.9, chunks: ['E AÍ', 'CHEGOU ISSO', 'DOIS *MILHÕES*', 'DE SEGUIDORES', 'SERÁ?']},
  {start: 43.1, end: 48.9, chunks: ['O INFLUENCER', 'OU CONVENCER', 'O PAI', 'A DESTAPAR', 'A *LONA?*', 'COMENTA!']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
