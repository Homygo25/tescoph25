import React, { useEffect, useState } from "react";

export default function Hero3D() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger flip-in after mount
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center perspective">
      <div
        className={`relative w-32 h-32 transition-transform duration-700 ease-out transform-style-3d ${
          show ? "animate-flipIn" : "opacity-0 rotate-y-90"
        }`}
      >
        <img
          src="/images/CVStransparent.png"
          alt="CVS Logo"
          className="w-full h-full object-contain z-10 relative logo-reflect"
        />
        <div className="shine-overlay" />
      </div>

      <h1 className="mt-6 text-xl font-semibold text-red-600 transition-transform duration-300 hover:rotate-x-6">
        First Drive-Thru Pharmacy in the Philippines
      </h1>
    </section>
  );
}
