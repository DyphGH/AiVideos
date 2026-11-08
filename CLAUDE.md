# Regras deste repositório (AiVideos)

- Este repositório é a fonte de verdade dos vídeos do Daniel (2 Factos + 30 dias pra salvar a oficina).
- Antes de criar ou mudar um vídeo, ver primeiro o que já existe aqui (`remotion/art-src`, `remotion/src`, `roteiros/`, `capas/`, `sfx/`).
- Tudo o que for criado de novo (código/arte, composições, vozes, roteiros, capas, sons) vai para este repositório: commit + push para `main` no fim de cada trabalho.
- Os MP4 finais NÃO vão para o git (pesados, estão no `.gitignore`); vão para a pasta do PC `AiVideos\videos\...` (2-factos / oficina / stories).
- Depois de mudar `remotion/art-src/*.js`, correr `sh build-art.sh` para regenerar `remotion/src/art.js`.
- Regras de conteúdo (hook, retenção, duração) estão na memória do utilizador (`/topics/shorts-regras.md`).
