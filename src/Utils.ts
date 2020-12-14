const dateTimeFormat = new Intl.DateTimeFormat('ru');
export function formatDate(date: Date): string {
    return dateTimeFormat.format(date);
}
export function formatUnixTime(unixTime: number): string {
    return formatDate(new Date(unixTime));
}
