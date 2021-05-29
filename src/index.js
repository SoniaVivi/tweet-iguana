import "./download-button.scss";
import { createElement } from "./helpers";

const tweetsController = (() => {
  let _checks = 0;
  const _attachmentsQuery = "img[src^='https://pbs.twimg.com/media']";
  const _tweetsQuery = "[data-testid='tweet']";
  const _roleQuery = "[role='group']";
  const _restrictedContentQuery = "[href='/settings/content_you_see']";
  let _size = "orig";
  let _downloadRestrictedContent = true;

  const _addButton = (rolesContainer) => {
    const buttonElem = createElement({
      tag: "button",
      className: "download-button",
      textContent: "Download Attachments",
    });
    buttonElem.addEventListener("click", () => _onClick(rolesContainer));

    return rolesContainer.append(buttonElem);
  };

  const _onClick = (rolesContainer) => {
    const tweet = rolesContainer.parentNode.parentNode;
    _openRestrictedAttachments(tweet)
      .then(() => {
        let attachments = [];
        tweet
          .querySelectorAll(_attachmentsQuery)
          .forEach((e) => attachments.push(_getLink(e)));
        browser.runtime.sendMessage(attachments).catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const _getLink = (attachment) => {
    let link = attachment.currentSrc;
    return `${link.slice(0, link.indexOf("&name="))}&name=${_size}`;
  };

  const _openRestrictedAttachments = (tweet) =>
    new Promise((resolve, reject) => {
      if (_downloadRestrictedContent) {
        tweet.querySelectorAll("span").forEach((spanElem) => {
          spanElem.textContent == "View" ? spanElem.click() : "";
        });
      }
      window.setTimeout(() => {
        resolve(true);
      }, 50);
    });

  const _findTweets = (callbacks) => {
    document.querySelectorAll(_roleQuery).forEach((rolesContainer) => {
      if (!rolesContainer.querySelector(".download-button")) {
        _hasAttachments(rolesContainer.parentNode.parentNode)
          ? _addButton(rolesContainer)
          : "";
      }
    });
  };

  const _hasRestricted = (tweet) =>
    !!tweet.querySelector(_restrictedContentQuery);

  const _hasAttachments = (tweet) =>
    !!tweet.lastChild.querySelector(_attachmentsQuery) || _hasRestricted(tweet);

  const _watch = () => {
    browser.runtime.onMessage.addListener((message) => {
      _size = message.size;
      _downloadRestrictedContent = message.restrictedContent;
    });
  };

  const start = () => {
    !_checks && browser.runtime.sendMessage(333);
    !_checks && _watch();
    _findTweets();
    _checks += 1;
    _checks >= 12
      ? window.setTimeout(start, 3750)
      : window.setTimeout(start, 100);
  };

  return { start };
})();

window.setTimeout(() => tweetsController.start(), 2000);
