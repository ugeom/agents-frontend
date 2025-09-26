// Controls
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

import { createAndInject } from '../../inject';

export interface ControlDependencies {
	PointerLockControls: typeof PointerLockControls;
	FirstPersonControls: typeof FirstPersonControls;
	FlyControls: typeof FlyControls;
	MapControls: typeof MapControls;
	DragControls: typeof DragControls;
}

export const injectControlDependencies = (): ControlDependencies => createAndInject({
	PointerLockControls,
	FirstPersonControls,
	FlyControls,
	MapControls,
	DragControls
});