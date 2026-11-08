# AiVideos

Vídeos curtos animados feitos em código (Remotion + arte SVG desenhada em JavaScript).

- **2 Factos** — factos curiosos em PT-PT (Instagram, TikTok, YouTube Shorts)
- **30 dias pra salvar a oficina** — série interativa em PT-BR (@salvaaoficina), votação nos comentários

## Pastas

| Pasta | O que tem |
|---|---|
| `remotion/` | Projeto Remotion: composições (`src/`), arte em código (`art-src/`), vozes e fontes (`public/`) |
| `capas/` | Capas e miniaturas |
| `roteiros/` | Narrações dos episódios e das stories |
| `sfx/` | Efeitos sonoros (boom, whoosh, riser, ticks) |

## Como gerar um vídeo

```bash
cd remotion
npm install
sh build-art.sh                      # junta art-src/*.js em src/art.js
npx remotion studio                  # pré-visualizar
npx remotion render src/index.ts FactoLer out/factos-ler.mp4
```

Composições: `Ep1`–`Ep6`, `Ep2b` (oficina), `FactoPe`, `FactoOlho`, `FactoLer` (2 Factos), `Story3`, `Story4`, `Story6`.

## Áudio final

Os sons entram nas pausas da voz com ducking (sidechaincompress) e o volume final é normalizado a −14 LUFS / −1 dBTP (loudnorm em 2 passagens, ffmpeg).

Os MP4 finais não estão no repositório (são pesados); ficam na pasta local.
