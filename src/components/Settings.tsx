import { useState, useEffect } from "react";
import nc from "multi-nano-web";

import storage from "../utils/storage";
import { FaExchangeAlt } from "react-icons/fa";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Settings({ isNavOpen }: { isNavOpen: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [option, setSelectedOption] = useState({
    value: "xno",
    label: "XNO",
    hex: "#6495ED",
  });

  const options = [
    { value: "xno", label: "XNO", hex: "#6495ED" },
    { value: "xdg", label: "XDG", hex: "#A7C7E7" },
    { value: "xro", label: "XRO", hex: "#F0FFFF" },
    { value: "ban", label: "BAN", hex: "#FFFF8F" },
  ];

  const moveBackward = () => {
    const currentIndex = options.findIndex((x) => x.label === option.label);
    const newIndex = (currentIndex - 1 + options.length) % options.length;
    setSelectedOption(options[newIndex]);
  };

  const moveForward = () => {
    const currentIndex = options.findIndex((x) => x.label === option.label);
    const newIndex = (currentIndex + 1) % options.length;
    setSelectedOption(options[newIndex]);
  };

  useEffect(() => {
    const replacePrefixes = () => {
      let newAddress = address;
      options.forEach((opt) => {
        if (address && address.startsWith(opt.value)) {
          newAddress = address.replace(opt.value, option.value);
        }
      });
      setAddress(newAddress?.replace("nano", "xno") as string);
    };
  
    replacePrefixes();
  }, [address, option, options]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 600);

    (async () => {
      const accI = (await storage.get<number>("account_index", "local")) || 0;
      const mK = await storage.get<string>("masterSeed", "session");

      setAddress(nc.wallet.accounts(mK, accI, accI)[0].address);
    })();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className={`w-full h-full bg-black absolute top-0 left-0 right-0 ${
          isNavOpen ? "slide-in-l" : "slide-out-l"
        } ${!isVisible && "!bg-transparent"}`}
        id="slider"
      >
        <div
          className={`${!isVisible ? "hidden" : ""} w-full h-full flex flex-col justify-between`}
        >
          <div
            className={`bg-black rounded-lg m-2 overflow-hidden justify-start`}
            style={{ height: "150px", position: "relative" }}
          >
            <div className="z-50 absolute w-full h-full p-3">
              <button className="absolute flex flex-row top-2 right-2 bg-gray-800/80 text-white px-2 py-1 rounded">
                <FaExchangeAlt />
                <span></span>
              </button>

              <p className="text-gray-300 mt-2 ml-2">
                Account <span>#0</span>
              </p>

              {/* Address */}
              <div
                className="flex items-center mt-2 ml-2 select-none"
                role="button"
                onClick={() => {
                  (async () =>
                    navigator.clipboard.writeText(address as string))();
                }}
              >
                <div className="flex items-center group py-1 rounded cursor-pointer">
                  <p className="text-lg text-blue-300 text-bold group-hover:opacity-80 transition-all">
                    {address?.slice(0, 9) + "..." + address?.slice(-9)}
                  </p>
                  <div className="ml-2 hover:opacity-80 transition-all focus:outline-none hidden group-hover:block group-active:!hidden">
                    <FaCopy className="text-blue-300" />
                  </div>
                  <div>
                    <FaCheck className="ml-2 text-blue-300 hidden group-active:block transition-all" />
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mt-2 ml-2 flex select-none flex-row">
                Network:{" "}
                <div className="flex flex-row transition-all">
                  <IoChevronBack onClick={moveBackward} className="cursor-pointer hover:opacity-80" />
                  <span style={{ color: option.hex }} className="text-bold">{option.label}</span>
                  <IoChevronForward onClick={moveForward} className="cursor-pointer hover:opacity-80" />
                </div>
              </p>
            </div>

            <div
              style={{
                backgroundImage: "url(nano-card.svg)",
                backgroundColor: "#201818",
                backgroundRepeat: "no-repeat",
                backgroundSize: "170%",
                backgroundPosition: "29% 30%",
                filter: "hue-rotate(15deg) saturate(.6) brightness(.4)",
                height: "150px",
                padding: "8px",
                boxSizing: "border-box",
                position: "relative",
              }}
              className="w-full"
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  border: "2px dashed white",
                  borderRadius: "5px",
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          </div>

          {/* Lock Wallet button */}
          <div className="bg-slate-800 hover:bg-slate-900 text-blue-500 text-lg transition-all flex py-2 px-4 rounded-md m-2 justify-center items-center justify-end">
            <button
              className="justify-center items-center w-full"
              onClick={() => {
                storage.set("masterSeed", null, "session");
                setTimeout(() => window.location.reload(), 100);
              }}
            >
              Lock Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
