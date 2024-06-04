// content script runs on the web page the browser visits
console.log('its content js fiile')


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getDetails') {
        var n = document.querySelector(".text-heading-xlarge.inline.t-24.v-align-middle.break-words").innerText;
        var location = document.querySelector(".text-body-small.inline.t-black--light.break-words").innerText;
        var bio = document.querySelector(".text-body-medium.break-words").innerText;
        var aboutElement = document.querySelector(".display-flex.ph5.pv3");
        var about = aboutElement ? aboutElement.innerText : "Not Given";
        var connectionsElement = document.querySelector("span[class='t-black--light']")
        var connections = connectionsElement ? connectionsElement.innerText : "Not Given";
        var followersElement = document.querySelector(".text-body-small.t-black--light.inline-block")
        var followers = followersElement ? followersElement.innerText : "Not Given";

        sendResponse({ n, location, bio, about, followers, connections });
    }
});


// The chrome.runtime.onMessage.addListener function in this code is used to listen for
// incoming messages from other parts of the extension, such as content scripts.

// This function sets up an event listener for incoming messages.
// When a message is received, the provided callback function is executed.
// The callback function receives three parameters:
// request: Contains the message sent by the sender, typically an object with various properties.
// sender: Contains information about the sender of the message,
// such as its identity (extension ID) and the context (tab) it was sent from.
// sendResponse: A function that can be used to send a response back to the sender of the message.
