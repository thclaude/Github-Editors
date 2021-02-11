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

  const filteredLanguages = languages.filter((label) => {
    const languagePercentage = parseFloat(label.match(LANGUAGE_REGEX)[2]);
    return languagePercentage >= MINIMUM_PERCENTAGE;
  });
  return filteredLanguages.map((lang) => lang.replace(LANGUAGE_REGEX, "$1"));
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

const getCodeSandboxURL = () => {
  const currentRepo = getRepoURL();
  return currentRepo.replace("github", "githubbox");
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
  return lastNavbarChild.querySelector("#ghe-buttons") !== null;
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
    "BtnGroup-item",
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

const generateJetbrainsButtons = () => {
  const jetbrainsButtons = [];
  const jetbrainsIDELabels = getJetbrainsIDELabels();
  for (let ideLabel of jetbrainsIDELabels) {
    const currentTool = JETBRAINS_TOOLS[ideLabel];
    const jetbrainsButton = generateButton(
      "all",
      currentTool.icon,
      getJetbrainsURL(currentTool.tag),
      `Clone in ${currentTool.name}`
    );
    jetbrainsButtons.push(jetbrainsButton);
  }
  return jetbrainsButtons;
};

const generateButtonsGroup = (showJbButtons) => {
  const buttonsGroup = document.createElement("div");
  buttonsGroup.classList.add("mr-2", "d-inline-flex", "BtnGroup");
  buttonsGroup.id = "ghe-buttons";

  const vscodeButton = generateButton(
    "right",
    ICONS.vscode,
    getCloneURL(),
    "Clone in VSCode"
  );
  const github1sButton = generateButton(
    "left",
    ICONS.github,
    getViewURL(),
    "Open in GitHub1s"
  );
  const codesandboxButton = generateButton(
    "all",
    ICONS.codesandbox,
    getCodeSandboxURL(),
    "Open in CodeSandbox"
  );

  buttonsGroup.append(vscodeButton);

  if (showJbButtons) {
    const jetbrainsButtons = generateJetbrainsButtons();
    jetbrainsButtons.forEach((jetbrainsButton) =>
      buttonsGroup.append(jetbrainsButton)
    );
  }

  buttonsGroup.append(codesandboxButton);
  buttonsGroup.append(github1sButton);

  return buttonsGroup;
};

const insertButtons = async () => {
  const button = getCodeButton();
  if (button && !isAlreadyAdded()) {
    const showJbButtons = await showJetbrainsButtons();
    const buttonsGroup = generateButtonsGroup(showJbButtons);
    button.prepend(buttonsGroup);
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
