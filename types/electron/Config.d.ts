declare namespace _Electron {
    type Config = {
        'APP_ENV': 'local' | 'development' | 'production',
        'APP_PORT': number,
        'CHANNELS': {
            'MAIN': string,
            'PRIMARY_SYNC': string,
            'PRIMARY_ASYNC': string
        }
    };
}
