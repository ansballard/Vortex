import ExtensionManager from './ExtensionManager';

import {app as appIn, remote} from 'electron';
import Module = require('module');
import * as path from 'path';

const app = appIn || remote.app;

const extensionsPath = path.join(app.getPath('userData'), 'plugins');
import * as api from '../index';

/**
 * require wrapper to allow extensions to load modules from
 * the context of the main application
 * @param {any} orig
 * @returns
 */
function extensionRequire(orig) {
  const extensionPaths = ExtensionManager.getExtensionPaths();
  return function(id) {
    if (id === 'vortex-api') {
      return api;
    }
    if (extensionPaths.find(iter => this.filename.startsWith(iter)) !== undefined) {
      let res;
      try {
        res = require.main.require(id);
      } catch (err) {
        // nop, leave res undefined so orig gets tried
      }
      if (res === undefined) {
        res = orig.apply(this, arguments);
      }
      return res;
    } else {
      return orig.apply(this, arguments);
    }
  };
}

export default function() {
  const orig = (Module as any).prototype.require;
  (Module as any).prototype.require = extensionRequire(orig);
}
