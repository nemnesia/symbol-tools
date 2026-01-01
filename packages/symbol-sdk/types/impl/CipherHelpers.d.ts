export function concatArrays(...arrays: any[]): Uint8Array<any>;
export function decodeAesGcm(deriveSharedKey: any, keyPair: any, recipientPublicKey: any, encodedMessage: any): Promise<Uint8Array<ArrayBuffer>>;
export function decodeAesCbc(deriveSharedKey: any, keyPair: any, recipientPublicKey: any, encodedMessage: any): Promise<Uint8Array<ArrayBuffer>>;
export function encodeAesGcm(deriveSharedKey: any, keyPair: any, recipientPublicKey: any, message: any): Promise<{
    tag: Uint8Array<ArrayBufferLike>;
    initializationVector: Uint8Array<ArrayBuffer>;
    cipherText: Uint8Array<ArrayBufferLike>;
}>;
export function encodeAesCbc(deriveSharedKey: any, keyPair: any, recipientPublicKey: any, message: any): Promise<{
    salt: Uint8Array<ArrayBuffer>;
    initializationVector: Uint8Array<ArrayBuffer>;
    cipherText: Uint8Array<ArrayBufferLike>;
}>;
