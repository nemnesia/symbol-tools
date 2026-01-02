// this file contains implementation details and is not intended to be used directly

import ed25519_js from './ed25519_js.js';

let ed25519;
export default {
	get: () => {
		if (!ed25519)
			ed25519 = ed25519_js;

		return ed25519_js;
	},
	unload: () => {
		ed25519 = undefined;
	}
};
