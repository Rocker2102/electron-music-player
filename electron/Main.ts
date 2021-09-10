import { BrowserWindow, screen } from 'electron';
import config from './Config';
import path = require('path');

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    static BrowserWindow: any;

    static screenSize: Electron.Size = { width: 1920, height: 1080 };

    static webPreferences: Electron.WebPreferences = {
        nativeWindowOpen: true,
        nodeIntegration: false,
        preload: path.join(__dirname, 'Preload.js')
    }

    static windowPreferences: Electron.BrowserWindowConstructorOptions = {
        width: 992,
        minWidth: 480,
        maxWidth: Main.screenSize.width,

        height: 768,
        minHeight: 320,
        maxHeight: Main.screenSize.height,

        show: false,
        webPreferences: Main.webPreferences
    };

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        Main.mainWindow = null;
    }

    private static onReady(): void {
        /**
         * set max-height/width now as screen module cannot
         * be used before the ready event is fired
         */

        Main.screenSize = screen.getPrimaryDisplay().size;
        Main.windowPreferences.maxWidth = Main.screenSize.width;
        Main.windowPreferences.maxHeight = Main.screenSize.height;

        Main.mainWindow = new Main.BrowserWindow(Main.windowPreferences);
        if (config.APP_ENV !== 'production') {
            Main.mainWindow.loadURL(`http://localhost:${config.APP_PORT}`);
        } else {
            Main.mainWindow.loadFile('build/index.html');
        }
        Main.mainWindow.once('ready-to-show', Main.mainWindow.show);
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: typeof Main.application, browserWindow: typeof BrowserWindow): void {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}
