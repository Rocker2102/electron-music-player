import type { IPicture } from 'music-metadata';
import type { _IPicture } from '_Music-Metadata';

export const pictureAsBase64 = (pictures: IPicture[] | null): _IPicture | undefined => {
    if (pictures === null || pictures.length === 0) { return undefined }

    const picture: IPicture = pictures[0];
    const album = `data:${picture.format};base64,${picture.data.toString('base64')}`;

    return { ...picture, data: album };
};
