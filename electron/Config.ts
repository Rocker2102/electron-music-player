const Config: _Electron.Config = {
    'APP_ENV': 'development',
    'APP_PORT': 3000,
    'CHANNELS': {
        'MAIN': 'app_channel_main',
        'PRIMARY_SYNC': 'app_channel_primary_sync',
        'PRIMARY_ASYNC': 'app_channel_primary_async'
    }
};

export default Config;
