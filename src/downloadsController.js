import { loadOption, saveOption } from "./storageController";

const downloadsController = (() => {
  let _size = "orig";
  let _downloadPath = "tweet-iguana";
  let _restrictedContent = "true";

  const _getFilename = (url) =>
    url.match(/video/) == null
      ? `${url.match(/([A-Z])\w+/)[0]}.${url.match(/(?<=\=)(.*)(?=\&)/)[0]}`
      : url.match(/([A-Z])\w+.+/)[0];

  const _watch = (message) => {
    if (message == 444) {
      return Promise.allSettled(_loadOptions()).then(_messagePreferences());
    } else if (message == 333) {
      return _messagePreferences();
    }
    _download(message);
  };

  const _messagePreferences = () =>
    browser.tabs.query({}).then((tabs) => {
      for (const tab of tabs) {
        return browser.tabs.sendMessage(tab.id, {
          size: _size,
          restrictedContent: _restrictedContent,
        });
      }
    });

  const _download = (urls) => {
    const attachmentData = [];
    urls.forEach((url) =>
      attachmentData.push({ filename: _getFilename(url), url: url })
    );
    for (const data of attachmentData) {
      browser.downloads
        .download({
          url: data.url,
          filename: _downloadPath + "/" + data.filename,
          conflictAction: "uniquify",
          saveAs: false,
        })
        .then((response) => console.log(`Successfully download ${response}`))
        .catch((e) => console.log(e));
    }
  };

  const _loadOptions = () => [
    loadOption("size").then((val) => (_size = val)),
    loadOption("path").then((path) => (_downloadPath = path)),
    loadOption("restricted-content").then(
      (val) => (_restrictedContent = val == "true" ? true : false)
    ),
  ];

  const start = () => {
    browser.runtime.onMessage.addListener(_watch);
    _loadOptions();
  };

  return { start };
})();

downloadsController.start();
