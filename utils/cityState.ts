export default function cityState(str : string): string {
    return str.slice(str.indexOf(',') + 2, str.length - 10);
}