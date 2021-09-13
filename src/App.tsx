import React, { ReactNode } from 'react';

import Main from './Main/index';
import NowPlaying from './NowPlaying/index';

import './App.css';

import type { _App } from '_App';


const defaultMusicArt = 'static/images/kali-square.jpg';

export default class App extends React.Component
    <unknown, _App.state> {

    constructor(props: unknown) {
        super(props);

        this.state = {
            songInfo: {
                name: 'Song Name (maybe large, therefore truncated)',
                picture: null
            },
            volumeOptions: {
                isMute: false,
                volume: 4
            },
            playbackOptions: {
                length: 283,
                current: 42,
                shuffle: false,
                isPlaying: false,
                repeatType: 'off'
            }
        };
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.setState({
                songInfo: {
                    ...this.state.songInfo,
                    picture: defaultMusicArt
                }
            });
        }, 2000);
        setTimeout(() => {
            this.setState({
                volumeOptions: {
                    ...this.state.volumeOptions,
                    isMute: true
                }
            });
        }, 3000);
    }

    render(): ReactNode {
        return <React.StrictMode>
            <Main />
            <NowPlaying songInfo={this.state.songInfo} volumeOptions={this.state.volumeOptions}
                playbackOptions={this.state.playbackOptions} />
        </React.StrictMode>;
    }
}
