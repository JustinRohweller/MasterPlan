/*
THE PLAN:
Make molecules work with only packages as imports.
ie. import react-theme-provider, have defaults

THEN: update components in bit.
THEN: try downloading in bit.


====================BIT====================
// CREATE COMPONENT =============
// bit add res/molecules/Stext
// bit compile
// bit start
// bit tag --all --message "first version" --force-deploy => track the things
// bit export => put in cloud

// IMPORT COMPONENT =============
// bit install @nameofcomponent => imports it like a library
// bit import teambit.base-ui/input/button --path random/directory => installs like you copy/pasted into directory.



















































STEP 1: make molecules into a lib.
(right now it crashes)
-In order to make any library:
-first, make it run within expo project, have main folder (molecules in this case)
-Does it need other libraries?
-If not, just drag and drop into github repo, and can import the repo. Maybe isn't the best to do this anyway.
-If yes, npm init in another folder, drag and drop, install needed libraries
-https://www.twilio.com/blog/2017/06/writing-a-node-module-in-typescript.html
-change to private, npm publish
-hmm, in theory bit might be a bit easier? not sure

-TODO: honestly the keep it simple stupid principle is feeling good at the moment.
-Step 1: get it working the way we want.
-Step 2: drag and drop into github.
-Step 3: npm install githuburl.com
// then will directly say, "need to have X library installed".

-if it has expo modules in it: https://docs.expo.dev/modules/overview/

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