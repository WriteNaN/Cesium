import { useEffect, useState } from "react";

import PopupWrapper from "./Wrapper";
import Lockscreen from "./Lock";
import InitializeScreen from "./Initialize";

import { ClipLoader as HashSpinner } from "react-spinners";

import { getLocalStorage, getSessionValue } from "../../utils/storage";

import App from "./app";

export default function Popup() {
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isAppLoggedIn, setAppLoggedIn] = useState<boolean>(false);
  const [sessionMasterKey, setSessionMasterKey] = useState<string | null>(null);

  useEffect(() => {
    if (isAppLoggedIn) {
      (async () => {
        setSessionMasterKey((await getSessionValue("masterSeed")) || null);
      })();
    }
  }, [isAppLoggedIn]);

  useEffect(() => {
    async function checkLocalStorage() {
      try {
        const encryptedMasterSeed = await getLocalStorage("encryptedMasterKey");

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
      {!isAppLoggedIn && (
        <>
          {isLocked ? (
            <Lockscreen setLoggedIn={setAppLoggedIn} />
          ) : (
            <InitializeScreen />
          )}
        </>
      )}
      {/** If prettier didn't exist... */}

      {isAppLoggedIn && (
        <>
          {sessionMasterKey ? (
            <>
              <App />
            </>
          ) : (
            <>
              <div className="absolute inset-0 !z-50 flex !h-screen !w-screen items-center justify-center bg-black">
                <HashSpinner size={80} color="#ffffff" loading={true} />
              </div>
            </>
          )}
        </>
      )}
    </PopupWrapper>
  );
}