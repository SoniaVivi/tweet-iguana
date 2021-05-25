const downloadsController = (() => {
  const _downloadPath = "~/Pictures/TweetIguana";

  const _getFilename = (url) =>
    `${url.match(/([A-Z])\w+/)[0]}.${url.match(/(?<=\=)(.*)(?=\&)/)[0]}`;

  const watch = (urls) => {
    const attachmentData = [];
    urls.forEach((url) =>
      attachmentData.push({ filename: _getFilename(url), url: url })
    );
    for (const data of attachmentData) {
      browser.downloads.download({
        url: data.url,
        filename: data.filename,
        conflictAction: "uniquify",
      });
    }

    //For testing

    // try {
    //   alert("Open the Browser Console.");
    // } catch (e) {
    //   console.log("alert() threw an error. Probably Firefox version < 49.");
    // }
  };

  return { watch };
})();

browser.runtime.onMessage.addListener(downloadsController.watch);
