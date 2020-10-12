export function isLastCharEqual(str: string, char: string) {
  return str.charAt(str.length - 1) === char
}
export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}