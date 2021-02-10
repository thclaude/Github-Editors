const getRepoURL = () => {
  return window.location.href;
};

const getRepoLanguages = () => {
  const progressBar = document.querySelector(
    ".Progress:not(.progress-pjax-loader)"
  );
  if (!progressBar) return DEFAULT_LANGUAGE;
  const languages = Array.from(progressBar.children).map(
    (elem) => elem.ariaLabel
  );
  return languages.map((lang) => lang.replace(LANGUAGE_REGEX, "$1"));
};

const getCorrespondingIDE = (language) => {
  const mainLanguage = language.toLowerCase();
  if (!Object.keys(IDE_LANGUAGES).includes(mainLanguage))
    return IDE_LANGUAGES[DEFAULT_LANGUAGE];
  return IDE_LANGUAGES[mainLanguage];
};

const getJetbrainsIDELabels = () => {
  const repoLanguages = getRepoLanguages();
  const jetbrainsIDELabels = new Set();
  for (let language of repoLanguages) {
    const correspondingIde = getCorrespondingIDE(language);
    correspondingIde.forEach((ide) => jetbrainsIDELabels.add(ide));
  }
  return jetbrainsIDELabels;
};

const getJetbrainsURL = (tag) => {
  const currentRepo = getRepoURL();
  return JETBRAINS_CLONE_URL.replace("{tag}", tag).replace(
    "{url}",
    `${currentRepo}.git`
  );
};

const getCloneURL = () => {
  const currentRepo = getRepoURL();
  return `vscode://vscode.git/clone?url=${currentRepo}.git`;
};

const getViewURL = () => {
  const currentRepo = getRepoURL();
  return currentRepo.replace("github", "github1s");
};

const getNavbarLastElementChild = () => {
  const navbar = document.querySelector(".file-navigation");
  if (!navbar) return null;
  return navbar.lastElementChild;
};

const isAlreadyAdded = () => {
  const lastNavbarChild = getNavbarLastElementChild();
  if (!lastNavbarChild) return null;
  return lastNavbarChild.querySelector("#vscgh-buttons") !== null;
};

const getCodeButton = () => {
  const lastNavbarChild = getNavbarLastElementChild();
  if (!lastNavbarChild) return null;
  if (
    !lastNavbarChild.lastElementChild || // check if there is child
    lastNavbarChild.lastElementChild.tagName !== "GET-REPO" // check if we are @ repo homepage
  )
    return null;
  return lastNavbarChild;
};

const generateButton = (flatSide, image, link, tooltipText) => {
  const linkIcon = document.createElement("img");
  const linkElement = document.createElement("a");

  linkElement.classList.add(
    "btn",
    "d-flex",
    "flex-items-center",
    flatSide === "all" ? "rounded-0" : `rounded-${flatSide}-0`,
    "tooltipped",
    "tooltipped-s"
  );

  linkIcon.src = image;
  linkIcon.width = "16";
  linkIcon.height = "16";

  linkElement.append(linkIcon);
  linkElement.href = link;
  linkElement.setAttribute("aria-label", tooltipText);

  return linkElement;
};

const generateButtonsGroup = () => {
  const jetbrainsIDELabels = getJetbrainsIDELabels();
  const buttonsGroup = document.createElement("div");
  buttonsGroup.classList.add("ml-2", "mr-2", "d-inline-flex");
  buttonsGroup.id = "vscgh-buttons";

  const leftButton = generateButton(
    "right",
    ICONS.vscode,
    getCloneURL(),
    "Clone in VSCode"
  );
  const rightButton = generateButton(
    "left",
    ICONS.github,
    getViewURL(),
    "Open in GitHub1s"
  );

  buttonsGroup.append(leftButton);

  for (let ideLabel of jetbrainsIDELabels) {
    const currentTool = JETBRAINS_TOOLS[ideLabel];
    const ideButton = generateButton(
      "all",
      currentTool.icon,
      getJetbrainsURL(currentTool.tag),
      `Clone in ${currentTool.name}`
    );
    buttonsGroup.append(ideButton);
  }

  buttonsGroup.append(rightButton);

  return buttonsGroup;
};

const insertButtons = () => {
  const button = getCodeButton();
  if (button && !isAlreadyAdded()) {
    button.prepend(generateButtonsGroup());
  }
};

const isReady = () => {
  const readyState = document.readyState;
  return readyState === "interactive" || readyState === "complete";
};

if (isReady()) {
  insertButtons();
} else {
  document.addEventListener("DOMContentLoaded", insertButtons());
}

// https://stackoverflow.com/a/39628037
document.addEventListener("pjax:end", () => {
  insertButtons();
});
