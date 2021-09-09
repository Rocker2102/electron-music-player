type Config = {
    'APP_ENV': 'local' | 'development' | 'production',
    'APP_PORT': Number
};

const config: Config = {
    'APP_ENV': 'production',
    'APP_PORT': 3000
}

export type { Config };
export default config;
