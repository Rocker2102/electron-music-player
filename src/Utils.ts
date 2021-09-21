/* 'mmb' required for development purposes only (for reading files from server) */
import * as mmb from 'music-metadata-browser';

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
    if (typeof window.electronBridge === 'undefined') {
        const metadata = await mmb.fetchFromUrl(fileLocation);
        const picture = mmb.selectCover(metadata?.common?.picture) ?? null;

        if (picture === null) { return null }

        return `data:${picture.format};base64,${picture.data.toString('base64')}`;
    }

    return window.electronBridge.getCoverImage(fileLocation);
}
