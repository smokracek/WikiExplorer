chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.source && message.target) {
    chrome.storage.local.get({ wikiData: [] }, ({ wikiData }) => {
      wikiData.push({
        source: message.source,
        target: message.target,
        timestamp: new Date().toISOString(),
      });

      chrome.storage.local.set({ wikiData });
    });
  }
});
