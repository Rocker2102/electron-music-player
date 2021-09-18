import { _Mm } from '../types/music-metadata';
import type { IPicture } from 'music-metadata';

export const pictureAsBase64 = (picture: IPicture | null): _Mm._IPicture | null => {
    if (picture === null) { return null }

    const album = `data:${picture.format};base64,${picture.data.toString('base64')}`;

    return { ...picture, data: album };
};
