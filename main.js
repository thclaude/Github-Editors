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

const getCodeButton = () => {
  const navbar = document.querySelector(".file-navigation");
  return navbar.lastElementChild;
};

const generateButton = (flatSide, image, link) => {
  const linkElement = document.createElement("a");
  linkElement.classList.add(
    "btn",
    "d-flex",
    "flex-items-center",
    `rounded-${flatSide}-0`
  );
  linkElement.innerHTML = `<img src="${image}" width="16" height="16" />`;
  linkElement.href = link;

  return linkElement;
};

const generateButtonsGroup = () => {
  const buttonsGroup = document.createElement("div");
  buttonsGroup.classList.add("ml-2", "mr-2", "d-inline-flex");

  const leftButton = generateButton(
    "right",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png",
    getCloneURL()
  );
  const rightButton = generateButton(
    "left",
    "https://www.clipartmax.com/png/middle/48-483031_github-logo-black-and-white-github-icon-vector.png",
    getViewURL()
  );

  buttonsGroup.append(leftButton);
  buttonsGroup.append(rightButton);

  return buttonsGroup;
};

const button = getCodeButton();

if (button) {
  button.prepend(generateButtonsGroup());
}
