// App imports
import { createAndInject } from '../../inject';

// Third-party imports
import { LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper.js';
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper.js';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js';
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';

export interface HelperDependencies {
	LightProbeHelper: typeof LightProbeHelper;
	OctreeHelper: typeof OctreeHelper;
	SVGRenderer: typeof SVGRenderer;
	CSS3DRenderer: typeof CSS3DRenderer;
	CSS3DObject: typeof CSS3DObject;
	CSS3DSprite: typeof CSS3DSprite;
	GPUComputationRenderer: typeof GPUComputationRenderer;
}

export const injectHelperDependencies = (): HelperDependencies => createAndInject({
	LightProbeHelper,
	OctreeHelper,
	SVGRenderer,
	CSS3DRenderer,
	CSS3DObject,
	CSS3DSprite,
	GPUComputationRenderer
});