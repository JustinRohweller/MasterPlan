// WHAT'S NEXT?
// TODO: make Today button it's own thing.

// TODO: alias files ie. import YO from "@components/yo";
// even further, src/screens;
// TODO: have default for if they don't have dependencies
// Make what we have GOATED AND REUSEABLE.
// orange/sunset theme.
// get picture of beach off internet as background
// sun setting, person on beach.
// planned end time and actual.
// project home should be on a separate screen.
// needs more space, split screen.
// need animatedProps to left/rightAccessortry things actions
// most imp stuff bottom grow. (bottom right most used.)
// bottom bar 2 bubbles start/time
// end be editable time on diff screen.
// have end be editable.
// tell me how long break was (diff screen).

// https://itnext.io/how-to-make-a-visual-studio-code-extension-77085dce7d82

// slider view for amount worked by project.

//

// BIT INSTRUCTIONS:=======================================
// TODO: try new project and download our components into it.
// ALSO add bit into other projects.
// new project
// https://bit.dev/docs/getting-started/installing-bit/installing-bit
// had to look at their docs to update path.
// https://bit.dev/docs/reference/using-bvm#troubleshooting
// bit init (if you have it installed.)
// then followed this after. (update workspace file.)
// basically edit workspace file.
// https://brandres.medium.com/using-bit-dev-for-react-native-component-management-f018213e354a

// MIGHT BE ABLE TO GET GLOBAL STUFF WORKING WITH THE LIB:
// HOW TO ADD A COMPONENT TO BIT:

// CREATE COMPONENT =============
// bit add res/molecules/Stext
// bit compile
// bit start
// bit tag --all --message "first version" --force-deploy => track the things
// bit export => put in cloud

// IMPORT COMPONENT =============
// bit install @nameofcomponent => imports it like a library
// bit import teambit.base-ui/input/button --path random/directory => installs like you copy/pasted into directory.

// ideally a component only relies on node_modules and other BIT components.
// best practices:
// https://bit.dev/docs/workspace/tracking-components
// if not, we'll need to give it an override:
// https://bit.dev/docs/workspace/variants#exclude-directories/components-from-a-rule
// https://legacy-docs.bit.dev/docs/overrides#overrides-in-workspace-configuration

// "teambit.component/issues": {
// "ignoreIssues": ["UntrackedDependencies"]
// },

// just forced the damn deploy because of our COLORS and DEFAULT_FONT.
// basically, we only are using bit as a tool to
// quickly add/update/reuse componeents.
// bit tag --all --message "first version" --force-deploy

// TODO: different day: make it actually use bit the way they want.
// ie. put colors into component (DOABLE)
// put default font into component (SOMEWHAT DOABLE?)
// would need to have some special configuration, like initApp
// and then initApp would receive defaultFont as a prop?
// or maybe just have a component DEFAULT_FONT,
// that has different variations by project?
// or LITERALLY HAVE IT BE FONTFAMILY BRANDON component? eh.

// guide on making reuseable:
// https://github.com/Tallyb/reusable-components-styleguide

// ========================================================

// TODO: TRY =+++++++++++++
// TRY BIT.DEV
// TRY MOTI more!
// TRY REACT NATIVE SKIA!
// TRY TESTING
// Do config plugin and native code
// TRY AI! Autofill time guesses?!
// excuse to use SWR firestore?
// https://moti.fyi/interactions/overview
// TODO: make our default buttons be cool. ie. touchableopacity.
//
// -day start => day end.
// break start => break end DONE :D

// page has:
// -day start at top, num hrs autofilled. (add numhours to project settings)
// => breaks in middle.
// -how much time on breaks near bottom.
// => gives day end at bottom.

// INVERT THAT>

// LATER
// -project editable settings.
// -reminder when to take a break?
// GRAPHS

// General:
// click publish => have it be done.
// have script for start project,
// newhook, newscreen, newfeature.
// have images, assets, ect. all be auto figured out/imported.
// have better saving/reusing of components.
// ignore the scripts in that directory with:
// https://stackoverflow.com/questions/52059366/how-to-exclude-directory-from-getting-bundled-by-webpack
// give evan a direct task.

// revenuecat has IAP for EAS

// TODO: plan:
// do https://react-query.tanstack.com/comparison
// SWR OR REACT-QUERY
// https://blog.logrocket.com/caching-clash-useswr-vs-react-query/
// react query seems better but so close that swr firebase lib would be good
// worth learning both.
// react native chatty

// bug report page like todays todos in app?
// moti for stuff?
// seamless header same background.
// do bidirectional-infinite-scroll
// more color, dark mode.

