/*
THE PLAN:
-see if you can get solito running. if it runs, use for new breaktime.
-try Firebase swr  lib
-Make breaktime app, with cool button => custombutton
-document new project pains.
- try the idea: 1 root alert component 
that takes in what to render.
-try perf lib
-This helps decide what next.

-very common components =>
  customheaderedcontainer.
  custombutton --use moti and stuff to make cool button.
  customwrapscrollview
-try changing the name to be after "n" for node_modules. 
-ie. change scope to: personal
-ie. don't name it mycomponents
-make root example you download and use.
// ie. take the actual file you are using that relies on those, export it.

THEN: later within our new root, we can have these as "illegal" stuff 
that we can import directly

// CONTEXT RE-RENDERS ALL OF THE CONSUMER'S CHILDREN => 
// keyword: CONSUMER, not the provider
// also keyword: IF THE STORE CHANGES.
// IE. seems like it's still good for DEFAULT GLOBAL PROPS
// todo: check if too many contextproviders causes lots of re-renders
// going to literally just try it for a project.
// all consumers of context will re-render if the store changes.
// ie. we want to be having few consumers.

// Going to try this method.
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
// if issue, delete it out of .bitmap.
// can do --force-deploy if needed. ^
// bit export
// 
// stick this in workspace.jsonc if you want to make example components
//   "teambit.component/issues": {
    // "ignoreIssues": ["ImportNonMainFiles", "UntrackedDependencies"]
  // },

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

// ADD STUFF YOU USE THE MOST FIRST =============
// ie. what do I use in every project, how often do I use it within a project.

-molecules DONE
-constants DONE
-navigator DONE pt 2 => instance of it NOT DONE
-root pt 1 DONE, pt 2 => instance of it NOT DONE
-api DONE
-hooks => DONE
-very common compoenents =>
      customcontentcontainer => maybe should make defaults
      customwrapscrollview
      custombutton
-scripts => likely will be doing pt 2 above? no, just bit components.

-common instances of stuff from above
-BUILD APP! breaktime, have it able to export hrs/timesheet.
-any random stuff (components, then features, then maybe screens (loginscreen, ect.))

-dripsy lets us typecheck our propvalues.

-idea for stack: heroku + prisma? hasura seemed ok, firebase seemed ok.

// revisit nandorojo stuff. solito, ect.
-later => make it into a web version/try making a monorepo where you copy over.

-make scripts to help make libraries.
ie. script that copies code over, and publishes.

-make scripts, constants, molecules, root, navigator.
and scripts to make those.

ON SAVE:
-format, remove unused imports, format imports, import needed DONE
-remove unused styles NOT A BIG DEAL AT THE MOMENT, SHOULD USE INLINE STYLES

COMMIT:
-ctrl + shift + S
-have commit command with vscode
-on successful commit, push.

GIT HOOKS:
git hooks are good I think too for code cleanup.
-Do all of ON SAVE stuff, but for entire codebase.

SCRIPTS:
-remove unused exports/files/folders/libraries

VSCODE EXTENSIONS:
-hover over import name to right click to docs. (built, but would need to make into new lib)
-remove unused styles

*/
