const helpers = (() => {
  const createElement = (options = {}) => {
    const newElement = document.createElement(options.tag);
    if ("className" in options) {
      newElement.classList.add(options.className.split(" "));
    }
    if ("textContent" in options) {
      newElement.textContent = options.textContent;
    }
    if ("href" in options) {
      newElement.href = options.href;
    }
    if ("download" in options) {
      newElement.download = options.download;
    }
    return newElement;
  };

  return { createElement };
})();

export default helpers;
