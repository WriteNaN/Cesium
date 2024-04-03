import React from "react";

import "../../styles/forgot.css";
import { BiLockAlt } from "react-icons/bi";
import { BiX } from "react-icons/bi";

import { resetWallet } from "../../utils/storage";

export default function Forgot({
  goBack,
}: {
  goBack: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <section className="forgot-nav select-none">
        <div
          className="forgot-close-btn !text-red-500 !ml-3 hover:!bg-black !rounded-full"
          onClick={() => goBack(false)}
        >
          <BiX size={24} />
        </div>
        <div className="forgot-w">
          <p>Forgot Password</p>
        </div>
        <div />
      </section>

      <div className="forgot-c-w !p-3">
        <div />
        <section className="forgot-c-s">
          <BiLockAlt
            size={128}
            className="!mb-3 p-6 bg-black/50 rounded-full"
          />
          <p className="forgot-p-c-s-p !mb-2">Forgot Password</p>
          <p className="f-p-c">
            You can reset your password by entering your wallet's 24 word
            recovery phrase. Cesium cannot recover your password for you.
          </p>
        </section>

        <div className="w-full">
          <button
            className="f-p-c-b hover:!bg-red-400"
            onClick={() => {
              resetWallet();
              return window.location.reload();
            }}
          >
            Reset Secret Phrase
          </button>
        </div>
      </div>
    </>
  );
}
