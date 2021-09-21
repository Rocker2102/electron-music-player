/* Add custom type for electronBridge defined by electron (contextBridge) on window object */
declare global {
    interface Window {
        electronBridge: {
            api: _Electron.api
        }
    }
}

export {}
