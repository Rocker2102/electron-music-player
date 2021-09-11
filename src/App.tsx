import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';

import type {} from '_Global';
import type { _ICommonTagsResult, _IPicture } from '_Music-Metadata';

export default class App extends React.Component
    <unknown, { album: string, appName: string, appVersion: string }> {

    constructor (props: unknown) {
        super(props);

        this.state = {
            appName: '-',
            appVersion: '0.0.0',
            album: 'static/images/music-default.png'
        };
    }

    componentDidMount = (): void => {
        window.electronBridge.api.send('MAIN', {});
        /* eslint-disable-next-line no-console */
        console.time('metadata');
        window.electronBridge.api.send('PRIMARY_ASYNC', {});

        window.electronBridge.api.receive('PRIMARY_ASYNC', (event, args: _ICommonTagsResult) => {
            /* eslint-disable */
            console.timeEnd('metadata');
            console.log(args);
            /* eslint-enable */

            if (args.picture) {
                this.updatePicture(args.picture);
            }
        });
        window.electronBridge.api.receive('MAIN', (event, args) => {
            const { appName, appVersion } = args;
            this.setState({ appName, appVersion });
        });
    }

    updatePicture = (picture: _IPicture): void => {
        if (picture.data === '') { return }

        this.setState({ album: picture.data });
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
