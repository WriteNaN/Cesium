// You would not believe your eyes,
// if ten million fireflies lit up this codebase as I fell asleep.

import { useState } from "react";

import { FaBars } from "react-icons/fa6";
import "../../../styles/app.css";
import {
  AiFillDollarCircle,
  AiOutlineGlobal,
  AiOutlineSwap,
} from "react-icons/ai";
import { BiHistory, BiSolidDashboard } from "react-icons/bi";

export default function App() {
  const [widget, setWidget] = useState<"home" | "art" | "swap" | "history" | "network">("home");
  return (
    <>
      <section className="app-navbar">
        <div className="app-navbar-menu">
          <div className="app-nav-m hover:!bg-black p-1 rounded-md">
            <FaBars size={16} className="!text-slate-500" />
          </div>
        </div>

        <div className="app-nav-c"></div>
      </section>

      <div className="bottom-nav-wrapper !drop-shadow-2xl !absolute !bottom-0 !w-full">
        <div
          aria-orientation="horizontal"
          role="tablist"
          className="bottom-nav"
        >
          <div
            aria-label="Home"
            className="bottom-nav-item text-gray-600 hover:text-slate-100"
          >
            <AiFillDollarCircle size={24} />
          </div>
          <div
            aria-label="Art"
            className="bottom-nav-item text-gray-600 hover:text-slate-100"
          >
            <BiSolidDashboard size={24} />
          </div>
          <div
            aria-label="Swap"
            className="bottom-nav-item text-gray-600 hover:text-slate-100"
          >
            <AiOutlineSwap size={24} />
          </div>
          <div
            aria-label="History"
            className="bottom-nav-item text-gray-600 hover:text-slate-100"
          >
            <BiHistory size={24} />
          </div>
          <div
            aria-label="Network"
            className="bottom-nav-item text-gray-600 hover:text-slate-100"
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
