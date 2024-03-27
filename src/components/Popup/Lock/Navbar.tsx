import { FaCircleQuestion } from "react-icons/fa6";

export default function Navbar() {
  return (
      <section className="lockscreen-nav select-none">
        <div style={{ width: "10px" }}></div>
        <span className="text-slate-400 text-xl">cesium</span>
        <div
          className="lockscreen-nav-q"
          role="button"
          onClick={() =>
            chrome.tabs.create({ url: "https://nano.gift/docs/cesium" })
          }
        >
          <FaCircleQuestion
            size={16}
            className="text-slate-400 hover:text-slate-200"
          />
        </div>
      </section>
  );
}
