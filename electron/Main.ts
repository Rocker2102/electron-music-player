import { app, BrowserWindow, screen } from 'electron';
import config from './config';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow: any;

    static screenSize: Electron.Size = { width: 1920, height: 1080 };

    static windowPreferences: Electron.BrowserWindowConstructorOptions = {
        width: 992,
        minWidth: 480,
        maxWidth: Main.screenSize.width,

        height: 768,
        minHeight: 320,
        maxHeight: Main.screenSize.height,

        show: false
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
        /* set max-height/width now as screen module cannot be used before the ready event is fired */
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

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}
