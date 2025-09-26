// App imports
import { createAndInject } from '../../inject';

// Third-party imports
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect.js';
import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import { LensflareMesh } from 'three/examples/jsm/objects/LensflareMesh.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';

export interface EffectDependencies {
	ParallaxBarrierEffect: typeof ParallaxBarrierEffect;
	AnaglyphEffect: typeof AnaglyphEffect;
	StereoEffect: typeof StereoEffect;
	Water: typeof Water;
	Sky: typeof Sky;
	Lensflare: typeof Lensflare;
	LensflareElement: typeof LensflareElement;
	LensflareMesh: typeof LensflareMesh;
	AsciiEffect: typeof AsciiEffect;
	OutlineEffect: typeof OutlineEffect;
}

export const injectEffectDependencies = (): EffectDependencies => createAndInject({
	ParallaxBarrierEffect,
	AnaglyphEffect,
	StereoEffect,
	Water,
	Sky,
	Lensflare,
	LensflareElement,
	LensflareMesh,
	AsciiEffect,
	OutlineEffect,
});