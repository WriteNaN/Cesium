export default function Settings({ isNavOpen }: { isNavOpen: boolean }) {
  return (
    <div
      className={`w-full h-full bg-black absolute top-0 left-0 right-0 ${
        !isNavOpen ? "slide-out-l" : "slide-in-l"
      }`}
      id="slider"
    >
      <div>
        <div
          className="absolute right-0 top-0 mr-3 hover:text-yellow-600 glow-lantern !bg-transparent transition-all"
          role="button"
        >
          {/** TODO */}
        </div>
      </div>
    </div>
  );
}