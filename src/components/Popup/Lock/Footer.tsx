import { useEffect, useState } from "react";
import { HashLoader as HashSpinner } from "react-spinners";

// @ts-expect-error no check
import cryptoWorker from "../../../worker/crypto?worker&url";
import { getLocalStorage } from "../../../utils/storage";

export default function Footer() {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (password === "") return;
    setLoading(true);
    const worker = new Worker(cryptoWorker, { type: "module" });
    worker.onmessage = async (event) => {
      const { result, error } = event.data;
      if (result) {
        alert(result);
      } else if (error) {
        alert(error);
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