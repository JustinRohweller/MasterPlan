/*
THE PLAN:
-First, to fix bit typings.
-Add preinstall script that removes text from package.json
-Add postinstall script that adds them back.

// according to the internet, 
// running the install command might work in a regular terminal

// in general, just make your own ui for the headers
// ie. don't use UI-kitten

// the idea: 1 root alert component 
that takes in what to render.

Make 2 root components within bit.
1) global stuff.
 -i believe all the ones we want are in the folder
 -all should be components, have the hook inside.
 -ie. event => getEvent render.
-then ask for a component to render.
2) make example you download and use.
// ie. take the actual file you are using that relies on those, export it.

THEN: later within our new root, we can have these as "illegal" stuff 
that we can import directly

// 

// 

IF shit is red, do use typescript workspace version.

// after every install, may need to reinstall bit modules, ie. put in postinstall script.

====================BIT====================
// https://github.com/teambit/bit/discussions/4707
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

GIT HOOKS:
git hooks are good I think too for code cleanup.
-Do all of ON SAVE stuff, but for entire codebase.

SCRIPTS:
-remove unused exports/files/folders/libraries

VSCODE EXTENSIONS:
-hover over import name to right click to docs. (built, but would need to make into new lib)
-remove unused styles

*/
