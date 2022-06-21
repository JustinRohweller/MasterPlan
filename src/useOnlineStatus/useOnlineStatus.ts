import { getAuth } from "firebase/auth";
import { getDatabase, onDisconnect, ref, set } from "firebase/database";
import { useEffect } from "react";

const useOnlineStatus = () => {
  const { currentUser } = getAuth();
  const asyncFunc = async () => {
    if (currentUser) {
      const db = getDatabase();
      const reference = ref(db, `/online/${currentUser.uid}`);

      await set(reference, true);
      await onDisconnect(reference).remove();
    }
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  return;
};

export default useOnlineStatus;
