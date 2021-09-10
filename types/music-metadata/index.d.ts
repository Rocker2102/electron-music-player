import type { IPicture } from 'music-metadata';

export type _IPicture = Omit<IPicture, 'data'> & {
    data: Uint8Array
}
