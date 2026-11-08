import React from 'react';
import {Composition} from 'remotion';
import {Ep1, EP1_FRAMES} from './Ep1';
import {Ep2, EP2_FRAMES} from './Ep2';
import {Ep2b, EP2B_FRAMES} from './Ep2b';
import {Ep3, EP3_FRAMES} from './Ep3';
import {Ep4, EP4_FRAMES} from './Ep4';
import {Ep5, EP5_FRAMES} from './Ep5';
import {Ep6, EP6_FRAMES} from './Ep6';
import {Ep7, EP7_FRAMES} from './Ep7';
import {FactoPe, PE_FRAMES, FPS_PE} from './FactoPe';
import {FactoOlho, OLHO_FRAMES, FPS_OLHO} from './FactoOlho';
import {FactoLer, LER_FRAMES, FPS_LER} from './FactoLer';
import {FactoBR, DUR_BR, FPS_BR} from './FactoBR';
import {Story3, STORY3_FRAMES} from './Story3';
import {Story4, STORY4_FRAMES} from './Story4';
import {Story6, STORY6_FRAMES} from './Story6';
import {FPS} from './timeline';

export const Root: React.FC = () => (
  <>
    <Composition id="Ep1" component={Ep1} durationInFrames={EP1_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep2" component={Ep2} durationInFrames={EP2_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep2b" component={Ep2b} durationInFrames={EP2B_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep3" component={Ep3} durationInFrames={EP3_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Story3" component={Story3} durationInFrames={STORY3_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep4" component={Ep4} durationInFrames={EP4_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Story4" component={Story4} durationInFrames={STORY4_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep5" component={Ep5} durationInFrames={EP5_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="FactoPe" component={FactoPe} durationInFrames={PE_FRAMES} fps={FPS_PE} width={1080} height={1920} />
    <Composition id="Ep6" component={Ep6} durationInFrames={EP6_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep7" component={Ep7} durationInFrames={EP7_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Story6" component={Story6} durationInFrames={STORY6_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="FactoOlho" component={FactoOlho} durationInFrames={OLHO_FRAMES} fps={FPS_OLHO} width={1080} height={1920} />
    <Composition id="FactoMosquitoBR" component={FactoBR as any} defaultProps={{which: 'mosquito'}} durationInFrames={Math.round(DUR_BR.mosquito*FPS_BR)} fps={FPS_BR} width={1080} height={1920} />
    <Composition id="FactoCerebroBR" component={FactoBR as any} defaultProps={{which: 'cerebro'}} durationInFrames={Math.round(DUR_BR.cerebro*FPS_BR)} fps={FPS_BR} width={1080} height={1920} />
    <Composition id="FactoLer" component={FactoLer} durationInFrames={LER_FRAMES} fps={FPS_LER} width={1080} height={1920} />
  </>
);
