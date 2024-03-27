function injectScript(file_path: string) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    document.body.appendChild(script);
}

injectScript(chrome.extension.getURL("/static/api.js"));