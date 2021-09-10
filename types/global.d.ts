import type { _Electron } from './electron/index';

export {};

declare global {
    interface Window {
        electronBridge: {
            api: _Electron.api
        }
    }
}
