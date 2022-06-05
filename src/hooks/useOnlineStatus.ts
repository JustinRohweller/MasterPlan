import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, onDisconnect } from "firebase/database";

const useOnlineStatus = () => {
  // Assuming user is logged in
  const { currentUser } = getAuth();
  const asyncFunc = async () => {
    if (currentUser) {
      const db = getDatabase();
      const reference = ref(db, `/online/${currentUser.uid}`);

      // Set the /users/:userId value to true
      await set(reference, true);
      // Remove the node whenever the client disconnects
      await onDisconnect(reference).remove();
    }
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  return;
};

export default useOnlineStatus;
