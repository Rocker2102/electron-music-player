import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';

import type {} from '_Global';
import type { _IPicture } from '_Music-Metadata';

export default class App extends React.Component
    <unknown, { album: string | null, appName: string, appVersion: string }> {

    constructor (props: unknown) {
        super(props);

        this.state = { album: null, appName: '-', appVersion: '0.0.0' };
    }

    componentDidMount = (): void => {
        window.electronBridge.api.send('MAIN', {});
        /* eslint-disable-next-line no-console */
        console.time('metadata');
        window.electronBridge.api.send('PRIMARY_ASYNC', {});

        window.electronBridge.api.receive('PRIMARY_ASYNC', (event, args) => {
            /* eslint-disable */
            console.timeEnd('metadata');
            console.log(args);
            /* eslint-enable */
            this.updatePicture(args.common.picture);
        });
        window.electronBridge.api.receive('MAIN', (event, args) => {
            const { appName, appVersion } = args;
            this.setState({ appName, appVersion });
        });
    }

    updatePicture = (picture: _IPicture[]): void => {
        if (picture.length === 0) { return }

        const albumArt: _IPicture = picture[0];
        const picStr = albumArt.data.reduce((data: string, byte: number) => {
            return data + String.fromCharCode(byte);
        }, '');
        const album = `data:${albumArt.format};base64,${window.btoa(picStr)}`;
        this.setState({ album: album });
    }

    render (): ReactNode {
        return <div className="App">
            <header className="App-header">
                <img src={this.state.album ?? logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                    <br />
                    { this.state.appName }, { this.state.appVersion }
                </p>
            </header>
        </div>;
    }
}
