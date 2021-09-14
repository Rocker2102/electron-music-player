import React, { ReactNode } from 'react';
import { Howl } from 'howler';

import logo from '../logo.svg';
import './Main.css';

import type { } from '_Global';
import type { _ICommonTagsResult, _IPicture } from '_Music-Metadata';

const defaultMusicArt = 'static/images/music-default.png';

export default class Main extends React.PureComponent
    <unknown, { album: string, appName: string, appVersion: string }> {

    constructor (props: unknown) {
        super(props);

        this.state = {
            appName: '-',
            appVersion: '0.0.0',
            album: defaultMusicArt
        };
    }

    componentDidMount = (): void => {
        if (typeof window.electronBridge?.api === 'undefined') { return }

        window.electronBridge.api.send('MAIN', {});
        window.electronBridge.api.send('PRIMARY_ASYNC', {});

        window.electronBridge.api.receive('PRIMARY_ASYNC', (event, args: _ICommonTagsResult) => {
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
