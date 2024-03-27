// @ts-nocheck ok

import crypto from "crypto";

const algorithm = 'aes-256-cbc'; 
const saltLength = 16; 
const ivLength = 16; 

const encryptPair = (seed, password) => {
    const salt = crypto.randomBytes(saltLength); 
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512'); 
    const iv = crypto.randomBytes(ivLength); 
    const cipher = crypto.createCipheriv(algorithm, key, iv); 
    let encryptedData = cipher.update(seed, 'utf-8', 'hex'); 
    encryptedData += cipher.final('hex');
    const encryptedResult = iv.toString('hex') + encryptedData; 
    return encryptedResult;
};

const decryptMasterSeed = (encryptedMasterSeed, password) => {
    const encryptedBuffer = Buffer.from(encryptedMasterSeed, 'hex'); 
    const salt = encryptedBuffer.slice(0, saltLength); 
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512'); 
    const iv = encryptedBuffer.slice(saltLength, saltLength + ivLength);
    const data = encryptedBuffer.slice(saltLength + ivLength);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf-8');
};

self.onmessage = async (event) => {
    const { action, payload } = event.data;
    let result;
    let error;
    try {
        if (action === 'encrypt') {
            result = encryptPair(payload.seed, payload.password);
        } else if (action === 'decrypt') {
            result = decryptMasterSeed(payload.encryptedMasterSeed, payload.password);
        }
    } catch (err) {
        error = err.toString();
    }
    self.postMessage({ result, error });
};
