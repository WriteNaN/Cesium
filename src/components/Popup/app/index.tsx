// You would not believe your eyes,
// if ten million fireflies lit up this codebase as I fell asleep.

import { useState } from "react";

import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import "../../../styles/app.css";
import {
  AiFillDollarCircle,
  AiOutlineGlobal,
  AiOutlineSwap,
} from "react-icons/ai";
import { BiHistory, BiSolidDashboard } from "react-icons/bi";

import Home from "./Home";
import Art from "./Art";
import Swap from "./Swap";
import History from "./History";
import Network from "./Network";

export default function App() {
  const [widget, setWidget] = useState<"home" | "art" | "swap" | "history" | "network">("home");
  const [isNavOpen, setNavOpen] = useState<boolean>(false);

  return (
    <>
      <section className="app-navbar">
        <div className="app-navbar-menu">
          <div className="app-nav-m hover:!bg-black p-1 rounded-md" onClick={() => setNavOpen(!isNavOpen)}>
            { isNavOpen ? <FaBarsStaggered size={16} className="!text-slate-500 transform scale-x-[-1]" /> : <FaBars size={16} className="!text-slate-500" />}
          </div>
        </div>
        <div className="app-nav-c"></div>
      </section>

      <div className="w-full h-full" onClick={() => isNavOpen ? setNavOpen(false) : null}> 
      {/** main content */}

      { (widget == "home") && <Home />}
      { (widget == "art") && <Art />}
      { (widget == "swap") && <Swap />}
      { (widget == "history") && <History />}
      { (widget == "network") && <Network />}
      </div>

      <div className="bottom-nav-wrapper !drop-shadow-2xl !w-full">
        <div
          aria-orientation="horizontal"
          role="tablist"
          className="bottom-nav"
        >
          <div
            aria-label="Home"
            role="button"
            onClick={() => setWidget("home")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${widget == "home" && "text-slate-100"}`}
          >
            <AiFillDollarCircle size={24} />
          </div>
          <div
            aria-label="Art"
            role="button"
            onClick={() => setWidget("art")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${widget == "art" && "text-slate-100"}`}
          >
            <BiSolidDashboard size={24} />
          </div>
          <div
            aria-label="Swap"
            role="button"
            onClick={() => setWidget("swap")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${widget == "swap" && "text-slate-100"}`}
          >
            <AiOutlineSwap size={24} />
          </div>
          <div
            aria-label="History"
            role="button"
            onClick={() => setWidget("history")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${widget == "history" && "text-slate-100"}`}
          >
            <BiHistory size={24} />
          </div>
          <div
            aria-label="Network"
            role="button"
            onClick={() => setWidget("network")}
            className={`bottom-nav-item text-gray-600 hover:text-slate-100 ${widget == "network" && "text-slate-100"}`}
          >
            <AiOutlineGlobal size={24} />
          </div>
        </div>
      </div>
    </>
  );
}

// oh btw, I'm a big fan of Adam Young's music. I can't believe I got here already! :D
// PS: I completed other stuff quite early than expected.
// PPS: try listening to All Things Bright and Beautiful album.
