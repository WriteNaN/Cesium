import type { ReactNode } from "react";

export default function PopupWrapper({
  children,
  theme,
}: {
  children: ReactNode;
  theme: "light" | "dark";
}) {
  return (
    <div
      className={`popup-wrapper tauri-regular ${
        theme == "light" && "!border-slate-700"
      }`}
    >
      <div className="popup-wrapper-2">
        <div className="popup-flexbox">{children}</div>
      </div>
    </div>
  );
}
