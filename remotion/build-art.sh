#!/bin/sh
# Junta as bibliotecas de arte num único módulo para o Remotion
cd "$(dirname "$0")"
{ echo "/* eslint-disable */"; cat art-src/nando.js art-src/common.js art-src/chars.js art-src/scene.js art-src/shots-anim.js art-src/shots-ep2.js art-src/shots-ep2b.js art-src/shots-ep3.js art-src/shots-story.js art-src/shots-ep4.js art-src/shots-ep4b.js art-src/shots-ep5.js art-src/shots-ep6.js art-src/shots-ep7.js art-src/factos-pe.js art-src/factos-olho.js art-src/factos-ler.js art-src/factos-bocejo.js art-src/factos-lerbr.js; echo "export {buildShot, buildFacto};"; } > src/art.js
