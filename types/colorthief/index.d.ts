/**
 * @see https://github.com/lokesh/color-thief/issues/188
 */
declare module 'colorthief' {
    type Color = [number, number, number];

    export default class ColorThief {
        getColor: (img: HTMLImageElement | null) => Color;
        getPalette: (img: HTMLImageElement | null) => Color[];
    }
}
