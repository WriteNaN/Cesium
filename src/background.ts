const sessionPrefix = "session_";

function clearSessionData() {
  chrome.storage.local.get(null, function (items) {
    for (var key in items) {
      if (key.startsWith(sessionPrefix)) {
        chrome.storage.local.remove(key);
      }
    }
  });
}

chrome.runtime.onStartup.addListener(function () {
  return clearSessionData();
});