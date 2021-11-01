/* 'mmb' required for development purposes only (for reading files from react-server) */
import * as mmb from 'music-metadata-browser';
import { createTheme, Theme } from '@mui/material/styles';

import { AppState, Common as AppStateCommon } from './types/AppType';

export const appDefaults = {
    picture: 'static/images/now-playing-default.jpg',
    background: 'rgba(0, 0, 0, 0.15)'
}

/**
 * Forms CSS compatible string from rgb array
 * @param rgb RGB value of color as array
 * @returns rgba(r, g, b, alpha) string, can be used directly in CSS
 */
export const getBackground = (rgb: [ number, number, number ]): string => {
    const opacity = 0.4;
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
}

export const formatString = (str: undefined | string | string[]): string => {
    return str instanceof Array ? str.join(', ') : str ?? '';
}

export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const _seconds = Math.floor(seconds - hours * 3600 - minutes * 60);

    let str = '';
    if (hours > 0) {
        str += (hours < 10 ? '0' + hours : hours) + ':';
    }
    str += (minutes < 10 ? '0' + minutes : minutes) + ':';
    str += (_seconds < 10 ? '0' + _seconds : _seconds);

    return str;
}

export const getPercent = (value: number, total: number, precision: number = 2): number => {
    if (total === 0) { return 0 }
    return Number(((value / total) * 100).toFixed(precision));
}

export const getCoverImage = async (fileLocation: string): Promise<string | null> => {
    if (typeof window.electronBridge === 'undefined'
        || window.electronBridge.config.APP_ENV === 'development') {

        const metadata = await mmb.fetchFromUrl(fileLocation);
        const picture = mmb.selectCover(metadata?.common?.picture) ?? null;

        if (picture === null) { return null }

        return `data:${picture.format};base64,${picture.data.toString('base64')}`;
    }

    return window.electronBridge.getCoverImage(fileLocation);
}

export const restoreStateFromLocal = (defaultState: AppState, lsKey: string): AppState => {
    let localState;

    try {
        const tmp = window.localStorage.getItem(lsKey);
        if (tmp === null || tmp === '') {
            throw new Error('Failed to load state via localStorage');
        }

        localState = JSON.parse(tmp);
    } catch (e) {
        console.log(e);
        return defaultState;
    }

    /**
     * Following settings are overridden regardless of settings obtained from localStorage
     * state.isLoading = true
     * state.playbackOptions.isPlaying = false
     */
    const tmp: AppState = {
        common: {
            ...localState?.common,
            theme: defaultState.common.themeMode
        },
        isLoading: true,
        songInfo: {...defaultState.songInfo, ...localState?.songInfo},
        volumeOptions: {...defaultState.volumeOptions, ...localState?.volumeOptions},
        playbackOptions: {...defaultState.playbackOptions, ...localState?.playbackOptions,
            ...{isPlaying: false}}
    }

    return tmp;
}

export const getTheme = (mode: AppStateCommon['themeMode']): Theme => {
    return createTheme({
        palette: {
            mode: mode
        }
    });
}
