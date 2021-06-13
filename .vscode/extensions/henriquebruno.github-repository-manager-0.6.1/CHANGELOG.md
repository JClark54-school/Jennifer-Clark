# Change Log : GitHub Repository Manager

## 0.6.1 - Feb 03, 2020

- Fixed [#15](https://github.com/SrBrahma/GitHub-Repository-Manager/issues/15).
- Fixed [#21](https://github.com/SrBrahma/GitHub-Repository-Manager/issues/21). Thanks for the issue, [xCONFLiCTiONx](https://github.com/xCONFLiCTiONx)!
- Updated dependency packages.

## 0.6.0 - Aug 29, 2020

- Fixed breaking bug in Windows. It was not allowing opening the cloned repos. (in [#13](https://github.com/SrBrahma/GitHub-Repository-Manager/issues/13), but isn't actually the original error in [#13](https://github.com/SrBrahma/GitHub-Repository-Manager/issues/13). [#13](https://github.com/SrBrahma/GitHub-Repository-Manager/issues/13) looks a VsCode bug in revealFileInOs using the current focused file instead of the provided file path (https://github.com/microsoft/vscode/issues/87804).)

Sorry, Windows users. It scares me when I think about how much time it has been happening. I will also fix the ugly repository tooltip spacing.

- Removed the cloned repository "Open Containing Directory" icon for now until VsCode fixes the API (https://github.com/microsoft/vscode/issues/105666). It can still be accessed with the right-click menu.

- Renamed aux.ts files to utils.ts. Windows doesn't allow 'aux' files.

- Fixed infinite 'Loading...' on error ([#12](https://github.com/SrBrahma/GitHub-Repository-Manager/issues/12)). Also, if "git.defaultCloneDirectory" is not set, a message will be displayed under Cloned tree view.

- Fixed some other minor stuff

## 0.5.0 - Aug 06, 2020

Added support to organizations repositories ([#10](https://github.com/SrBrahma/GitHub-Repository-Manager/pull/10))! You will need to re-OAuth again or add the 'org:read' to your Personal Acess Token permissions.

Many thanks to [jonathan-fielding](https://github.com/jonathan-fielding) for this feature!


## 0.4.0 - Jul 08, 2020

Added 'one click to clone' setting ([#7](https://github.com/SrBrahma/GitHub-Repository-Manager/pull/7))

Added support to SSH cloned repositories to be found ([#9](https://github.com/SrBrahma/GitHub-Repository-Manager/pull/9))

Thanks to [jonathan-fielding](https://github.com/jonathan-fielding) for both pull requests!


## 0.3.6 - May 22, 2020 -> Today was the day of quick and small changes.

Reworked the Repositories Tree View Item Tooltip. Looks better now. Unfortunatelly, the ":" aren't perfectly alignable, as the font is not monospaced. Yeah, it annoys me too. We have to accept it!!

<img src="https://raw.githubusercontent.com/SrBrahma/GitHub-Repository-Manager/master/images/CHANGELOG_md/0_3_6.png" alt="0.3.6">


## 0.3.5 - May 22, 2020

Clone command seems to be fully fixed. Now, on repository commit, it will have "master" as the default destination.


## 0.3.4 - May 22, 2020

Quick fix on Activity Bar name. It was still being called GitHub Repository Loader (early name) instead of Manager.


## 0.3.3 - May 22, 2020

Fixed private repositories not showing as private.

Added "Created" and "Updated" dates on repository tooltip.

Fixed "Git fatal no configured push destination" on a cloned repository push


## 0.3.2 - May 16, 2020

Added "Copy Repository URL" on repository right-click menu


## 0.3.1 - May 16, 2020

Fixed donate button centering in Visual Studio Marketplace web page.


## 0.3.0 - May 15, 2020

<img src="https://raw.githubusercontent.com/SrBrahma/GitHub-Repository-Manager/master/images/CHANGELOG_md/0_3_0.png" alt="0.3.0">

Added Show Repository Commands Icons and a setting for it. ([#3](https://github.com/SrBrahma/GitHub-Repository-Manager/issues/3))

Thanks for the idea, hediet!


## 0.2.7 - May 12, 2020

Fixed username.github.io repositories not being found by the Cloned Repository Searcher. Thanks, u/tHeSiD!


## 0.2.1 ~ 0.2.6 - May 11, 2020

Quick README fixes.

Logo updated again. I looked at my screen while I was a little slid in the chair and I got this idea of the gradient. "Blue gradient. Nice. Now let's add pink or purple." and I kept moving two linear gradients and changing its colors until it looked nice on both of my monitors. lol


## 0.2.0 - May 11, 2020

Fixed Cloned Repositories Search not working with some remotes.

Changed project logo.

Improved README.

- Added usage .gif (that took my time to get it "ok"!)

Added error message if the extension can't open the OAuth callback server.

Changed REST requests to Graphql. Reduces network usage, reduces time to retrieve the data and also now shows the "Fork of" information when hovering a repository.


## 0.1.1 - May 6, 2020

Quick fixes


## 0.1.0 - May 6, 2020

First release


<br/>

# Donation

Help me to keep and improve this project!

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6P2HYMMC2VWMG)
