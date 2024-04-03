import fs from "fs/promises";
import { exec } from 'child_process';

function byteSwap(input: string): string {
    return input.substring(6, 8) + input.substring(4, 6) + input.substring(2, 4) + input.substring(0, 2);
}

async function exportCrx(): Promise<void> {
    const zipPath = "release/cesium.zip";
    const crx = "release/cesium.crx";

    await new Promise<void>((resolve, reject) => {
        exec(`openssl sha1 -sha1 -binary -sign extension.pem < ${zipPath} > export.sig`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });

    await new Promise<void>((resolve, reject) => {
        exec('openssl rsa -pubout -outform DER < extension.pem > signer.pub', (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });

    const pubSize = (await fs.stat("signer.pub")).size.toString(16).padStart(8, '0');
    const sigSize = (await fs.stat("export.sig")).size.toString(16).padStart(8, '0');

    const crmagic_hex = "43723234"; // Cr24
    const version_hex = "02000000"; // 2
    const crxBuffer = Buffer.from(
        crmagic_hex +
        version_hex +
        pubSize +
        sigSize,
        'hex'
    );

    await fs.writeFile(crx, crxBuffer);
    await fs.appendFile(crx, await fs.readFile("signer.pub"));
    await fs.appendFile(crx, await fs.readFile("export.sig"));
    await fs.appendFile(crx, await fs.readFile(zipPath));
}

exportCrx();