// GLOBAL STATE:
// https://www.youtube.com/watch?app=desktop&v=seU46c6Jz7E
// - really there's client (local) and server (remote).
// CLIENT STATE:
// forms:
//    one-page => formik
//    multi-page => context + pass info?/make into one page.
// non-forms
//   item => item details
//     pass id, react query with id.
//   user data
//      react query/swr
//

// every screen should have api/hook/component

// cool time picker:
// make their timer picker for hours/time.
// but, if they press/not scroll, they enter the time.

// STEP 1: FUNCTIONALITY. (Just make sure one break is working totally correctly.)
//       DO ONE LINE AT A TIME.
//       IE. Do time left
// STEP 2: UI
// TODO: make auto-update script
// DO TESTING.
// Add settings screen.

// TODO: make expo publish script: ie. npm install -g expo-cli, then publish.

// doesn't correctly progress in background?
// it seems like it works fine, just add time elapsed.

// IT INCORRECTLY SAYS: "Time left: 1 minute, ect." when it already send me a notification.
// then when i go back to other screen and back again then it correctly refreshes.

// Bug report page in app? like todays todos?

// tests, debugging, native code, etc.

// PNPM is cool, but not working right yet, soon.
// maybe try it again another time.
// https://github.com/pnpm/pnpm/issues/3731
// mainly with config plugins as far as I can tell.

// I think load on scroll is the strat.

// have buidl command increment number in app.json
// ie. run newbuild no transparency update build number, mayibe install expo-cli
// eas build auto submit.

// finish project home
// navigate to project settings.
// delete project
// edit all properties there.

// --------------------------------------OTHER--------------------------------------
// https://callstack.github.io/react-native-paper/getting-started.html
// https://www.shortcutfoo.com/app/dojos/javascript-arrays/cheatsheet

// https://www.shortcutfoo.com/app/dojos/javascript-arrays/cheatsheet

// TODO: idea: different app icons for statuses?
//

// TODO: Actually build the app!
// try list libs + fun libs
// So, the debugger
// shows the variables at a particular point in your code.
// after an event has happened.
// Probably should use it.

// Do partial imports
// https://medium.com/a-young-devoloper/analyzing-and-reducing-react-bundle-size-bb2d2577b22a
// TODO: the plan:
// want to only have Simage, Sview, Spacer, Stext, Sbutton, Sinput, CustomWrapScrollView
// can leave in the other libs, but the plan is to phase them out. (ie. don't use them.)

// TODO: trying out react-native-big-list.
// seems like it's between that and recyclerview and bidirectional-infinite-scroll.
// trying out:
// https://github.com/marcocesarato/react-native-big-list
// Also seems that maybe bidirectional scroll might be possible:
// https://expo.canny.io/feature-requests/p/android-maintainvisiblecontentposition-on-flatlist

// vasern is no longer maintained
// watermelondb has native configuration steps
// realm doesn't work with web, heard it's bugged
// eh it could be ok maybe.
// https://expo.canny.io/feature-requests/p/realm
// rest are less popular (Not trying to use sqlite)
// The main ones seem like: (sqlite is wiinning but eh)
// mmkv one, then realm, then watermelon,
// https://rnmmkv.vercel.app/#/gettingstarted

// THis lib seems nutty:
// https://github.com/nandorojo/swr-firestore

// why abandoned context stuff.
// is a fine idea for a real database, but not for a local one.
// One reason is so we can have a single source of truth for the data.
// other reason is that we want to have logs be specific to projects.
// ie. project "ABC", we'd store "logs_ABC" as a bunch of objects
// then we'd just be updating that list, instead of all the lists.

// they said to not use worklets for the most part.
// ie. if you're doing it right, not many worklets.

// ==================LATER WANTS =================================
// Expo IAP
// Testing (jest, ect.)
// get good with figma, svg, reanimated(moti)

//  ==================BELOW IS JUST INFO =================================
// So expo run:ios is the same as creating a build with eas.
// BASICALLY, DO EXPO RUN:IOS BUT DON'T TOUCH IOS FOLDER.
// JK, EAS I believe let's you have it on there like without an initial build.
// eas build way is just way more convolluted.

// EAS build dev way: create build (takes long time) =>
// do weird profile ios stuff =>
// expo start =>
// scan qr code with camera =>
// opens.

// expo run:ios way:
//

// https://itnext.io/how-to-make-a-visual-studio-code-extension-77085dce7d82

