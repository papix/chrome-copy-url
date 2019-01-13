import { Option } from './types'

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0].url) {
      const option = loadOption();
      const fetchedUrl = option.decodeUrlEncode ? decodeURI(tabs[0].url) : tabs[0].url;

      const url = new URL(fetchedUrl);
      option.queryFilter.autoDeleteKeys.map((key) => {
        url.searchParams.delete(key);
      });

      saveClipboard(url.toString());
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

function loadOption() : Option {
  if (localStorage.getItem('option')) {
    try {
      return JSON.parse(localStorage.getItem('option'));
    } catch(e) {
      return <Option>{};
    }
  }
}
