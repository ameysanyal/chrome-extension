const btn = document.getElementById("tab")
const print = document.getElementById("show")
const tabName = async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);

    print.innerHTML = tab.title;
}

btn.addEventListener("click", tabName);







