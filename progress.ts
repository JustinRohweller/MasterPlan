/*
THE PLAN:
-GO ALL IN ON DRIPSY.
-ie. molecules, then root, then other that rely on molecules
-molecules finish rewrite.
// since molecules is relied upon for other libs
-improve Sicon even more, should have Sbutton as the container.
-idea: have defaults for the components within the provider
-very common components =>
  customcontentcontainer
  customwrapscrollview
  custombutton
-try changing the name to be after "n" for node_modules.
-ie. don't name it mycomponents
-re-try Dripsy
-make root example you download and use.
// ie. take the actual file you are using that relies on those, export it.

// in general, just make your own ui for the headers
// ie. don't use UI-kitten

// the idea: 1 root alert component 
that takes in what to render.

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
      customcontentcontainer
      customwrapscrollview
-scripts => likely will be doing pt 2 above.

-common instances of stuff from above
-BUILD APP! breaktime
-test perf with that library.
-go back and improve/fix the stuff we have. (eh will do that as I build app)
-any random stuff (components, then features, then maybe screens (loginscreen, ect.))

// revisit nandorojo stuff. solito, ect.

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
