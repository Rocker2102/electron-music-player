type Channel = {
    [name: string]: string
}

declare namespace _Electron {
    type Config = {
        'APP_ENV': 'local' | 'development' | 'production',
        'APP_PORT': number,
        'CHANNELS': Channel
    };
}
