declare namespace globalThis {
    interface Window {
        electronBridge: {
            api: _Electron.api
        }
    }
}