// seems like the play is:
// 1. get app on phone with expo run:ios
// 2. run expo start --dev-client to run it/test.
// 3. if you update native libs run expo run:ios
// 4. when you want to get a build up, delete ios folder, run eas build.
//
// basically eas says, let's build their sheet and not show them.
//
// then can run app with expo start --dev-client

// Plan: literally copy this project. script that does so.
// compare list libs, maybe want the multiscroll one.
// compare fast image Libs
// eas attempt (it works, sick :D)
// react native web. (eh, yes it works but let's not focus on it)

// moti also is pretty cool i believe.
// dripsy is actually sick

// Automate exact app copy creation. (eh just git clone?)

// If you want to make a new library,
// you clone and go from there:
// https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository

// useLayoutEffect for instant ui changes.
// api, hook (connector), ui

// Libs to consider (native):
// IAP
// https://docs.expo.dev/versions/latest/sdk/tracking-transparency/
//
// Libs to consider (general):
// compare the fast/cached images!

// startup time
// https://github.com/doomsower/react-native-startup-time#readme
// react native stream chat tutorial for better chat.
// TODO: definitely try this one:
// https://github.com/GetStream/react-native-bidirectional-infinite-scroll
// https://github.com/benevbright/react-navigation-collapsible
// https://github.com/georstat/react-native-image-cache
// https://github.com/WrathChaos/react-native-progressive-fast-image
// fast image
// regular image

// https://github.com/swushi/react-native-input-outline
// https://github.com/dev-yakuza/react-native-image-modal#expo
// https://github.com/rdhox/react-native-smooth-picker
// https://github.com/SrBrahma/react-native-shadow-2
// sqllite with graphql
// https://github.com/kubilaysalih/react-native-customizable-toast
// https://github.com/mrousavy/react-native-mmkv (fast asyncstorage)
// moti
// https://mobily.github.io/stacks/docs/hooks/use-responsive-prop

// IOS apparently isn't going to allow IAP
// but instead will have links for other payment options
// ie. we can have Pay with Apple: 13 bucks
// And pay with my unique link: 10 bucks - link takes them outta there.
// Basically means we still gotta use IAP trash.

// empty project is 585 kb (17%)
// eva icons is large: 448 kb. maybe use only expo-icons?
// usually eva icons is not enough anyway.
// the @expo/vector-icons takes much less space,
// and I feel it's better.

// list of libraries, info:
// https://reactnative.directory/?expo=true

// look at how libraries impact app size + startup time.
// For every 6 MB increase to an APK’s size, we see a decrease in the install conversion rate of 1%.
// https://medium.com/swlh/how-we-reduced-our-react-native-app-size-by-60-with-a-few-simple-fixes-3d59adc2ed3d
// Maybe better to start with all libs in, and then take out stuff?
// Nah, best is to just install as needed.
// reusability > optimization.

// github info:
// VERY IMPORTANT GITHUB TOKEN, use as your password when you clone stuff.
// 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

// contextselector info:
// In the future, we’ll be using useContextSelector. I’m happy to get used to that now.
// Using lib.
// https://github.com/dai-shi/use-context-selector
// https://github.com/facebook/react/issues/15156#issuecomment-474590693
// https://github.com/reactjs/rfcs/pull/119

// dynamic imports info:
// https://github.com/facebook/react-native/issues/14716
// https://github.com/facebook/metro/issues/52
// I don't think we want to be doing this for the other files
// as in, for now can just leave files in, take out as needed.
// If you wanted to try it again.
// https://github.com/facebook/react-native/issues/14716

// script issue info:
// "type": "module",
// to package.json so I could run scripts.
// jk don't do that do this link
// https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension

// can't run cli link:
// https://github.com/expo/expo-cli/discussions/590
// jcli run createBrandNewProject

// THESE ARE POSSIBLY NOT UP TO DATE
// @react-navigation/native, @react-navigation/stack, @sentry/react-native,
//  @shopify/react-native-skia, dripsy, formik, moment, moti, nanoid,
//  react-native-fast-image, react-native-keyboard-aware-scroll-view,
//  react-native-mmkv, react-native-mmkv-storage, react-native-paper,
//  react-native-toast-notifications,
// recyclerlistview, scheduler, use-context-selector, yup, react-native-bundle-visualizer

// Plan copied from paper:
// Home screen: list of projects
// Project Settings: standard break length, alert me in? "History" Button to all breaks history.
// Project Home: No breaks started: start now, started at =>
// Started At Screen: Time picker, submit, cancel, "Break started at"
// Project home: => started at 8:02, ends in 5 minutes, at 8:07 (Bottom is END NOW)
// Project home: => started at 8:02, should have ended 5 minutes ago at 8:07 END NOW
//
