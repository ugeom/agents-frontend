// App imports
import { createAndInject } from '../../inject';

// Third-party imports
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export interface PostProcessingDependencies {
	EffectComposer: typeof EffectComposer;
	RenderPass: typeof RenderPass;
	ShaderPass: typeof ShaderPass;
	UnrealBloomPass: typeof UnrealBloomPass;
}

export const injectPostProcessingDependencies = (): PostProcessingDependencies => createAndInject({
	EffectComposer,
	RenderPass,
	ShaderPass,
	UnrealBloomPass
});