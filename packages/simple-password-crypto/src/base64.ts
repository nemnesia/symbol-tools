const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

function valueOf(character: string): number {
  return BASE64_ALPHABET.indexOf(character);
}

/** A strict, runtime-independent RFC 4648 base64 encoder. */
export function toBase64(bytes: Uint8Array): string {
  let result = '';
  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index];
    const second = bytes[index + 1];
    const third = bytes[index + 2];

    result += BASE64_ALPHABET[first >> 2];
    result += BASE64_ALPHABET[((first & 0x03) << 4) | ((second ?? 0) >> 4)];
    result += second === undefined ? '=' : BASE64_ALPHABET[((second & 0x0f) << 2) | ((third ?? 0) >> 6)];
    result += third === undefined ? '=' : BASE64_ALPHABET[third & 0x3f];
  }
  return result;
}

/** Decodes canonical base64 only; whitespace, URL-safe and malformed encodings are rejected. */
export function fromBase64(base64: string): Uint8Array {
  if (typeof base64 !== 'string' || !BASE64_PATTERN.test(base64)) {
    throw new Error('Invalid base64');
  }

  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  const output = new Uint8Array((base64.length / 4) * 3 - padding);
  let outputIndex = 0;

  for (let index = 0; index < base64.length; index += 4) {
    const first = valueOf(base64[index]);
    const second = valueOf(base64[index + 1]);
    const third = base64[index + 2] === '=' ? 0 : valueOf(base64[index + 2]);
    const fourth = base64[index + 3] === '=' ? 0 : valueOf(base64[index + 3]);

    output[outputIndex++] = (first << 2) | (second >> 4);
    if (outputIndex < output.length) output[outputIndex++] = ((second & 0x0f) << 4) | (third >> 2);
    if (outputIndex < output.length) output[outputIndex++] = ((third & 0x03) << 6) | fourth;
  }

  // Reject non-canonical encodings whose unused padding bits are non-zero.
  if (toBase64(output) !== base64) throw new Error('Invalid base64');
  return output;
}
