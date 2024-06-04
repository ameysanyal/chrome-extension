//background script is a script running in the background to handle majority of chrome events
// It handles events such as browser actions, tab updates, or messages from content scripts.
// A service worker is a central event handler for a Chrome extension that can perform various tasks, 
// such as heavy computing, network requests, and listening for events. 
chrome.runtime.onInstalled.addListener(() => {

    console.log('Extension installed');
    fetch('http://localhost:3000/profile')
        .then(response => response)
        .then(data => {
            console.log('Response from server:', data.json());
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

