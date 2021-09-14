import type { IPicture, ICommonTagsResult } from 'music-metadata';
// <reference path=".music-metadata" />

declare namespace _Mm {
    type _IPicture = Omit<IPicture, 'data'> & {
        data: string
    }

    type _ICommonTagsResult = Omit<ICommonTagsResult, 'picture'> & {
        picture?: _IPicture
    }
}
