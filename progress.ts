/*
THE PLAN:
Make constants into bit usable components.

THEN: update components in bit.
THEN: try downloading in bit.

====================BIT====================
// CREATE COMPONENT =============
// WHAT I ACTUALLY DID:
// bit init
// change "packageManager": "teambit.dependencies/yarn", in workspace.jsonc
// Set "defaultScope": "jrohweller.beastly" in workspace.jsonc
// idk if matters but=> "name": "mybitworkspace",
// bit login
// bit add src/molecules --namespace ui (IMPORTANT!!!!!)
// bit tag --all --message "second version molecules"
// can do --force-deploy if needed. ^
// bit export
// 

// THEN: OTHER FILE: bit install @jrohweller/mycomponents.ui.molecules

// IMPORT COMPONENT =============
// bit init
// change "packageManager": "teambit.dependencies/yarn", in workspace.jsonc
// bit install @jrohweller/mycomponents.ui.molecules

// 
// bit import @my-scope/jrohweller.beastly.molecules
// bit install @nameofcomponent => imports it like a library
// bit import teambit.base-ui/input/button --path random/directory => installs like you copy/pasted into directory.
https://bit.dev/docs/components/importing-components

https://stackoverflow.com/questions/66384138/im-trying-to-reinstall-expo-cli-package-globally-with-the-command-sudo-npm-inst

// 

// 

// 

-molecules DONE
-constants 
-root
-navigator
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
