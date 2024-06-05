
// content script runs on the web page the browser visits
console.log('its content js fiile')

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function interactWithButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {


        const button = buttons[i];

        button.click();

        await delay(1000)

        let e = document.querySelectorAll('.ql-editor.ql-blank')[i].getAttribute('aria-describedby')
        let box = document.querySelector(`[aria-describedby="${e}"]`)
        console.log(box)
        if (box) {
            box.innerHTML = `<p>Hello${i}</p>`;
        } else {
            console.error('Editor box not found');

        }

        await delay(1000)
        let postbtn = document.querySelector('.comments-comment-box__submit-button.mt3.artdeco-button.artdeco-button--1.artdeco-button--primary.ember-view')
        // let postbtn = document.getElementById(`${p}`)
        console.log(postbtn)
        if (postbtn) {
            postbtn.addEventListener('click', function () {
                console.log(`post button clicked`);
            });
            postbtn.click();
            await delay(2000)
        } else {
            console.error(`Submit button  not found`);
        }



    }
}
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
    if (request.action === 'start') {
        // let posts = Array.from(document.getElementsByClassName('feed-shared-update-v2 feed-shared-update-v2--minimal-padding full-height relative'))
        // posts.forEach(post => console.log(post.getAttribute('id')))

        let likeButtons = Array.from(document.querySelectorAll(".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"));
        let commentButtons = Array.from(document.querySelectorAll(".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.comment-button.flex-wrap"));
        let randomLikeButtons = shuffle(likeButtons).slice(0, request.likeCount)
        let randomCommentButtons = shuffle(commentButtons).slice(0, request.commentCount)
        // console.log(randomLikeButtons)
        // console.log(randomCommentButtons)


        randomLikeButtons.forEach(button => button.click())

        interactWithButtons(randomCommentButtons);

        sendResponse({ ack: "Done liking and Commenting", display: likeButtons.length })


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

// document.querySelector('[aria-describedby="ember701-text-editor-placeholder"]').innerHTML = `<p>Hello</p>`
// document.getElementById('ember941')




