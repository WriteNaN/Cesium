import { wallet } from "multi-nano-web";
import type { Account } from "multi-nano-web/dist/lib/address-importer";

export function deriveAccounts(
  seed: string,
  startAndEndIndex: [number, number]
) {
  return wallet.accounts(seed, startAndEndIndex[0], startAndEndIndex[1]);
}

export function convertToMulti(accounts: Account[], prefixes: string[]) {
  return accounts.map((account) => {
    const addresses = prefixes.map((prefix) => ({
      [prefix]: account.address.replace("nano", prefix),
    }));
    return {
      privateKey: account.privateKey,
      publicKey: account.publicKey,
      addresses: [{ nano: account.address }, ...addresses],
    };
  });
}

/*
export function convertToMulti(accounts: Account[], prefixes: string[]) {
    const Accounts = new Array();
    for (const account of accounts) {
        const addressI = new Array();
        addressI.push({ "nano": account.address });
        for (const prefix of prefixes) {
            addressI.push({ [prefix]: account.address.replace("nano", prefix)});
        }
        Accounts.push({ privateKey: account.privateKey, publicKey: account.privateKey, addresses: addressI });
    }
    return Accounts;
} */
