import { useState, useEffect } from "react";
import { assets } from "../../assets/asset";

const Hero = () => {
  const heroIssues = [
    assets.heroStreetLight,
    assets.heroPathHoleRepair,
    assets.heroGarbageCleanup,
    assets.heroWaterLogging,
    assets.heroFootPath,
  ];

  // clone first slide for infinite loop
  const slides = [...heroIssues, heroIssues[0]];

  const [activeIndex, setActiveIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  // auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // handle seamless loop
  useEffect(() => {
    if (activeIndex === heroIssues.length) {
      const timeout = setTimeout(() => {
        setWithTransition(false);
        setActiveIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }, 700); // same as transition duration

      return () => clearTimeout(timeout);
    }
  }, [activeIndex, heroIssues.length]);

  return (
    <section className="w-full py-12 bg-blue-50">
      <div className="flex flex-col items-center gap-10 px-4 mx-auto max-w-7xl lg:flex-row">
        {/* LEFT SECTION */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold leading-tight text-blue-700 md:text-5xl">
            One Click to Make Your Area Better
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            See it. Snap it. Solve it.
          </p>

          {/* STATS (ADDED BACK) */}
          <div className="flex justify-center gap-8 mt-8 lg:justify-start">
            <div>
              <h3 className="text-2xl font-bold text-blue-700">80+</h3>
              <p className="text-sm text-gray-600">Complaints</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-700">60+</h3>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-700">20+</h3>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION – INFINITE CAROUSEL */}
        <div className="flex-1 w-full overflow-hidden shadow-lg rounded-xl">
          <div
            className={`flex ${
              withTransition
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {slides.map((img, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <img
                  src={img}
                  alt="Civic Issue"
                  className="object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
