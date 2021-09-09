import type { Config } from '../electron/Config'

export {};

declare global {
    interface Window {
        electronBridge: {
            api: CustomElectron.api
        }
    }
}

export declare namespace CustomElectron {
    type channel = keyof Config['CHANNELS'];
    type sendData = object;
    type receiverHandler = (...args: any) => any;

    interface api {
        send(channel: channel, data: sendData): void,
        receive(channel: channel, handler: receiverHandler): void
    }
}
