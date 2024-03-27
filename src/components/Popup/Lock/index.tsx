import { useState } from "react";

import Navbar from "./Navbar";
import Form from "./Form";
import Footer from "./Footer";
import Forgot from "../Forgot";

export default function Lockscreen() {
  const [resetPassW, setResetPassW] = useState<boolean>(false);
  return (
    <>
      {resetPassW ? (
        <Forgot goBack={setResetPassW} />
      ) : (
        <>
          <Navbar />
          <Form goForth={setResetPassW} />
          <Footer />
        </>
      )}
    </>
  );
}
