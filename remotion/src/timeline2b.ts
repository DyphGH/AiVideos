// Episódio 2 (versão 2: 3 tentativas + Kléber). Ajusta aos tempos da voz final.
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [
  {name: 'b2abre', start: 0, end: 2.2, captionY: 1780},
  {name: 'b2market', start: 2.2, end: 8.2, captionY: 1760},
  {name: 'b2ferro', start: 8.2, end: 13.2, captionY: 1790},
  {name: 'b2etiqueta', start: 13.2, end: 20.2, captionY: 1770},
  {name: 'b2turbo', start: 20.2, end: 26.2, captionY: 1790},
  {name: 'b2whats', start: 26.2, end: 32.2, captionY: 1780},
  {name: 'b2banco', start: 32.2, end: 38.2, captionY: 1810},
  {name: 'b2kleber', start: 38.2, end: 45.2, captionY: 1790},
  {name: 'b2votacao', start: 45.2, end: 50.5, captionY: 1110},
];
export const DURATION2 = 50.5;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.1, end: 2.1, chunks: ['VOCÊS ESCOLHERAM', 'VENDER', 'AS *PEÇAS!*']},
  {start: 2.3, end: 5.6, chunks: ['PRIMEIRA', 'TENTATIVA:', 'ANÚNCIO', 'NA INTERNET', '*TRÊS MIL*']},
  {start: 5.6, end: 8.1, chunks: ['E A PRIMEIRA', 'OFERTA FOI...', '*CINQUENTA*']},
  {start: 8.3, end: 13.1, chunks: ['SEGUNDA', 'TENTATIVA:', 'FERRO-VELHO', '*OITENTA*', 'REAIS', 'PELO CARRO', '*INTEIRO*']},
  {start: 13.3, end: 17.4, chunks: ['TERCEIRA', 'TENTATIVA:', 'ARRANCAR', 'AS PEÇAS', 'SÓ QUE AÍ', 'ELE ACHOU *ISSO*']},
  {start: 17.8, end: 20.1, chunks: ['O CORSA', 'NÃO ERA', '*DELE!*']},
  {start: 20.3, end: 26.1, chunks: ['E A PEÇA', 'QUE FALTAVA?', 'TAVA EMBAIXO', 'DO *TURBO*', 'VINTE MINUTOS', 'DEPOIS...']},
  {start: 29.8, end: 32.1, chunks: ['A DONA *PAGOU!*', 'PRIMEIRO', '*CLIENTE!*']},
  {start: 32.3, end: 38.1, chunks: ['ATÉ O BANCO', '*LIGAR*', 'JUROS', 'DE ATRASO:', '*DOIS MIL*', 'REAIS']},
  {start: 39.2, end: 42.6, chunks: ['VOCÊ TAVA', 'COM O CARRO', 'DA MINHA *MÃE*', 'DESDE *2019?!*']},
  {start: 42.8, end: 45.1, chunks: ['A DONA CIDA', 'É MÃE', 'DO *KLÉBER*']},
  {start: 45.3, end: 50.4, chunks: ['E AGORA?', 'PEDIR', '*DESCULPA*', 'OU', '*ENFRENTAR?*', 'COMENTA!']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
