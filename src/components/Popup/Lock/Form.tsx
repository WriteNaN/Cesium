import { Dispatch, SetStateAction, useRef, useEffect } from "react";


// theme added I guess?
export default function Form({
  goForth,
  handleSubmit,
  invalidPass,
  setInvalidPass,
  theme
}: {
  goForth: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => any;
  invalidPass: boolean;
  setInvalidPass: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "dark" | "light";
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInvalidPass(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setInvalidPass]);

  return (
    <div className={`lockscreen-inner ${theme == "light" && "!bg-white !text-black"}`}>
      <form
        id="unlock"
        className="lockscreen-form"
        onSubmit={(e) => {
          e.preventDefault();
          return handleSubmit();
        }}
      >
        <div className="unlock-form">
          <div className="unlock-form-img select-none">
            <div className="flex items-center justify-center w-screen">
              <img
                src={`img/logo.svg`}
                className="unlock-form-image"
                draggable={false}
              />
            </div>
            <div className="unlock-form-blank" />
          </div>

          <p className={`${theme == "light" && "!text-black/90"} unlock-form-label select-none`}>Enter your password</p>
          <div style={{ width: "100%", transform: "none" }}>
            <div className="w-full">
              <input
                className={`relative select-text z-10 unlock-form-input ${
                  invalidPass && "invalid-password"
                } ${theme == "light" && "!bg-slate-300 !text-slate-700 !border-slate-400"}`}
                type="password"
                id="unlock-pass"
                placeholder="Password"
                ref={inputRef}
                maxLength={48}
              />
            </div>
            <p
              className={`unlock-form-footer ${theme == "light" && "!text-slate-800 !hover:text-slate-600"} select-none`}
              role="button"
              onClick={() => goForth(true)}
            >
              Forgot password
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
