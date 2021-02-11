// Saves options to chrome.storage
const saveOptions = () => {
  const showJetbrainsButtons = document.getElementById("show-jetbrains-buttons")
    .checked;
  chrome.storage.sync.set({ showJetbrainsButtons }, function () {
    // Update status to let user know options were saved.
    const status = document.getElementById("ghe-status");
    status.innerText = "Saved";
    setTimeout(() => {
      status.innerText = "";
    }, 850);
  });
};

const updateShowJetbrainsButtonsStatus = () => {
  const isChecked = document.getElementById("show-jetbrains-buttons").checked;
  document.getElementById("show-jetbrains-buttons-status").innerText = isChecked
    ? "Yes"
    : "No";
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    {
      showJetbrainsButtons: true,
    },
    (items) => {
      document.getElementById("show-jetbrains-buttons").checked =
        items.showJetbrainsButtons;
      updateShowJetbrainsButtonsStatus();
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreOptions);

document
  .getElementById("ghe-save-button")
  .addEventListener("click", saveOptions);

document
  .getElementById("show-jetbrains-buttons")
  .addEventListener("click", updateShowJetbrainsButtonsStatus);
