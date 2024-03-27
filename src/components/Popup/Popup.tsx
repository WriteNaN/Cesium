// /*
import { useEffect, useState } from "react";

import PopupWrapper from "./Wrapper";
import Lockscreen from "./Lock";
import InitializeScreen from "./Initialize";

import { getLocalStorage } from "../../utils/storage";

export default function Popup() {
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    async function checkLocalStorage() {
      try {
        const encryptedMasterSeed = await getLocalStorage(
          "encryptedMasterKey"
        );

        if (encryptedMasterSeed) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
        }
      } catch (error) {
        console.error("Error checking local storage:", error);
      }
    }

    checkLocalStorage();
  }, []);

  return (
    <PopupWrapper>
      {isLocked ? <Lockscreen /> : <InitializeScreen />}
    </PopupWrapper>
  );
}
// */
/*import Lockscreen from "./Lock";
import PopupWrapper from "./Wrapper";

export default function Popup() {
  return (
    <PopupWrapper>
      <Lockscreen />
    </PopupWrapper>
  );
}
*/