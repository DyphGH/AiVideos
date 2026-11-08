# 30 dias pra salvar a oficina — projeto Remotion

## Instalar
npm install

## Ver no estúdio
npx remotion studio src/index.ts

## Renderizar
npx remotion render src/index.ts Ep1 out/ep1.mp4

## Juntar a voz e a música
- Põe a narração em `public/voz.mp3` e (opcional) a música em `public/musica.mp3`.
  O vídeo usa-as automaticamente (música a 18% de volume).
- Ajusta os tempos de cada plano e de cada legenda em `src/timeline.ts`
  para baterem com a voz.

## Arte
- As personagens e cenários estão em `art-src/` (SVG gerado em código):
  `nando.js`, `chars.js` (Tio Zé, Nandinho, Seu Armando, Turbo), `scene.js`, `common.js` (HUD/legenda)
  e `shots-anim.js` (os 10 planos animados).
- Depois de mexer em `art-src/`, corre `./build-art.sh` (gera `src/art.js`).
