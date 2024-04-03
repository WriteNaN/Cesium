import Navbar from "../Lock/Navbar";
import { Dispatch } from "react";

export default function Start({
  setW,
}: {
  setW: Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="min-h-[554px]">
      <Navbar />
      <div className="flex flex-col justify-between align-center p-[20px] h-full">
        <div className="init-wrapper">
          <div className="start-content">
            <div className="select-none items-center flex flex-col justify-center align-center w-full">
              <div className="flex flex-col space-y-3 items-center justify-center w-full">
                <img
                  src="img/logo.svg"
                  className="w-auto h-32 mr-2"
                  alt="Cesium Wallet Logo"
                  draggable={false}
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">
                    Created with ❤️ by{" "}
                    <a
                      href="https://nano.gift/"
                      onClick={(e) => {
                        e.preventDefault();
                        return chrome.tabs.create({
                          url: "https://nano.gift/?referrer=caesium",
                        });
                      }}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Nano Gift
                    </a>
                  </span>
                </div>
              </div>
              <p className="start-content-text">
                To get started, create a new wallet or import one from a seed
                phrase.
              </p>
            </div>
          </div>

          <div className="buttons-wrapper">
            <div
              className="button-create"
              role="button"
              onClick={() => setW(1)}
            >
              Create a new wallet
            </div>

            <div
              className="button-restore"
              role="button"
              onClick={() => setW(4)}
            >
              I already have a wallet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
