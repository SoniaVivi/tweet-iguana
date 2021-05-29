const optionsController = (() => {
  const _findByClass = (className) => document.querySelector(`.${className}`);
  const _defaults = {
    size: "orig",
    path: "tweet-iguana",
    "restricted-content": "false",
  };

  const _elems = {
    size: _findByClass("size"),
    path: _findByClass("download-path"),
    restrictedContent: _findByClass("restricted-content"),
  };

  const _saveOption = (option, newValue) =>
    browser.storage.local.set({ [option]: newValue });

  const _loadOption = (option) =>
    browser.storage.local
      .get(option)
      .then((data) =>
        !Object.keys(data).length > 0
          ? _defaults[option]
          : Object.values(data)[0]
      );

  const _getSize = () =>
    _loadOption("size").then((currentSize) => {
      document.querySelector(`[value='${currentSize}']`).checked = true;
    });

  const _getPath = () =>
    _loadOption("path").then((path) => (_elems.path.value = path));

  const _getRestrictedContent = () =>
    _loadOption("restricted-content").then(
      (checked) =>
        (_elems.restrictedContent.checked = checked == "true" ? true : false)
    );

  const _addEventListeners = () => {
    document.querySelectorAll(`[name='size']`).forEach((e) =>
      e.addEventListener("click", () => {
        _saveOption("size", e.value);
      })
    );
    _elems.path.addEventListener("change", (e) =>
      _saveOption("path", e.target.value)
    );
    _elems.restrictedContent.addEventListener("change", (e) =>
      _saveOption("restricted-content", JSON.stringify(e.target.checked))
    );
  };

  const start = () => {
    _getSize();
    _getPath();
    _getRestrictedContent();
    _addEventListeners();
  };
  return { start };
})();

optionsController.start();
