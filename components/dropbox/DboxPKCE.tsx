import * as Crypto from 'expo-crypto';

export async function generateCodeVerifier() {
    // Generate 32 random bytes using expo-crypto
    const array = await Crypto.getRandomBytesAsync(35);  // Use expo-crypto to get random bytes

    // Convert to a string and encode in Base64 URL format
    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')  // Base64 to Base64URL
        .replace(/\//g, '_')  // Base64 to Base64URL
        .replace(/=+$/, '');  // Remove padding characters
}

export async function generateCodeChallenge(codeVerifier: string) {
    const hashed = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
    );

    const base64UrlChallenge = hashed
        .replace(/\+/g, '-')  // Base64 to Base64URL
        .replace(/\//g, '_')  // Base64 to Base64URL
        .replace(/=+$/, '');  // Remove padding characters
    console.log("Generated code challenge (Base64URL):", base64UrlChallenge);
    return base64UrlChallenge;
}

/*
// Generate a random string (code_verifier)
export const generateCodeVerifier = async () => {
    console.log("Code verifier starting");
    const array = Crypto.getRandomBytes(50); // Random bytes
    const base64Verifier = btoa(String.fromCharCode(...array)) // Convert to Base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '~'); // Base64URL encoding

    console.log("Generated code verifier (Base64URL):", base64Verifier);
    return base64Verifier;
};

// Generate the code challenge from the code verifier
export const generateCodeChallenge = async (codeVerifier: string) => {
    console.log("Code challenge generator starting with verifier:", codeVerifier);
    const hashed = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier
    );
    const base64UrlChallenge = hashed
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/==+$/g, '~'); // Base64URL encoding

    console.log("Generated code challenge (Base64URL):", base64UrlChallenge);
    return base64UrlChallenge;
};
*/