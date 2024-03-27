const sessionPrefix = "session_";

export function setSessionValue(key: string, value: string): void {
  var keyWithPrefix = sessionPrefix + key;
  var data: { [key: string]: any } = {}; 
  data[keyWithPrefix] = value;
  chrome.storage.local.set(data);
}

export function resetWallet() : void {
  chrome.storage.local.clear();
}

export function lockWallet(): void {
  chrome.storage.local.get(null, function (items) {
    for (var key in items) {
      if (key.startsWith(sessionPrefix)) {
        chrome.storage.local.remove(key);
      }
    }
  });
  window.location.reload();
}

export function getSessionValue(key: string): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    var keyWithPrefix = sessionPrefix + key;
    chrome.storage.local.get(keyWithPrefix, function(result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[keyWithPrefix]);
      }
    });
  });
}

export function setLocalStorage(key: string, value: string): void {
  var data: { [key: string]: any} = {};
  data[key] = value;
  chrome.storage.local.set(data);
}

export function getLocalStorage(key: string): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, function(result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}