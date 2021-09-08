import { BrowserWindow } from 'electron';
import path = require('path');

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow: any;

    static preferences: Main.Preferences = {
        width: 800,
        height: 600,
        nativeWindowOpen: true
    };

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow(this.preferences);
        Main.mainWindow.loadURL(`file://${path.join(__dirname, '../index.html')}`);
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}

module Main {
    export type Preferences = {
        width: Number,
        height: Number,
        nativeWindowOpen: boolean
    };
}
