export function buildClassName(...classNames: (string | undefined | null | false)[]): string | undefined {
    const str = classNames.filter(Boolean).join(' ');
    if (!str) {
        return undefined;
    }
    return str;
}
