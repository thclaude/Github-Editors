const getRepoURL = () => {
  return window.location.href;
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
    `rounded-${flatSide}-0`,
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
