chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const url = tabs[0].url;

    if (url) {
      saveClipboard(url);
    }
  });
});

function saveClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.style.cssText = "position:absolute;left:-100%";

  document.body.appendChild(textArea);

  textArea.value = text;
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
}
