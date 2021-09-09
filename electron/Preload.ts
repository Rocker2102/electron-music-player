import { ipcRenderer, contextBridge } from 'electron';
import config from './Config';
import type { CustomElectron } from '../types/electron';

contextBridge.exposeInMainWorld('electronBridge', {
    api: {
        send: (channel: CustomElectron.channel, data: CustomElectron.sendData) => {
            ipcRenderer.send(config.CHANNELS[channel], data);
        },
        receive: (channel: CustomElectron.channel, handler: CustomElectron.receiverHandler) => {
            ipcRenderer.on(config.CHANNELS[channel], (...args) => handler(...args));
        }
    },
    config
});
