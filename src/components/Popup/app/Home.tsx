import "../../../styles/app/home.css";

export default function Home() {
  return (
    <div className="container fadeInMe relative mx-auto roboto-regular">
      <div className="relative">
        <div className="hero-wrapper">
          <div className="hero">
            <div className="h-c">
              <p>$1200.33</p>
            </div>
            <div className="h-c-s tauri-regular">
              <p>{"+<0.04%"}</p>
              <span>$2.08</span>
            </div>
          </div>
          <div className="hero-button-wrapper"></div>
        </div>
      </div>
    </div>
  );
}
