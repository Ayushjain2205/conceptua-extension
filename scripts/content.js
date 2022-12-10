const insert = (content) => {
  var floatingMenu = document.createElement("div");
  floatingMenu.style.position = "fixed";
  floatingMenu.style.bottom = "0px";
  floatingMenu.style.left = "0px";
  floatingMenu.style.zIndex = "500";
  floatingMenu.style.marginBottom = "2.5rem";
  floatingMenu.style.background = "yellow";

  floatingMenu.innerHTML = `<h1>${content}</h1>`;
  console.log(content);
  document.documentElement.appendChild(floatingMenu);
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
