const downloadsController = (() => {
  const _downloadPath = "tweet-iguana";

  const _getFilename = (url) =>
    `${url.match(/([A-Z])\w+/)[0]}.${url.match(/(?<=\=)(.*)(?=\&)/)[0]}`;

  const watch = (urls) => {
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
        })
        .then((response) => console.log(`Successfully download ${response}`))
        .catch((e) => console.log(e));
    }
  };

  return { watch };
})();

browser.runtime.onMessage.addListener(downloadsController.watch);
// "https://video.twimg.com/tweet_video/E1KHxzSXoAALnrh.mp4"
