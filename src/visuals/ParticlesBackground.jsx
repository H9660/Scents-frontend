"use client";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <>
      <div className="wrapper">
        <div>
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        <div>
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        <div>
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        <div>
          <div className="stars4"></div>
          <div className="stars5"></div>
          <div className="stars6"></div>
        </div>
        <div>
          <div className="stars4"></div>
          <div className="stars5"></div>
          <div className="stars6"></div>
        </div>
        <div>
          <div className="stars4"></div>
          <div className="stars5"></div>
          <div className="stars6"></div>
        </div>
      </div>
    </>
  );
}
