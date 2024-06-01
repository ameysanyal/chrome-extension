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


