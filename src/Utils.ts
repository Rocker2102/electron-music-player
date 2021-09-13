export const formatString = (str: undefined | string | string[]): string => {
    return str instanceof Array ? str.join(', ') : str ?? '';
}
