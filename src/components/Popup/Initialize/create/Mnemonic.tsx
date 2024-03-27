import React, { Dispatch, useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { wallet } from "multi-nano-web";

import "../../../../styles/mnemonic.css";
import { BsEyeSlashFill } from "react-icons/bs";

import { setSessionValue } from "../../../../utils/storage";

export default function Mnemonic({
  setW,
}: {
  setW: Dispatch<React.SetStateAction<number>>;
}) {
  const [checked, setChecked] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>("");
  useEffect(() => {
    const generatedMnemonic = wallet.generate().mnemonic;
    setMnemonic(generatedMnemonic);
    setSessionValue("mnemonic", generatedMnemonic);
  }, []);
  return (
    <>
      <div className="step-p-nav">
        <div
          className="cursor-pointer text-slate-400 hover:text-slate-200"
          role="button"
          onClick={() => setW(1)}
        >
          <IoArrowBack size={20} />
        </div>
        <div className="step-p-steps select-none">
          <div className="step-dot mr-[10px]" />
          <div className="step-dot mr-[10px]" />
          <div className="step-dot !bg-slate-700" />
        </div>
      </div>

      <div className="step-m-wrapper">
        <form
          className="step-m-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (checked) {
              return setW(3);
            }
            return;
          }}
        >
          <div className="step-m-c select-none">
            <div className="step-m-h">
              <p className="step-m-hp">Secret Recovery Phrase</p>
              <p className="step-m-hs">
                This phrase is the ONLY way to recover your wallet. Do NOT share
                it with anyone!
              </p>
            </div>
          </div>

          <div className="relative p-2 group">
            <div className="grid grid-cols-3 gap-3 overflow-y-scroll overflow-x-hidden blur-sm group-hover:blur-none word-wrapper">
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="border p-2 text-xs bg-black/60 p-1 rounded-sm"
                >
                  <span className="text-slate-400 select-none">
                    {index + 1}.{" "}
                  </span>
                  <span>{word}</span>
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:hidden display-transition">
              <BsEyeSlashFill size={64} />
            </div>
          </div>

          <div className="step-m-confirm">
            <div className="step-m-checkbox mr-2 ">
              <input
                type="checkbox"
                className="custom-ch"
                onChange={(e) => setChecked(e.currentTarget.checked)}
              />
            </div>
            <p className="step-m-p">I saved my Secret Recovery Phrase</p>
          </div>

          <button
            className={`step-m-continue select-none !z-20 ${
              checked
                ? "!cursor-pointer !bg-sky-600"
                : "!opacity-60 !cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          <div className="!mb-2 !min-h-[20px]" />
        </form>
      </div>
    </>
  );
}