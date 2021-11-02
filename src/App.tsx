import React, { ReactNode } from 'react';
import ColorTheif from 'colorthief';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Main from './components/Main/MainComponent';
import AppFooter from './components/AppFooter/AppFooterComponent';

import Player from './services/Player';
import Library from './services/Library';

import './App.css';

import {
    appDefaults, getBackground,
    getTheme, getCoverImage, restoreStateFromLocal
} from './utils/Utils';
import type { Song } from './types/LibraryType';
import type { AppProps, AppState } from './types/AppType';
import type { PlaybackOptionsAttr } from './types/PlaybackOptionsType';


/**
 * Base App class. All primary states are managed here.
 * Any custom themes which are to be shared globally should be applied here.
 * Sequential event based app init.: Load library -> Load song -> Normal Functions...
 */
export default class App extends React.Component
    <AppProps, AppState> {

    /* Howler player, manages sound output */
    static player: Player;

    /* Core library, manages song list/playlist */
    private library: Library;

    /* Flag to check first app load */
    private appInit = true;

    /* LocalStorage keys, all local data is stored under one of the specified keys */
    private lsKey = 'AppState';
    private lsLibrary = 'AppLibrary';

    /* Song seek slider interval number is stored in this */
    private seekSliderInterval: undefined | number = undefined;

    constructor(props: AppProps) {
        super(props);

        App.player = new Player('any-incorrect-location-to-init-howler', {});

        this.library = new Library(this.lsLibrary, this.libraryLoaded);
        /* --disable-debug
        this.library.setList([
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
        */

        /* Set & register howler player event handlers */
        App.player.setHandlers({
            load: this.songLoaded,
            loadError: this.songLoadError,

            play: this.songPlayed,
            playError: this.songPlayError,

            end: this.songEnded,
            stop: this.songStopped,
            pause: this.songPaused,
        }, true);

        /* App init/default state */
        const defaultState: AppState = {
            common: {
                themeMode: 'dark',
                background: appDefaults.background
            },

            isLoading: true,
            songInfo: {
                name: 'Loading ...',
                picture: appDefaults.picture
            },
            volumeOptions: {
                isMute: false,
                volume: 7
            },
            playbackOptions: {
                length: 0,
                current: 0,
                shuffle: false,
                isPlaying: false,
                repeatType: 'off'
            }
        };

        this.state = restoreStateFromLocal(defaultState, this.lsKey);
        this.library.restoreFromLs(this.lsLibrary);
    }

    libraryLoaded = (): void => {
        console.log('Loaded library');

        App.player.start(this.library.getCurrent().src, false);
    }

    toggleMuteBtn = (): void => {
        const newStatus = ! this.state.volumeOptions.isMute;

        if (App.player?.state() === 'loaded') {
            App.player.mute(newStatus);
        }

        this.setState({
            volumeOptions: {
                ...this.state.volumeOptions,
                isMute: newStatus
            }
        });
    }

    handleVolumeUpdate = (volume: number): void => {
        if (App.player?.state() === 'loaded') {
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
        const repeatTypes: PlaybackOptionsAttr['repeatType'][]
            = [ 'off', 'single', 'on' ];

        const current = this.state.playbackOptions.repeatType;
        const newStatus = repeatTypes[
            (repeatTypes.indexOf(current) + 1) % repeatTypes.length];

        if (App.player?.state() === 'loaded') {
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

        if (App.player?.state() === 'loaded') {
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
        if (App.player?.state() === 'loaded') {
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
        const currentSong = this.library.getCurrent();

        this.setState({
            isLoading: false,
            songInfo: {
                name: currentSong.name,
                other: currentSong.other,
                artist: currentSong.artist,
                picture: null
            },
            playbackOptions: {
                ...this.state.playbackOptions,
                length: App.player.getDuration(),
                current: this.appInit ? this.state.playbackOptions.current : 0
            }
        });

        if (this.appInit) {
            App.player.setSeek(this.state.playbackOptions.current);
        }

        /* Set player specific values from state (which cannot be set dynamically) */
        App.player.mute(this.state.volumeOptions.isMute);
        App.player.setLoop(this.state.playbackOptions.repeatType === 'single');
        App.player.setVolume(this.state.volumeOptions.volume);
        this.appInit = false;

        console.log('Loaded song! Duration', App.player.getDuration());

        /* Load album art after song has been loaded */
        getCoverImage(currentSong.src).then(picData => {
            if (picData === null) { throw new Error('Empty picture!') }

            this.setState({
                songInfo: {
                    ...this.state.songInfo,
                    picture: picData
                }
            });

            this.updateBackground(picData);
        }).catch(() => {
            this.setState({
                songInfo: {
                    ...this.state.songInfo,
                    picture: appDefaults.picture
                }
            });

            this.updateBackground(appDefaults.picture);
        });
    }

    /**
     * Set background color to the most dominant color found in image provided
     * @param imgSrc image source
     */
    updateBackground = (imgSrc: string): void => {
        const img = new Image();
        img.src = imgSrc;

        const colorthief = new ColorTheif();

        if (img.complete) {
            this.setState({
                common: {
                    ...this.state.common,
                    background: getBackground(colorthief.getColor(img))
                }
            });
        } else {
            img.addEventListener('load', () => {
                this.setState({
                    common: {
                        ...this.state.common,
                        background: getBackground(colorthief.getColor(img))
                    }
                });
            });
        }
    }

    songLoadError = (): void => {
        console.log('Failed to load song!');
    }

    songPlayed = (): void => {
        console.log('Playing song...');

        /* Just to prevent UI glitches when clicking buttons quickly (< 10ms) */
        this.setState({ isLoading: false });

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

        if (this.state.playbackOptions.repeatType === 'on'
            || this.state.playbackOptions.shuffle) {

            this.playNextSong();
        }

        this.setState({
            playbackOptions: {
                ...this.state.playbackOptions,
                isPlaying: [ 'on', 'single' ].includes(this.state.playbackOptions.repeatType)
                    || this.state.playbackOptions.shuffle
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
        /**
         * Jump to previous song only if song seek < 10 seconds, else replay current from 0
         */
        if (App.player?.state() === 'loaded' && App.player?.getSeek() > 10) {
            App.player.setSeek(0);
            return;
        }

        this.setState({ isLoading: true });

        const song: Song = this.state.playbackOptions.shuffle
            ? this.library.getRandom() : this.library.previous();
        App.player.start(song.src, this.state.playbackOptions.isPlaying);
    }

    playNextSong = (): void => {
        this.setState({ isLoading: true });

        const song: Song = this.state.playbackOptions.shuffle
            ? this.library.getRandom() : this.library.next();
        App.player.start(song.src, this.state.playbackOptions.isPlaying);
    }

    toggleTheme = (): void => {
        const theme = this.state.common.themeMode === 'dark' ? 'light' : 'dark';

        this.setState({
            common: {
                ...this.state.common,
                themeMode: theme
            }
        });
    }

    componentDidMount (): void {
        console.log('App ready');
    }

    /**
     * Auto-store data locally whenever root component is updated
     */
    componentDidUpdate (): void {
        window.localStorage.setItem(this.lsKey, JSON.stringify(this.state));
    }

    render (): ReactNode {
        return <React.StrictMode>
            <ThemeProvider theme={getTheme(this.state.common.themeMode)}>
                <CssBaseline />

                <Main
                    themeMode={this.state.common.themeMode}
                    toggleTheme={this.toggleTheme}
                />

                <AppFooter
                    isLoading={this.state.isLoading}
                    background={this.state.common.background}

                    songInfo={this.state.songInfo}
                    volumeOptions={{
                        ...this.state.volumeOptions,

                        toggleMute: this.toggleMuteBtn,
                        handleVolumeUpdate: this.handleVolumeUpdate
                    }}
                    playbackOptions={{
                        ...this.state.playbackOptions,

                        handlePrev: this.playPrevSong,
                        handleNext: this.playNextSong,
                        handleSeek: this.handleSongSeek,
                        toggleRepeat: this.toggleSongRepeat,
                        toggleShuffle: this.toggleSongShuffle,
                        togglePlayback: this.toggleSongPlayback
                    }}
                />
            </ThemeProvider>
        </React.StrictMode>;
    }
}
