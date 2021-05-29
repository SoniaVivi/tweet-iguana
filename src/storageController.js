const defaults = {
  size: "orig",
  path: "tweet-iguana",
  "restricted-content": "true",
};

export const saveOption = (option, newValue) =>
  browser.storage.local.set({ [option]: newValue });

export const loadOption = (option) =>
  browser.storage.local
    .get(option)
    .then((data) =>
      !Object.keys(data).length > 0 ? defaults[option] : Object.values(data)[0]
    );
