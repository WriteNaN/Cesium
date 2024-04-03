import { useState } from "react";

import Start from "./Start";
import Password from "./create/Password";
import Mnemonic from "./create/Mnemonic";
import Done from "./create/Done";
import ImportPhrase from "./restore/Phrase";
import ImportPassword from "./restore/Password";

import "../../../styles/initialize.css";

export default function InitializeScreen() {
  const [wizardI, setWizardI] = useState<number>(0);
  return (
    <>
      {wizardI == 0 && <Start setW={setWizardI} />}
      {wizardI == 1 && <Password setW={setWizardI} />}
      {wizardI == 2 && <Mnemonic setW={setWizardI} />}
      {wizardI == 3 && <Done setW={setWizardI} />}
      {wizardI == 4 && <ImportPhrase setW={setWizardI} />}
      {wizardI == 5 && <ImportPassword setW={setWizardI} />}

      {wizardI == 420 && <Done setW={setWizardI} prevStep={5} />}
    </>
  );
}
