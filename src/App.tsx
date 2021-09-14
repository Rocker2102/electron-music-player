import React, { ReactNode } from 'react';

import Main from './Main/index';
import NowPlaying from './NowPlaying/index';

import Player from './Audio/Player';

import './App.css';
import { _Mm } from '../types/music-metadata';


const defaultMusicArt = 'static/images/kali-square.jpg';

export default class App extends React.Component
    <unknown, _App.state> {

    static player: Player;
    private lsKey = 'AppState';

    constructor(props: unknown) {
        super(props);

        let localState: _App.state;

        try {
            const tmp = window.localStorage.getItem(this.lsKey);
            if (tmp === null) { throw new Error('Failed to load state via localstorage') }

            localState = JSON.parse(tmp);
        } catch (e) {
            console.log(e);
        }

        this.state = {
            isLoading: true,
            songInfo: {
                name: 'Song Name (maybe large, therefore truncated)',
                picture: null
            },
            volumeOptions: {
                isMute: false,
                volume: 4,

                toggleMute: this.toggleMuteBtn,
                handleVolumeUpdate: this.handleVolumeUpdate
            },
            playbackOptions: {
                length: 283,
                current: 42,
                shuffle: false,
                isPlaying: false,
                repeatType: 'off',

                togglePlayback: this.toggleSongPlayback
            },
        };
    }

    toggleMuteBtn = (): void => {
        const newStatus = ! this.state.volumeOptions.isMute;

        if (App?.player?.state() === 'loaded') {
            App.player.mute(newStatus);
        }

        this.setState({
            volumeOptions: {
                ...this.state.volumeOptions,
                isMute: newStatus
            }
        });
    }

    handleVolumeUpdate = (e: Event, volume: number | number[], activeThumb: number): void => {
        const defaultVolume = 2;

        if (volume instanceof Array) {
            volume = volume.length > 0 ? volume[0] : defaultVolume;
        }
        if (App?.player?.state() === 'loaded') {
            App.player.setVolume(volume);
        }

        this.setState({
            volumeOptions: {
                ...this.state.volumeOptions,
                volume: volume
            }
        });
    }

    toggleSongPlayback = (): void => {
        const newStatus = ! this.state.playbackOptions.isPlaying;

        if (App?.player?.state() === 'loaded') {
            newStatus ? App.player.play() : App.player.pause();
        }

        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                isPlaying: newStatus
            }
        });
    }

    componentDidMount(): void {
        if (typeof window.electronBridge?.api === 'undefined') { return }

        window.electronBridge.api.send('PRIMARY_ASYNC', {});
        window.electronBridge.api.send('PRIMARY_SYNC', {});

        window.electronBridge.api.receive('PRIMARY_ASYNC',
            (event, args: _Mm._ICommonTagsResult) => {

            if (args.picture) {
                this.setState({
                    songInfo: {
                        ...this.state.songInfo,
                        picture: args.picture.data
                    }
                });
            }
        });

        window.electronBridge.api.receive('PRIMARY_SYNC', (event, args) => {
            App.player = new Player(args, {});
            App.player.mute(this.state.volumeOptions.isMute);
        });
    }

    componentDidUpdate(): void {
        window.localStorage.setItem(this.lsKey, JSON.stringify(this.state));
        return;
    }

    render(): ReactNode {
        return <React.StrictMode>
            <Main />
            <NowPlaying songInfo={this.state.songInfo} volumeOptions={this.state.volumeOptions}
                playbackOptions={this.state.playbackOptions} />
        </React.StrictMode>;
    }
}
