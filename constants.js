const ICONS_PATH = "/img/icons/";

const getFullIconURL = (iconName) => {
  return chrome.runtime.getURL(ICONS_PATH + iconName);
};

const showJetbrainsButtons = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      {
        showJetbrainsButtons: true,
      },
      (items) => {
        resolve(items.showJetbrainsButtons);
      }
    );
  });
};

const MINIMUM_PERCENTAGE = 5.0;

const DEFAULT_LANGUAGE = "java";

const LANGUAGE_REGEX = /([a-zA-Z+-+]*) ([0-9.]*)/;

const JETBRAINS_CLONE_URL =
  "jetbrains://{tag}/checkout/git?checkout.repo={url}&idea.required.plugins.id=Git4Idea";

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

const IDE_LANGUAGES = {
  java: ["idea"],
  kotlin: ["idea"],
  groovy: ["idea"],
  scala: ["idea"],
  javascript: ["webstorm", "phpstorm", "idea"],
  coffeescript: ["webstorm", "phpstorm", "idea"],
  typescript: ["webstorm", "phpstorm", "idea"],
  dart: ["webstorm", "phpstorm", "idea"],
  go: ["goland", "idea"],
  css: ["webstorm", "phpstorm", "idea"],
  html: ["webstorm", "phpstorm", "idea"],
  python: ["pycharm", "idea"],
  "jupyter notebook": ["pycharm", "idea"],
  php: ["phpstorm", "idea"],
  "c#": ["rider"],
  "f#": ["rider"],
  "c++": ["clion"],
  c: ["clion"],
  ruby: ["rubymine", "idea"],
  rust: ["clion", "idea"],
  puppet: ["rubymine", "idea"],
  "objective-c": ["appcode"],
  swift: ["appcode"],
};
