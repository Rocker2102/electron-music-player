/* Declare custom global types for electronBridge defined by electron (contextBridge) on window object */
declare global {
    interface Window {
        electronBridge: {
            config: _Electron.Config,
            api: _Electron.api,
            getCoverImage: (fileLocation: string) => Promise<string | null>
        }
    }
}

export {}
