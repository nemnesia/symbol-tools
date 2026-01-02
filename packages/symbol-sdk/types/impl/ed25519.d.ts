declare namespace _default {
    function get(): {
        keyPairFromSeed: (hashMode: any, seed: any) => {
            publicKey: Uint8Array<ArrayBuffer>;
            secretKey: Uint8Array<ArrayBuffer>;
        };
        sign: (hashMode: any, message: any, keyPair: any) => Uint8Array<ArrayBuffer>;
        verify: (hashMode: any, message: any, signature: any, publicKey: any) => boolean;
    };
    function unload(): void;
}
export default _default;
