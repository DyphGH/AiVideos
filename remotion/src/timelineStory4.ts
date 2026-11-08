// Story do episódio 4 — tempos acertados à voz do Gabriel (11,65 s)
import type {Shot} from './timeline';
export const SHOTS2: Shot[] = [{name: 'story4', start: 0, end: 12.2, captionY: 1820}];
export const DURATION2 = 12.2;
type Line = {start: number; end: number; chunks: string[]};
export const LINES2: Line[] = [
  {start: 0.0, end: 2.1, chunks: ['O EPISÓDIO 4', 'JÁ TÁ *NO AR!*']},
  {start: 2.25, end: 3.5, chunks: ['É SÓ CLICAR', 'NO *LINK!*']},
  {start: 3.95, end: 6.6, chunks: ['E TODO MUNDO', 'QUER SABER', 'O QUE TEM', 'NA *LONA*']},
  {start: 6.6, end: 9.2, chunks: ['O SEU', '*COMENTÁRIO*', 'PODE APARECER', 'NO EP. 5']},
  {start: 9.4, end: 11.8, chunks: ['VOTA AÍ:', '*INFLUENCER*', 'OU *LONA?*']},
];
export const TITLE2 = {start: 0, end: 0, text: '', sub: ''};
