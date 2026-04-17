import React from "react";
import "./Header.css";

import darkVideo from "../assets/Untitled design.mp4";
import lightVideo from "../assets/Blue and Purple Neon Futuristic Timer Countdown Opening Video.mp4";

export default function Header({ theme }) {
  return (
    <section className={`header ${theme}`}>
      <div className="video-container">
        <video
          key={theme}
          className="header-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={theme === "dark" ? darkVideo : lightVideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
