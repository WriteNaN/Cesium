// You know the rules and so do I

import React, { Dispatch, useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

import { setSessionValue } from "../../../../utils/storage";

export default function Password({
  setW,
  theme
}: {
  setW: Dispatch<React.SetStateAction<number>>;
  theme: "light" | "dark";
}) {
  const [passLen, setPassLen] = useState<number>(0);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [showStrength, setShowStrength] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  useEffect(() => {
    if (passLen > 0) {
      setShowStrength(true);
      calculatePasswordStrength(passLen);
    } else {
      setShowStrength(false);
    }
  }, [passLen]);

  useEffect(() => {
    if (confirmPassword !== "" && confirmPassword !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [confirmPassword, password]);

  const calculatePasswordStrength = (length: number) => {
    if (length < 6) {
      setPasswordStrength("WEAK");
    } else if (length < 10) {
      setPasswordStrength("MEDIUM");
    } else {
      setPasswordStrength("STRONG");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPassLen(event.target.value.length);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      <div className={`${theme=="light" && "!bg-white !text-black !border-slate-400"} step-p-nav`}>
        <div
          className="cursor-pointer text-slate-400 hover:text-slate-200"
          role="button"
          onClick={() => setW(0)}
        >
          <IoArrowBack size={20} />
        </div>
        <div className="step-p-steps select-none">
          <div className="step-dot mr-[10px]" />
          <div className="step-dot mr-[10px] !bg-slate-700" />
          <div className="step-dot !bg-slate-700" />
        </div>
      </div>

      <div className={`${theme == "light" && "!bg-white !text-black"} step-p-content select-none`}>
        <form
          className="step-p-form !relative !min-h-[554px]"
          onSubmit={(e) => {
            e.preventDefault();
            if (passwordMatch && !(confirmPassword == "")) {
              setSessionValue("password", password);
              return setW(2);
            }
            return;
          }}
        >
          <div className="step-p-form-m">
            <div className="step-p-form-c">
              <p className={`${theme=="light" && "!text-slate-900"} step-p-form-d`}>Create a password</p>
              <p className={`${theme=="light" && "!text-slate-700"} step-p-form-cc`}>
                You will use this to unlock your wallet.
              </p>
            </div>
            <div className="step-p-p-wrapper">
              <input
                className={`${theme=="light" && "!bg-slate-300 !text-slate-900 !border-slate-400"} step-p-input`}
                type="password"
                placeholder="Password"
                maxLength={48}
                onChange={handlePasswordChange}
              />
              <div className="relative w-full">
                <input
                  className={`${theme=="light" && "!bg-slate-300 !text-slate-900 !border-slate-400"} step-p-confirm`}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                />
                {showStrength && (
                  <p
                    className={`step-p-input-s ${getColorClass(
                      passwordStrength
                    )}`}
                  >
                    {passwordStrength}
                  </p>
                )}
              </div>
              {!passwordMatch && confirmPassword !== "" && (
                <p className="flex w-full items-center justify-center mt-4 text-red-500">
                  Passwords do not match!
                </p>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <button
              className={`step-p-continue !absolute !bottom-0 !mb-3 ${
                (!passwordMatch || confirmPassword === "") &&
                "!cursor-not-allowed !opacity-60"
              }`}
            >
              Continue
            </button>
          </div>

          <div className={`${theme == "light" && "bg-slate-400/60"} absolute top-0 flex items-center flex-col align-center justify-center w-full mt-8 p-3 bg-black/30 rounded-md`}>
            <p className={`${theme =="light" && "!text-slate-600"} text-xs text-slate-400`}>
              <span className={`${theme=="light" && "!text-slate-700"} font-bold text-slate-300`}>Never</span> share this
              password
            </p>
            <p className={`${theme =="light" && "!text-slate-600"} text-xs text-slate-400`}>
              your seed is to be encrypted with it.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function getColorClass(strength: string): string {
  switch (strength) {
    case "WEAK":
      return "!text-red-500";
    case "MEDIUM":
      return "!text-yellow-500";
    case "STRONG":
      return "!text-green-500";
    default:
      return "";
  }
}
