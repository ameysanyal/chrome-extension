const btn = document.getElementById("tab")
const info = document.getElementById("details")
const openbtn = document.getElementById("open")
const links = ['https://www.linkedin.com/in/akshatshrivastavainsead/',
    'https://www.linkedin.com/in/alakh-pandey-physicswallah-4baaa8227/',
    'https://www.linkedin.com/in/williamhgates/'
]

const populateDetails = (response, tab) => {
    info.innerText = `Name: ${response.n},
    Location: ${response.location},
    Bio: ${response.bio},
    About: ${response.about},
    Followers: ${response.followers},
    Connections: ${response.connections},
    URL: ${tab.url}`
}

function openTabs() {
    for (i in links)
        window.open(
            links[i], "_blank");
}

async function getProfileDetails() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'getDetails' }, response => {
        populateDetails(response, tab)

        fetch("http://localhost:3000/profile", {

            method: "POST",
            body: JSON.stringify({ ...response, url: tab.url }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));

        console.log({ ...response, url: tab.url });

    });
}
btn.addEventListener("click", getProfileDetails);
openbtn.addEventListener("click", openTabs);


// const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
// query is a method of chorme.tabs API, for accessing chorme tab API include
// permission in manifest.json file
// the queryOptions is an object specifying the criteria for querying tabs.
// queryOptions This object is used as a parameter for the query method of the chorme.tabs API to filter and select specific tabs based on these criteria.
// the active property specifies that query should only include tabs that are currently active
// and lastFocusedWindow property specifies that include tabs from the last window the user was working with
// query is the method that returns a promise with
// a value of array of tabs for the given query in the queryoptions object


// chrome.tabs.sendMessage method in this code is used to send a message from a background script
// (or popup script) to a content script in a specified tab.

// tab.id: This is the ID of the tab to which the message is being sent.
// It identifies which tab's content script should receive the message.
// { action: 'getDetails' }: This is the message being sent. In this case, it's an object with an action property set to 'getDetails'.
// This message will be received by the content script running in the specified tab.
// response => { ... }: This is a callback function that gets executed when the content script responds to the message.
// The response from the content script is passed as a parameter to this callback function.