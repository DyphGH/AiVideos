// Story do episódio 3 — tempos acertados à voz do Gabriel (11,2 s)
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [{name: 'story3', start: 0, end: 11.8, captionY: 1820}];
export const DURATION2 = 11.8;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.0, end: 1.95, chunks: ['O EPISÓDIO 3', 'JÁ TÁ *NO AR!*']},
  {start: 2.05, end: 3.4, chunks: ['É SÓ CLICAR', 'NO *LINK* AQUI']},
  {start: 3.6, end: 6.3, chunks: ['NO PRÓXIMO', 'EPISÓDIO', 'O SEU', '*COMENTÁRIO*', 'PODE APARECER']},
  {start: 6.4, end: 9.0, chunks: ['O MAIS', 'ENGRAÇADO', 'VAI APARECER', '*COM CERTEZA!*']},
  {start: 9.1, end: 11.4, chunks: ['MAS NÃO', 'ESQUECE', 'DE *VOTAR*', 'HEIN!']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
