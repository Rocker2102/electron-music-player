import { ipcRenderer, contextBridge } from 'electron';
import config from './Config';

import type { _Electron } from '_Electron';

contextBridge.exposeInMainWorld('electronBridge', {
    config,
    api: {
        send: (channel: _Electron.channel, data: _Electron.sendData) => {
            ipcRenderer.send(config.CHANNELS[channel], data);
        },
        receive: (channel: _Electron.channel, handler: _Electron.receiverHandler) => {
            ipcRenderer.on(config.CHANNELS[channel], (...args) => handler(...args));
        }
    }
});
