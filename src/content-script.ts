function injectScript(file_path: string) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    document.body.appendChild(script);
}

injectScript(chrome.runtime.getURL("/static/api.js")); 
// FOR V2 would you like to allow mounting this script only if the site owner consents with a header?