# Hit0Ms · motor "aprox" (pause at 0ms before it pops/breaks)

Uma coisa aproxima-se devagar de outra hiper-realista (agulha → balão, dardo → balão, martelo → copo de vidro, faca → melancia, pé → bolha de sabão…). A pessoa tem de pausar no frame exato do toque (0ms). Nesse frame — e só nesse — aparece a palavra secreta (impressa no objeto) e o cartão "Comment WORD to prove it". Depois rebenta/parte, rewind e o nível seguinte é mais rápido. 4 níveis, loop perfeito.

## Duas maneiras
- **3D realista (preferida, `v02-agulha-balao-3d`)**: three.js dentro do config.js (`npm i` nesta pasta instala o three; o render.js serve-o em /three/). A agulha encosta e ENTRA na borracha: cratera à volta da ponta + rugas de tensão que crescem, a palavra secreta aparece impressa no balão no frame antes de rebentar (0ms), depois rasga (2-3 frames) e rebenta em pedaços de borracha. Render ~1 s por frame (WebGL por software).
- 2D em canvas (`v01-agulha-balao`): mais rápido, menos realista.

## Fazer um vídeo novo
1. `mkdir vNN-nome && cp -r v01-agulha-balao/fonts vNN-nome/` e escreve `vNN-nome/config.js` (usa o `v01-agulha-balao/config.js` como modelo):
   - `export default (K)=>{… return {tag, h2, ask, askStyle?, attempts:[{word,…} ×4], draw(st)}}`
   - `K` = `{c, W, H, lin, rad, ell, ease, inout, rnd, setSeed}`.
   - `draw(st)` desenha a cena inteira para um frame. `st.phase`:
     - `approach` (`st.u` de 0 a 1: a coisa vem a chegar),
     - `contact` (frame do 0ms: mostra a palavra secreta no objeto e uma covinha/marca do toque),
     - `after` (`st.t` segundos depois: rebenta/parte, com tremor),
     - `rewind` (`st.u` de 1 a 0: volta atrás, objeto inteiro),
     - `next` (`st.w` de 0 a 1: aparece o objeto do nível seguinte).
   - `st.i` = índice da tentativa (0-3), `st.f`/`st.fps` para animações.
   - Realismo: gradientes radiais com luz de cima à esquerda, reflexo especular nítido (janela), luz de recorte, sombra desfocada no chão, grão no fundo. Fundo fixo desenhado uma vez num canvas.
2. `python3 mktl.py vNN-nome [s1 s2 s3 s4]` — segundos de aproximação por nível (padrão 2.2 1.6 1.15 0.8).
3. Frame check: `node render.js vNN-nome test <frames>` — os frames do toque são impressos pelo mktl.py. Vê os JPG e corrige o que estiver partido (o toque tem de ser mesmo no contorno: usa `isPointInPath` como no v01).
4. `node render.js vNN-nome video` → `video_tmp.mp4`; `python3 audio.py vNN-nome` → `audio.wav`.
5. Mux: `ffmpeg -i vNN-nome/video_tmp.mp4 -i vNN-nome/audio.wav -t <total/30> -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -af loudnorm=I=-14:TP=-1.5 -movflags +faststart videos/hit0ms/hit0ms-aprox-NN-nome.mp4`
6. Capa: frame do 0ms limpo (`node render.js vNN-nome clean <frame>`) + `scratchpad/hcover.js` ou texto grande "PAUSE AT 0ms".

Ideias de cenas: agulha → balão (v01), dardo → balão de água, martelo → copo de vidro, faca → melancia, prego → pneu, pé → bolha de sabão, tesoura → fio esticado, bola → castelo de cartas, gota → fósforo, lápis → bolha de pastilha elástica.
