import React, { ReactNode } from 'react';

import Main from './Main/index';
import NowPlaying from './NowPlaying/index';

import Player from './Audio/Player';
import Library from './Audio/Library';

import './App.css';
import { _Mm } from '../types/music-metadata';


const defaultMusicArt = 'static/images/kali-square.jpg';

export default class App extends React.Component
    <unknown, _App.state> {

    static player: Player;
    private library: Library;
    private lsKey = 'AppState';
    private seekSliderInterval: undefined | number = undefined;

    constructor(props: unknown) {
        super(props);

        let localState: _App.state;

        App.player = new Player('any-incorrect-location-to-init-howler', {});

        this.library = new Library([
            {
                src: 'http://localhost:3000/audio.mp3',
                name: 'Caller Tune',
                artist: 'Unknown',
                length: 29
            },
            {
                src: 'http://localhost:3000/audio__.mp3',
                name: 'Yeh Dooriyan',
                artist: 'Mohit Chauhan',
                length: 241
            },
            {
                src: 'http://localhost:3000/audio_.mp3',
                name: 'Qaafiraana',
                artist: [ 'Arijit Singh', 'Nikita Gandhi' ],
                length: 341
            }
        ]);

        try {
            const tmp = window.localStorage.getItem(this.lsKey);
            if (tmp === null) { throw new Error('Failed to load state via localstorage') }

            localState = JSON.parse(tmp);
        } catch (e) {
            console.log(e);
        }

        App.player.setHandlers({
            load: this.songLoaded,
            loadError: this.songLoadError,

            play: this.songPlayed,
            playError: this.songPlayError,

            end: this.songEnded,
            stop: this.songStopped,
            pause: this.songPaused,
        }, true);

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
                length: 0,
                current: 0,
                shuffle: false,
                isPlaying: false,
                repeatType: 'off',

                handlePrev: this.playPrevSong,
                handleNext: this.playNextSong,
                handleSeek: this.handleSongSeek,
                toggleRepeat: this.toggleSongRepeat,
                toggleShuffle: this.toggleSongShuffle,
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

    handleVolumeUpdate = (e: Event, volume: number | number[]): void => {
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

    toggleSongRepeat = (): void => {
        const repeatTypes: _NowPlaying.PlaybackOptions.props['repeatType'][]
            = [ 'off', 'single', 'on' ];

        const current = this.state.playbackOptions.repeatType;
        const newStatus = repeatTypes[
            (repeatTypes.indexOf(current) + 1) % repeatTypes.length];

        if (App?.player?.state() === 'loaded') {
            App.player.setLoop(newStatus === 'single');
        }

        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                repeatType: newStatus
            }
        });
    }

    toggleSongShuffle = (): void => {
        const newStatus = ! this.state.playbackOptions.shuffle;

        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                shuffle: newStatus
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

    handleSongSeek = (seconds: number): void => {
        if (App?.player?.state() === 'loaded') {
            App.player.setSeek(seconds);
        }

        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                current: seconds
            }
        });
    }

    setSongSeekToCurrent = (): void => {
        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                current: App.player.getSeek()
            }
        });
    }

    songLoaded = (): void => {
        this.setState({
            isLoading: false,
            playbackOptions: {
                ...this.state.playbackOptions,
                length: App.player.getDuration(),
                current: 0
            }
        });

        console.log('Loaded song! Duration', App.player.getDuration());
    }

    songLoadError = (): void => {
        console.log('Failed to load song!');
    }

    songPlayed = (): void => {
        console.log('Playing song...');

        /**
         * setting a refresh rate such that (1000 / refreshRate) > animationDuration
         * will cause sudden bounce of sliderThumb when pausing & playing.
         * won't be noticed if value is below 10 - 15
         * default animationDuration = 150ms
         */
        const refreshRate = 1000 / 150;

        /* immediatley change the seekvalue as well as setInterval to modify it */
        this.setSongSeekToCurrent();

        this.seekSliderInterval = window.setInterval(this.setSongSeekToCurrent,
            1000 / refreshRate);
    }

    songPlayError = (): void => {
        this.songEnded();
        console.log('Failed to play song!');
    }

    songEnded = (): void => {
        console.log('Song ended');

        /* TODO: set isPlaying to false if next song is not present */
        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                isPlaying: this.state.playbackOptions.repeatType !== 'off'
            }
        });
    }

    songStopped = (): void => {
        console.log('Stopped');

        if (typeof this.seekSliderInterval !== 'undefined') {
            clearInterval(this.seekSliderInterval);
        }
    }

    songPaused = (): void => {
        console.log('Song paused');

        if (typeof this.seekSliderInterval !== 'undefined') {
            clearInterval(this.seekSliderInterval);
        }

        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                isPlaying: false
            }
        });
    }

    playPrevSong = (): void => {
        this.setState({ isLoading: true });

        const prev = this.library.previous();
        App.player.start(prev.src, this.state.playbackOptions.isPlaying);
    }

    playNextSong = (): void => {
        this.setState({ isLoading: true });

        const next = this.library.next();
        App.player.start(next.src, this.state.playbackOptions.isPlaying);
    }

    componentDidMount(): void {
        if (typeof window.electronBridge?.api === 'undefined') {
            setTimeout(() => {
                App.player.start('http://localhost:3000/audio.mp3', false);
            }, 2000);
            return;
        }

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
            setTimeout(() => {
                App.player.start(args, false);
            }, 2000);
        });
    }

    componentDidUpdate(): void {
        window.localStorage.setItem(this.lsKey, JSON.stringify(this.state));
        return;
    }

    render(): ReactNode {
        return <React.StrictMode>
            <Main />
            <NowPlaying
                isLoading={this.state.isLoading}
                songInfo={this.state.songInfo}
                volumeOptions={this.state.volumeOptions}
                playbackOptions={this.state.playbackOptions}
            />
        </React.StrictMode>;
    }
}
