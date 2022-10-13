import { app, BrowserWindow, ipcMain } from 'electron';
import * as mm from 'music-metadata';
import path = require('path');

import config from './Config';
import Main from './Main';
import { pictureAsBase64 } from './Utils';

import { _Mm } from '../types/music-metadata';

Main.main(app, BrowserWindow);

ipcMain.on(config.CHANNELS['MAIN'], event => {
    event.sender.send(config.CHANNELS['MAIN'], {
        appName: app.getName(),
        appVersion: app.getVersion()
    });
});

ipcMain.on(config.CHANNELS['PRIMARY_ASYNC'], event => {
    mm.parseFile(path.join(__dirname, '../', 'audio.mp3'))
        .then((data: mm.IAudioMetadata) => {
            const common: _Mm._ICommonTagsResult = {
                ...data.common,
                picture: pictureAsBase64(mm.selectCover(data.common.picture) ?? null)
            };

            event.sender.send(config.CHANNELS['PRIMARY_ASYNC'], common);
        })
        .catch(err => {
            console.log(err);
        });
});

ipcMain.on(config.CHANNELS['PRIMARY_SYNC'], async event => {
    const file =
        config.APP_ENV !== 'production'
            ? `http://localhost:${config.APP_PORT}/audio.mp3`
            : path.join(__dirname, '../', 'audio.mp3');

    event.sender.send(config.CHANNELS['PRIMARY_SYNC'], file);
});
