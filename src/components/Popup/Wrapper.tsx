import type { ReactNode } from "react";

export default function PopupWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="popup-wrapper tauri-regular">
      <div className="popup-wrapper-2">
        <div className="popup-flexbox">{children}</div>
      </div>
    </div>
  );
}
