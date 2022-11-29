// simple unique ID generator
export function genUUID() {
  return Math.floor(Math.random() * 1e10).toString(16);
}
