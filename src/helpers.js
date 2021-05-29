export const createElement = (options = {}) => {
  const newElement = document.createElement(options.tag);
  for (const [key, val] of Object.entries(options)) {
    if (key == "tag") {
      continue;
    } else if (key == "className") {
      newElement.classList.add(options.className.split(" "));
      continue;
    }
    newElement[key] = val;
  }
  return newElement;
};
