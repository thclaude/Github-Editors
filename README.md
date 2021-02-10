# VSCodeGithub

Adds useful buttons on repos' homepage to clone in VSCode or open in GitHub1s.

## Installation

### Unpacked method (easiest)

- Get the repo
- Go to Extensions' settings
- Activate Developer mode if it's not done yet
- Load unpacked extension

### CRX and Whitelist through Policies

- Get the .crx
- Go to Extensions' settings
- Drop the .crx on this page
- Whitelist the extension with regedit (according to this [tutorial](https://techjourney.net/chrome-edge-disables-crx-installed-extensions-workarounds-to-turn-on/)) :
  1. Locate the extension and save the ID, which is in the format of long string (e.g. abcdefghijklmnopqrstuvwxyz).
  2. Run Registry Editor (regedit)
  3. Navigate to the following registry key :
      - Chrome: `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome`
      - Edge: `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge`

  4. Create a new key :
      - Chrome: Right click on **Chrome** and select **New -> Key**, and name the new key as `ExtensionInstallWhitelist`.
      - Chrome: Right click on **Edge** and select **New -> Key**, and name the new key as `ExtensionInstallAllowlist`.
  
  5. Right click on the new key (*ExtensionInstallWhitelist* or *ExtensionInstallAllowlist*) and select **New -> String Value**. Name the new value with a sequential number, starting with 1, 2, 3, and so on. So if it’s the first extension to be allowed, name the new value as “1”.

  6. For the value data, enter the ID of the extension you copied 1st step so that the values look like: `1 REG_SZ abcdefghijklmnopqrstuvwxyz`

  7. Restart the browser and it's done!

## Preview

![Preview](https://s2.gifyu.com/images/preview-repo21a47ec3d564d16a.gif)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
