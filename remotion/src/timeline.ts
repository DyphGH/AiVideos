// Episódio 1 — linha de tempo (segundos). Ajusta aqui quando tiveres a voz final.
export const FPS = 30;

export type Shot = {name: string; start: number; end: number; captionY: number};

export const SHOTS: Shot[] = [
  {name: 'penhora', start: 0, end: 1.2, captionY: 1700},
  {name: 'fachada', start: 1.2, end: 5.2, captionY: 1300},
  {name: 'flashback', start: 5.2, end: 8.6, captionY: 1250},
  {name: 'callcenter', start: 8.6, end: 11.4, captionY: 1600},
  {name: 'praia', start: 11.4, end: 17.6, captionY: 1180},
  {name: 'lista', start: 17.6, end: 21.4, captionY: 1560},
  {name: 'corsa', start: 21.4, end: 24.2, captionY: 1480},
  {name: 'armando', start: 24.2, end: 28, captionY: 1560},
  {name: 'speedfix', start: 28, end: 31.6, captionY: 1420},
  {name: 'lonas', start: 31.6, end: 36.6, captionY: 900},
  {name: 'votacao', start: 36.6, end: 42, captionY: 1130},
];

export const DURATION = 42;

// Legendas: blocos de 1–3 palavras; *palavra* = destaque.
type Line = {start: number; end: number; chunks: string[]};
export const LINES: Line[] = [
  {start: 0.1, end: 5.1, chunks: ['O NANDO TEM', '*30 DIAS*', 'PRA PAGAR', '*87 MIL*', 'OU PERDE', 'A *OFICINA*', 'DO PAI']},
  {start: 5.3, end: 8.5, chunks: ['DESDE', 'CRIANÇA', 'O *SONHO*', 'DELE ERA ESSE']},
  {start: 8.7, end: 11.3, chunks: ['MAS A VIDA', 'LEVOU ELE', 'PRA OUTRO LUGAR', '*10 ANOS*', 'DE CALL CENTER']},
  {start: 11.5, end: 15.3, chunks: ['ATÉ QUE O PAI', 'SE *APOSENTOU*', 'DO NADA', 'E FOI', 'PRA *PRAIA*']},
  {start: 15.6, end: 17.5, chunks: ['FICA COM', 'A OFICINA', 'E NÃO MEXE', 'NAS *LONAS*']},
  {start: 17.7, end: 21.3, chunks: ['DEIXOU TUDO', 'PRO NANDO', 'INCLUSIVE', 'A *DÍVIDA*']},
  {start: 21.5, end: 24.1, chunks: ['UM CORSA', 'NO ELEVADOR', 'ESPERANDO PEÇA', 'DESDE *2019*']},
  {start: 24.3, end: 27.9, chunks: ['CLIENTE FIXO?', 'SÓ UM', 'O SEU ARMANDO', 'QUE PAGA', 'EM *OVOS*']},
  {start: 28.1, end: 31.5, chunks: ['E DO OUTRO', 'LADO DA RUA', 'ABRIU', '*ISSO*']},
  {start: 31.8, end: 36.5, chunks: ['TRÊS CARROS', '*COBERTOS*', 'NINGUÉM SABE', 'O QUE TEM', '*EMBAIXO*']},
  {start: 36.8, end: 41.9, chunks: ['POR ONDE', 'COMEÇA?', '*VOCÊ*', 'DECIDE']},
];

// Título fixo no topo — desligado (a fachada já tem a faixa "30 DIAS PRA SALVAR A OFICINA")
export const TITLE = {start: 0, end: 0, text: ''};
