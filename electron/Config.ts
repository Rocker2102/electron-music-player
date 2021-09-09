type Config = {
    'APP_ENV': 'local' | 'development' | 'production',
    'APP_PORT': Number,
    'CHANNELS': {
        'MAIN': String,
        'PRIMARY_SYNC': String,
        'PRIMARY_ASYNC': String
    }
};

const config: Config = {
    'APP_ENV': 'development',
    'APP_PORT': 3000,
    'CHANNELS': {
        'MAIN': 'app_channel_main',
        'PRIMARY_SYNC': 'app_channel_primary_sync',
        'PRIMARY_ASYNC': 'app_channel_primary_async'
    }
}

export type { Config };
export default config;
