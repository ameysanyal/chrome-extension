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

