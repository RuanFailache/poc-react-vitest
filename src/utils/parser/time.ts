export function parseTime(time: number): string {
    return time > 9 ? String(time) : `0${time}`
}