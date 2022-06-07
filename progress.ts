/*
THE PLAN:
Make 2 root components within bit.
1) global stuff.
-safe area wrapper.
-have root loading, loadingcontenxt
-root error
-root popup/alert (root alert?)
-root app restart alert
-init firebase (don't fail if no firebase)
-status bar
-app store app update alert
-handle no internet
-splash keeper?
-other hooks
2) make example you download and use.
// ie. take the actual file you are using that relies on those, export it.

THEN: later within our new root, we can have these as "illegal" stuff 
that we can import directly

// 

// 

IF shit is red, do use typescript workspace version.

// after every install, may need to reinstall bit modules, ie. put in postinstall script.

====================BIT====================
// CREATE COMPONENT =============
// WHAT I ACTUALLY DID:
// bit init
// change "packageManager": "teambit.dependencies/yarn", in workspace.jsonc
// Set "defaultScope": "jrohweller.mycomponents" in workspace.jsonc
// idk if matters but=> "name": "mybitworkspace",
// bit login
// bit add src/molecules --namespace ui (IMPORTANT!!!!!)
// bit tag --all --message "constants"
// can do --force-deploy if needed. ^
// bit export
// 

// THEN: OTHER FILE: bit install @jrohweller/mycomponents.ui.molecules

// IMPORT COMPONENT =============
// bit init --reset-hard if you need to install stuff again.
// bit init
// change "packageManager": "teambit.dependencies/yarn", in workspace.jsonc
// bit install @jrohweller/mycomponents.ui.molecules
// if it succeeds, it may mess with tytpscript.
// you can do select typescript version and it'll fix it?
// also had to do: "jsx": "react-jsx", in tsconfig.json
// AFTER EVERY LIB INSTALL, need to: bit install @jrohweller/mycomponents.ui.molecules -u

// https://bit.cloud/jrohweller/mycomponents/ui/molecules/~code
https://stackoverflow.com/questions/66384138/im-trying-to-reinstall-expo-cli-package-globally-with-the-command-sudo-npm-inst

// 

// 

// 

-molecules DONE
-constants DONE
-root
-hooks
-navigator?
-scripts

-make scripts to help make libraries.
ie. script that copies code over, and publishes.

-make scripts, constants, molecules, root, navigator.
and scripts to make those.

ON SAVE:
-format, remove unused imports, format imports, import needed DONE
-remove unused styles
-make constants?

GIT HOOKS:
git hooks are good I think too for code cleanup.
-ie. clean my whole damn codebase on git hook (maybe like auto format or something)
-do all of the same stuff as on save stuff but for all files
-remove unused exports/files/folders

VSCODE EXTENSIONS:
-maybe 

*/
