interface StorageArea {
  [key: string]: any;
}

export default {
  get: <T>(key: string, storageArea: chrome.storage.AreaName): Promise<T> => {
      return new Promise((resolve, reject) => {
          chrome.storage[storageArea].get(key, (items: StorageArea) => {
              const error = chrome.runtime.lastError;
              if (error) return reject(error);
              resolve(items[key]);
          });
      });
  },
  set: (key: string, value: any, storageArea: chrome.storage.AreaName): Promise<void> => {
      return new Promise((resolve, reject) => {
          chrome.storage[storageArea].set({ [key]: value }, () => {
              const error = chrome.runtime.lastError;
              error ? reject(error) : resolve();
          });
      });
  },
};

export function resetWallet(): void {
  chrome.storage.local.clear();
}