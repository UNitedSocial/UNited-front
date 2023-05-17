export function formatDate(string: string): string {
    const date = new Date('2018-04-03T00:00:00.000Z');
    return  date.toLocaleDateString('en-GB');
}