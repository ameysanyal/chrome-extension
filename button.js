const btn = document.getElementById("tab")
const info = document.getElementById("details");

const populateDetails = (response, tab) => {
    info.innerText = `Name: ${response.n},
    Location: ${response.location},
    Bio: ${response.bio},
    About: ${response.about},
    Followers: ${response.followers},
    Connections: ${response.connections},
    URL: ${tab.url}
     `
}

const tabName = async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'getDetails' }, response => {
        populateDetails(response, tab)
        console.log(tab.url);

    });
}
btn.addEventListener("click", tabName);






