import { useState } from "react";
import { site } from "../data/site";

export default function Comparison() {
  const [position, setPosition] = useState(50);
  const real = Boolean(site.beforeAfter.before && site.beforeAfter.after);
  return (
    <div className="comparison-block">
      <div className="comparison-visual">
        {real ? (
          <>
            <img
              className="comparison-image"
              src={site.beforeAfter.after!}
              alt="Устройство после ремонта"
              loading="lazy"
            />
            <img
              className="comparison-image"
              src={site.beforeAfter.before!}
              alt="Устройство до ремонта"
              loading="lazy"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            />
          </>
        ) : (
          <>
            <div className="comparison-half after-device">
              <div className="sample-phone">
                <div className="phone-island" />
                <span className="phone-time">09:41</span>
                <div className="phone-orbit" />
                <span className="phone-home" />
              </div>
            </div>
            <div
              className="comparison-half before-device"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <div className="sample-phone">
                <div className="phone-island" />
                <span className="phone-time">09:41</span>
                <div className="phone-orbit" />
                <svg
                  className="cracks"
                  viewBox="0 0 180 320"
                  aria-hidden="true"
                >
                  <path d="m72 0 22 85-54 44 43 28-49 163m60-235 38 24 48-10M40 129l-40 5m83 23 47 25 50 94m-50-94-8 49 27 30M94 85 67 64 0 82" />
                </svg>
                <span className="phone-home" />
              </div>
            </div>
          </>
        )}
        <span className="compare-label before-label">До</span>
        <span className="compare-label after-label">После</span>
        <div
          className="comparison-divider"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span>↔</span>
        </div>
        <label className="sr-only" htmlFor="comparison-slider">
          Сравнить до и после: положение разделителя
        </label>
        <input
          id="comparison-slider"
          className="comparison-range"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`Видно ${position}% изображения до ремонта`}
        />
      </div>
      <p className="comparison-caption">
        {real
          ? site.beforeAfter.caption
          : "Иллюстрация замены экрана, не фотография выполненной работы."}
      </p>
      {/* TODO: подтвердить у владельца права на снимки; заменить before/after/caption в site.ts. */}
    </div>
  );
}
