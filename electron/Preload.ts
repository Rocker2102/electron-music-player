import { ipcRenderer, contextBridge } from 'electron';
import * as mm from 'music-metadata';

import config from './Config';
import { pictureAsBase64 } from './Utils';

import { _Mm } from '../types/music-metadata';

contextBridge.exposeInMainWorld('electronBridge', {
    config,
    api: {
        send: (channel: _Electron.channel, data: _Electron.sendData) => {
            ipcRenderer.send(config.CHANNELS[channel], data);
        },
        receive: (channel: _Electron.channel, handler: _Electron.receiverHandler) => {
            ipcRenderer.on(config.CHANNELS[channel], (...args) => handler(...args));
        }
    },
    getCoverImage: async (fileLocation: string): Promise<string | null> => {
        try {
            const metadata: mm.IAudioMetadata = await mm.parseFile(fileLocation);
            const picture: _Mm._IPicture | null
                    = pictureAsBase64(mm.selectCover(metadata?.common?.picture) ?? null);
            return picture?.data ?? null;
        } catch (e) {
            console.log(e);
        }

        return null;
    }
});
