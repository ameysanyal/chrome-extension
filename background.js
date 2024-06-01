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

