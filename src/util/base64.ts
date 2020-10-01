export function encodeBase64(str: string): string {
  return Buffer.from(str).toString("base64");
}

export function decodeBase64(base64: string): string {
  return Buffer.from(base64, "base64").toString("utf-8");
}
