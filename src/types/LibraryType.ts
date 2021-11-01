export interface Song {
    src: string,
    name: string,
    year?: number,
    album?: string,
    genre?: string,
    other?: string | string[],
    artist: string | string[],
    length: number
}
