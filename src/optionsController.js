import { loadOption, saveOption } from "./storageController";

const optionsController = (() => {
  const _findByClass = (className) => document.querySelector(`.${className}`);

  const _elems = {
    size: _findByClass("size"),
    path: _findByClass("download-path"),
    restrictedContent: _findByClass("restricted-content"),
  };

  const _getSize = () =>
    loadOption("size").then((currentSize) => {
      document.querySelector(`[value='${currentSize}']`).checked = true;
    });

  const _getPath = () =>
    loadOption("path").then((path) => (_elems.path.value = path));

  const _getRestrictedContent = () =>
    loadOption("restricted-content").then(
      (checked) =>
        (_elems.restrictedContent.checked = checked == "true" ? true : false)
    );

  const _addEventListeners = () => {
    document.querySelectorAll(`[name='size']`).forEach((e) =>
      e.addEventListener("click", () => {
        saveOption("size", e.value).then(_sendMessage);
      })
    );
    _elems.path.addEventListener("change", (e) => {
      saveOption("path", e.target.value).then(_sendMessage);
    });
    _elems.restrictedContent.addEventListener("change", (e) => {
      saveOption("restricted-content", JSON.stringify(e.target.checked)).then(
        _sendMessage
      );
    });
  };

  const _sendMessage = () => browser.runtime.sendMessage(444);

  const start = () => {
    _getSize();
    _getPath();
    _getRestrictedContent();
    _addEventListeners();
  };
  return { start };
})();

optionsController.start();
