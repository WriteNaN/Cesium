// Please don't ask me why it's done here

import React, { useEffect, useState } from "react";
import { ClipLoader as HashSpinner } from "react-spinners";
import { wallet } from "multi-nano-web";

// @ts-expect-error no check
import cryptoWorker from "../../../worker/crypto?worker&url";
import { getLocalStorage, setSessionValue } from "../../../utils/storage";

export default function Footer({
  shouldCall,
  setShouldCall,
  setInvalidPass,
  setLoggedIn
}: {
  shouldCall: boolean;
  setShouldCall: React.Dispatch<React.SetStateAction<boolean>>;
  setInvalidPass: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (password === "") return;
    setLoading(true);
    const worker = new Worker(cryptoWorker, { type: "module" });
    worker.onmessage = async (event) => {
      const { result, error } = event.data;
      if (result) {
        try {
          const res = wallet.fromSeed(result); // just double check :D
          setInvalidPass(false);
          setSessionValue("masterSeed", res.seed);
          setTimeout(() => { setLoggedIn(true) }, 100); // worst case, or your browser is bad for your pc's health;
        } catch {
          console.error("corrupted seed!");
          setInvalidPass(true);
        }
      } else if (error) {
        console.error("invalid password!");
        setInvalidPass(true);
      }
      setLoading(false);
    };
    async function decryptData() {
      worker.postMessage({
        action: "decrypt",
        payload: {
          encryptedMasterSeed: await getLocalStorage("encryptedMasterKey"),
          password,
        },
      });
    }
    decryptData();
  }, [password]);

  const handleUnlock = () => {
    // @ts-expect-error unlock
    const elem = document.getElementById("unlock-pass").value;
    if (!elem || elem === "") return;
    setPassword(elem);
  };

  useEffect(() => {
    if (shouldCall) {
      setShouldCall(false);
      return handleUnlock();
    }
  }, [shouldCall]);

  return (
    <div className="lockscreen-footer">
      <div className="w-full" tabIndex={0}>
        <button
          formTarget="unlock"
          style={{ fontWeight: 600 }}
          className="unlock-button"
          onClick={handleUnlock}
        >
          Unlock
        </button>
      </div>
      {loading && (
        <div className="absolute inset-0 !z-50 flex !h-screen !w-screen items-center justify-center bg-black/90">
          <HashSpinner size={80} color="#ffffff" loading={loading} />
        </div>
      )}
    </div>
  );
}
