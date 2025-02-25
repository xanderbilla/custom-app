"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [heroBg, setHeroBg] = useState("");

  useEffect(() => {
    const loadCustomizations = () => {
      const savedCustomizations = JSON.parse(
        localStorage.getItem("homeCustomizations") || "{}"
      );
      if (savedCustomizations.background) {
        setHeroBg(savedCustomizations.background);
      } else {
        setHeroBg("");
      }
    };

    loadCustomizations();
    window.addEventListener("storage", loadCustomizations);
    return () => window.removeEventListener("storage", loadCustomizations);
  }, []);

  return (
    <>
      <section
        id="hero-section"
        title="Hero Section"
        className="relative h-screen flex items-center justify-center text-white bg-cover bg-top"
        style={{
          backgroundImage: heroBg ? `url(${heroBg})` : undefined,
          backgroundColor: heroBg ? "transparent" : "#1a202c",
        }} // Fallback color
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Welcome to Momaya
          </h1>
          <p className="mt-6 text-xl max-w-2xl mx-auto">
            Discover amazing experiences crafted just for you.
          </p>
        </div>
      </section>
    </>
  );
}
