const getFullIconURL = (iconName) => {
  return chrome.runtime.getURL(ICONS_PATH + iconName);
};

const ICONS_PATH = "/img/icons/";

const ICONS = {
  github: getFullIconURL("github-icon.png"),
  vscode: getFullIconURL("vscode-icon.png"),
};

const JETBRAINS_TOOLS = {
  appcode: {
    name: "AppCode",
    tag: "appcode",
    icon: getFullIconURL("appcode-icon.png"),
  },
  clion: {
    name: "CLion",
    tag: "clion",
    icon: getFullIconURL("clion-icon.png"),
  },
  goland: {
    name: "GoLand",
    tag: "goland",
    icon: getFullIconURL("goland-icon.png"),
  },
  idea: {
    name: "IntelliJ IDEA",
    tag: "idea",
    icon: getFullIconURL("idea-icon.png"),
  },
  phpstorm: {
    name: "PhpStorm",
    tag: "php-storm",
    icon: getFullIconURL("phpstorm-icon.png"),
  },
  pycharm: {
    name: "PyCharm",
    tag: "pycharm",
    icon: getFullIconURL("pycharm-icon.png"),
  },
  rider: {
    name: "Rider",
    tag: "rd",
    icon: getFullIconURL("rider-icon.png"),
  },
  rubymine: {
    name: "RubyMine",
    tag: "rubymine",
    icon: getFullIconURL("rubymine-icon.png"),
  },
  webstorm: {
    name: "WebStorm",
    tag: "web-storm",
    icon: getFullIconURL("webstorm-icon.png"),
  },
};
