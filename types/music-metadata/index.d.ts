import type { IPicture, ICommonTagsResult } from 'music-metadata';

export type _IPicture = Omit<IPicture, 'data'> & {
    data: string
}

export type _ICommonTagsResult = Omit<ICommonTagsResult, 'picture'> & {
    picture?: _IPicture
}
