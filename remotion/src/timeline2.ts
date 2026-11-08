// Episódio 2 — linha de tempo (segundos). Ajusta aqui quando tiveres a voz final.
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [
  {name: 'e2escolha', start: 0, end: 2.5, captionY: 1760},
  {name: 'e2po', start: 2.5, end: 7, captionY: 1150},
  {name: 'e2capo', start: 7, end: 11, captionY: 1760},
  {name: 'e2turbo', start: 11, end: 15, captionY: 1150},
  {name: 'e2motor', start: 15, end: 20, captionY: 960},
  {name: 'e2whats', start: 20, end: 26, captionY: 1700},
  {name: 'e2festa', start: 26, end: 31, captionY: 1780},
  {name: 'e2banco', start: 31, end: 37, captionY: 1820},
  {name: 'e2queda', start: 37, end: 40, captionY: 1600},
  {name: 'e2rubinho', start: 40, end: 43, captionY: 1720},
  {name: 'e2votacao', start: 43, end: 48, captionY: 1110},
];
export const DURATION2 = 48;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.1, end: 2.4, chunks: ['VOCÊS', 'ESCOLHERAM:', 'VENDER', 'AS *PEÇAS*']},
  {start: 2.6, end: 6.9, chunks: ['SÓ TINHA', 'UM PROBLEMA:', 'O CORSA', 'NÃO ERA *DELE*']},
  {start: 7.1, end: 10.9, chunks: ['E NO CAPÔ', 'ELE DESCOBRIU', 'POR QUE', 'NUNCA SAIU:', 'FALTAVA UMA *PEÇA*']},
  {start: 11.1, end: 14.9, chunks: ['ELA TAVA AQUI', 'O TEMPO TODO', 'EMBAIXO', 'DO *TURBO*']},
  {start: 15.1, end: 19.9, chunks: ['SETE ANOS', 'PARADO', '*VINTE MINUTOS*', 'DE SERVIÇO']},
  {start: 20.1, end: 21.8, chunks: ['E A DONA', '*PAGOU!*']},
  {start: 26.1, end: 29.1, chunks: ['DIA BOM', 'NÉ?', 'ATÉ O', 'TELEFONE', '*TOCAR*']},
  {start: 31.1, end: 36.9, chunks: ['JUROS', 'DE ATRASO', '*DOIS MIL*', 'REAIS']},
  {start: 37.1, end: 39.9, chunks: ['E TÁ DEVENDO', '*MAIS*', 'QUE ONTEM']},
  {start: 40.1, end: 42.9, chunks: ['AÍ CHEGOU', 'O *RUBINHO*']},
  {start: 43.1, end: 47.9, chunks: ['O QUE', 'O NANDO FAZ?', 'COMENTA:', '*VIRALIZAR*', 'OU *COBRAR*']},
];
// Título fixo no topo (0–3 s) + linha pequena para quem não viu o episódio 1
export const TITLE2 = {start: 0, end: 3, text: 'ELE CONSERTOU UM CARRO PARADO DESDE 2019', sub: 'deve R$ 87.400 em 30 dias'};
