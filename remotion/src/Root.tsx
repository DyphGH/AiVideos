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
import {FactoMosq3, MQ3_FRAMES, FPS_MQ3} from './FactoMosq3';
import {FactoTendao, TD_FRAMES, FPS_TD} from './FactoTendao';
import {FactoGta, GTA_FRAMES, FPS_GTA} from './FactoGta';
import {FactoLerBR, LERBR_FRAMES, FPS_LERBR} from './FactoLerBR';
import {FactoBocejo, BOC_FRAMES, FPS_BOC} from './FactoBocejo';
import {FactoBocejoB, BOCB_FRAMES, FPS_BOCB} from './FactoBocejoB';
import {FactoBocejoC, BOCC_FRAMES, FPS_BOCC} from './FactoBocejoC';
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
    <Composition id="FactoMosquito2BR" component={FactoBR as any} defaultProps={{which: 'mosquito2'}} durationInFrames={Math.round(DUR_BR.mosquito2*FPS_BR)} fps={FPS_BR} width={1080} height={1920} />
    <Composition id="FactoCerebroBR" component={FactoBR as any} defaultProps={{which: 'cerebro'}} durationInFrames={Math.round(DUR_BR.cerebro*FPS_BR)} fps={FPS_BR} width={1080} height={1920} />
    <Composition id="FactoBocejo" component={FactoBocejo} durationInFrames={BOC_FRAMES} fps={FPS_BOC} width={1080} height={1920} />
    <Composition id="FactoBocejoB" component={FactoBocejoB} durationInFrames={BOCB_FRAMES} fps={FPS_BOCB} width={1080} height={1920} />
    <Composition id="FactoBocejoC" component={FactoBocejoC} durationInFrames={BOCC_FRAMES} fps={FPS_BOCC} width={1080} height={1920} />
    <Composition id="FactoLerBR" component={FactoLerBR} durationInFrames={LERBR_FRAMES} fps={FPS_LERBR} width={1080} height={1920} />
    <Composition id="FactoMosq3" component={FactoMosq3} durationInFrames={MQ3_FRAMES} fps={FPS_MQ3} width={1080} height={1920} />
    <Composition id="FactoTendao" component={FactoTendao} durationInFrames={TD_FRAMES} fps={FPS_TD} width={1080} height={1920} />
    <Composition id="FactoGta" component={FactoGta} durationInFrames={GTA_FRAMES} fps={FPS_GTA} width={1080} height={1920} />
    <Composition id="FactoLer" component={FactoLer} durationInFrames={LER_FRAMES} fps={FPS_LER} width={1080} height={1920} />
  </>
);
