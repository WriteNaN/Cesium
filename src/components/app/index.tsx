// You would not believe your eyes..

import { useState } from "react";

import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import "../../styles/app.css";
import {
  AiFillDollarCircle,
  AiOutlineGlobal,
  AiOutlineSwap,
} from "react-icons/ai";
import { BiHistory, BiSolidDashboard } from "react-icons/bi";
import Settings from "../Settings";

import Home from "./Home";
import Art from "./Art";
import Swap from "./Swap";
import History from "./History";
import Network from "./Network";

export default function App() {
  const [widget, setWidget] = useState<
    "home" | "art" | "swap" | "history" | "network"
  >("home");
  const [isNavOpen, setNavOpen] = useState<boolean>(false);

  return (
    <>
      <section className="app-navbar">
        <div className="app-navbar-menu">
          <div
            className="app-nav-m hover:!bg-black p-1 rounded-md"
            onClick={() => setNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <FaBarsStaggered
                size={16}
                className="!text-slate-500 transform scale-x-[-1]"
              />
            ) : (
              <FaBars size={16} className="!text-slate-500" />
            )}
          </div>
        </div>

        <div className="app-nav-c">
          {widget == "home" && (
            <span className="text-slate-400 text-xl select-none cursor-pointer">
              cesium
            </span>
          )}
          {widget == "network" && (
            <span className="text-slate-400 text-md select-none cursor-pointer">
              Manage Network
            </span>
          )}
        </div>
      </section>

      <div className="w-full h-full relative overflow-y-hidden overflow-x-hidden">
        {/** main content */}

        {widget == "home" && <Home />}
        {widget == "art" && <Art />}
        {widget == "swap" && <Swap />}
        {widget == "history" && <History />}
        {widget == "network" && <Network />}

        <Settings isNavOpen={isNavOpen} />
      </div>

      <div
        className={`bottom-nav-wrapper !drop-shadow-2xl !w-full ${isNavOpen && "!hidden"}`}
      >
        <div
          aria-orientation="horizontal"
          role="tablist"
          className="bottom-nav"
        >
          <div
            aria-label="Home"
            role="button"
            data-widget="home"
            onClick={() => setWidget("home")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${
              widget == "home" && "text-slate-100"
            }`}
          >
            <AiFillDollarCircle size={24} />
          </div>
          <div
            aria-label="Art"
            role="button"
            data-widget="art"
            onClick={() => setWidget("art")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${
              widget == "art" && "text-slate-100"
            }`}
          >
            <BiSolidDashboard size={24} />
          </div>
          <div
            aria-label="Swap"
            role="button"
            data-widget="swap"
            onClick={() => setWidget("swap")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${
              widget == "swap" && "text-slate-100"
            }`}
          >
            <AiOutlineSwap size={24} />
          </div>
          <div
            aria-label="History"
            role="button"
            data-widget="history"
            onClick={() => setWidget("history")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${
              widget == "history" && "text-slate-100"
            }`}
          >
            <BiHistory size={24} />
          </div>
          <div
            aria-label="Network"
            role="button"
            data-widget="network"
            onClick={() => setWidget("network")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${
              widget == "network" && "text-slate-100"
            }`}
          >
            <AiOutlineGlobal size={24} />
          </div>
          {/** there is no math here, so there would be imperfections */}
          <div
            className="active-tab-line"
            style={{
              left: `${
                widget === "home"
                  ? "16px"
                  : widget === "art"
                    ? "85px"
                    : widget === "swap"
                      ? "152px"
                      : widget === "history"
                        ? "223px"
                        : widget === "network"
                          ? "289px"
                          : "-200px"
              }`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

// oh btw, I'm a big fan of Adam Young's music. I can't believe I got here already! :D
// PS: I completed other stuff quite early than expected.
// PPS: try listening to All Things Bright and Beautiful album.
