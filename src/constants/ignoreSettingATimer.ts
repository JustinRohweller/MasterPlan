import { Platform, InteractionManager } from "react-native";

const mySetTimeout = global.setTimeout;
const myClearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;

export const ignoreSettingATimer = {
  ignore() {
    if (Platform.OS === "android") {
      // Work around issue `Setting a timer for long time`
      // see: https://github.com/firebase/firebase-js-sdk/issues/97
      const timerFix = {};
      const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
          InteractionManager.runAfterInteractions(() => {
            if (!timerFix[id]) {
              return;
            }
            delete timerFix[id];
            fn(...args);
          });
          return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = mySetTimeout(
          () => runTask(id, fn, ttl, args),
          afterTime
        );
      };

      global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
          const ttl = Date.now() + time;
          const id = `_lt_${Object.keys(timerFix).length}`;
          runTask(id, fn, ttl, args);
          return id;
        }
        return mySetTimeout(fn, time, ...args);
      };

      global.clearTimeout = id => {
        if (typeof id === "string" && id.startsWith("_lt_")) {
          myClearTimeout(timerFix[id]);
          delete timerFix[id];
          return;
        }
        myClearTimeout(id);
      };
    }
  },
};
