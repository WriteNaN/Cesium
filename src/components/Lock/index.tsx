import React, { useState } from "react";

import Navbar from "./Navbar";
import Form from "./Form";
import Footer from "./Footer";
import Forgot from "../Forgot";

import "../../styles/login.css";

// As long as it gets the work done, it's all good - Write Int

export default function Lockscreen({
  setLoggedIn,
  theme,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "dark" | "light";
}) {
  const [resetPassW, setResetPassW] = useState<boolean>(false);
  const [shouldCall, setShouldCall] = useState<boolean>(false);
  const [invalidPass, setInvalidPass] = useState<boolean>(false);

  return (
    <>
      {resetPassW ? (
        <Forgot goBack={setResetPassW} theme={theme} />
      ) : (
        <>
          <Navbar theme={theme} />
          <Form
            goForth={setResetPassW}
            setInvalidPass={setInvalidPass}
            handleSubmit={() => setShouldCall(true)}
            invalidPass={invalidPass}
            theme={theme}
          />
          <Footer
            shouldCall={shouldCall}
            setInvalidPass={setInvalidPass}
            setShouldCall={setShouldCall}
            setLoggedIn={setLoggedIn}
            theme={theme}
          />
        </>
      )}
    </>
  );
}
