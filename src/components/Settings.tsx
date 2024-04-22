import { useState, useEffect } from "react";

export default function Settings({ isNavOpen }: { isNavOpen: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 600);
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
        <div>
          <div
            className={`${!isVisible && "hidden"} absolute right-0 top-0 mr-3 hover:text-yellow-600 glow-lantern !bg-transparent transition-all`}
            role="button"
          >
            {/** TODO */}
          </div>
        </div>
      </div>
    </>
  );
}
