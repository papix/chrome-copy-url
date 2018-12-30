import { Options } from './types'

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    var url = tabs[0].url;

    if (url) {
      const options = loadOptions();

      if (options.decodeUrlEncode) {
        url = decodeURI(url)
      }

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

function loadOptions() : Options {
  if (localStorage.getItem('options')) {
    try {
      return JSON.parse(localStorage.getItem('options'));
    } catch(e) {
      return <Options>{};
    }
  }
}



