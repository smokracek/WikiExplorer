function sendNavInfo(source, target) {
  chrome.runtime.sendMessage({ source, target });
}

function handleClickEvent(event) {
  const link = event.target.href;
  if (link && link.startsWith("https://en.wikipedia.org/wiki/")) {
    const source = document.title.replace(/ - Wikipedia/g, "");
    fetch(link)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const target = doc.title.replace(/ - Wikipedia/g, "");
        sendNavInfo(source, target);
      })
      .catch((error) => {
        console.error("Failed to fetch target article data:", error);
      });
  }
}

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", handleClickEvent);
});
