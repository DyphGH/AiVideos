# Regras deste repositório (AiVideos)

- Este repositório é a fonte de verdade dos vídeos do Daniel (2 Factos + 30 dias pra salvar a oficina).
- Antes de criar ou mudar um vídeo, ver primeiro o que já existe aqui (`remotion/art-src`, `remotion/src`, `roteiros/`, `capas/`, `sfx/`).
- Tudo o que for criado de novo (código/arte, composições, vozes, roteiros, capas, sons) vai para este repositório: commit + push para `main` no fim de cada trabalho.
- Os MP4 finais só vão para o git quando o Daniel pedir explicitamente (pasta `videos/`); por defeito vão para a pasta do PC `AiVideos\videos\...` (2-factos / oficina / stories).
- Depois de mudar `remotion/art-src/*.js`, correr `sh build-art.sh` para regenerar `remotion/src/art.js`.
- Regras de conteúdo (hook, retenção, duração) estão na memória do utilizador (`/topics/shorts-regras.md`).

## Regra de publicação Hit0Ms (pedida pelo Daniel a 26/11/2026 — sobrepõe-se a pub.ig e às horas dos pedidos)
- No máximo **2 vídeos Hit0Ms por dia**: um às **12:00** e outro às **18:00** (Lisboa).
- Instagram: o das **12:00** sai como **REEL normal** (aparece aos seguidores); o das **18:00** sai como **TRIAL_REEL** (só não-seguidores).
- Facebook (REEL), TikTok e YouTube: **os dois saem normais** nas duas horas.
- Story com link (+30 min): só para o reel normal das 12:00 (o trial não aparece aos seguidores, não faz sentido mandá-los lá).
- Se um pedido Hit0Ms vier para outra hora (ex.: 15:00), agenda-o na vaga livre (12:00 ou 18:00) desse dia ou do dia seguinte e diz isso na nota.
- Os desafios em imagem do Facebook não contam para este limite.

## Agentes (pedido do Daniel a 26/11/2026)
- As instruções das tarefas agendadas estão em `agentes/` (`agentes-da-manha.txt` às 06:00, `oficina.txt` de hora a hora). Para mudar o comportamento, muda estes ficheiros (as tarefas leem-nos do GitHub em cada ronda).
- Por dia, sozinhos: 2 Hit0Ms (12:00 e 18:00) prontos a aprovar + 1 guião 2 Factos verificado à espera da voz. Nada sai sem o Daniel carregar em ✓ Aprovar no Estúdio (estado "pronto" → "aprovado"/"agendado").
- Pesquisa: contas do nicho (lista em estado/agentes.espiar, editável na página) + as contas dele. Na 2 Factos nunca repetir um tema que ele já fez.
- Hit0Ms tem dois formatos: "queda" (`hit0ms/engine/vNN`) e "aprox" (`hit0ms/aprox`, ver README — agulha → balão e afins).
