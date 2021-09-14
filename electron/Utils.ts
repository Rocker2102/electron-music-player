import { _Mm } from '../types/music-metadata';
import type { IPicture } from 'music-metadata';

export const pictureAsBase64 = (pictures: IPicture[] | null): _Mm._IPicture | undefined => {
    if (pictures === null || pictures.length === 0) { return undefined }

    const picture: IPicture = pictures[0];
    const album = `data:${picture.format};base64,${picture.data.toString('base64')}`;

    return { ...picture, data: album };
};
