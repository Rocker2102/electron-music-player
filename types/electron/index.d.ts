declare namespace _Electron {
    type channel = keyof Config['CHANNELS'];
    type sendData = object;
    type receiverHandler = (...args: any) => any;

    interface api {
        send(channel: channel, data: sendData): void,
        receive(channel: channel, handler: receiverHandler): void
    }
}
