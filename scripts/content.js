const insert = (content) => {
  var floatingMenu = document.createElement("div");
  floatingMenu.id = "conceptua-overlay";

  floatingMenu.innerHTML = `<div class='extension-content'> <div class='top-row'> <h1>Conceptua &#128214;</h1> <button id='conceptua-close'>&#10005;</button> </div> <div class='subtitle'><h4>Here is your super cool Story &#129668;</h4></div> <div class='story'> <p class='story-content'>${content}</p> </div> </div> `;
  console.log(content);

  document.documentElement.appendChild(floatingMenu);
  document
    .getElementById("conceptua-close")
    .addEventListener("click", myFunction);
};

const myFunction = () => {
  const overlay = document.getElementById("conceptua-overlay");
  overlay.style.display = "none";
};

chrome.runtime.onMessage.addListener(
  // This is the message listener
  (request, sender, sendResponse) => {
    if (request.message === "inject") {
      const { content } = request;

      // Call this insert function
      const result = insert(content);

      // If something went wrong, send a failed status
      if (!result) {
        sendResponse({ status: "failed" });
      }

      sendResponse({ status: "success" });
    }
  }
);
