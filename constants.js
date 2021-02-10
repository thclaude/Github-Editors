const getFullIconURL = (iconName) => {
  return chrome.runtime.getURL(ICONS_PATH + iconName);
};

const ICONS_PATH = "/img/icons/";

const ICONS = {
  github: getFullIconURL("github-icon.png"),
  vscode: getFullIconURL("vscode-icon.png"),
};
