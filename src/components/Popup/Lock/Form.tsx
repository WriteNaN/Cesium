import { Dispatch, SetStateAction } from "react";


export default function Form({ goForth }: { goForth: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="lockscreen-inner">
      <form
        id="unlock"
        className="lockscreen-form"
        onSubmit={(e) => {
          return e.preventDefault();
        }}
      >
        <div className="unlock-form">
          <div className="unlock-form-img select-none">
            <div className="flex items-center justify-center w-screen">
            <img src="img/logo.svg" className="unlock-form-image" draggable={false} />
            </div>
            <div className="unlock-form-blank" />
          </div>

          <p className="unlock-form-label select-none">Enter your password</p>
          <div style={{ width: "100%", transform: "none" }}>
            <div className="w-full">
              <input
                className="relative select-text z-10 unlock-form-input"
                type="password"
                id="unlock-pass"
                placeholder="Password"
                maxLength={48}
              />
            </div>
            <p className="unlock-form-footer select-none" role="button" onClick={() => goForth(true)}>
              Forgot password
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
