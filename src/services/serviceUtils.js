import MD5 from 'crypto-js/md5';

export function generateAuthParams() {
    const publicKey = '15de1a65a5e111da835d47ef63f69dd3';
    const privateKey = '847ab06e2341b8fab20cc74181a710e6b9871fc4';
    const timeStamp = Date.now();
    const hash = MD5(timeStamp + privateKey + publicKey).toString();
    return {
        apikey: publicKey,
        hash,
        ts: timeStamp,
    };
}
