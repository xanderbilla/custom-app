"use client";
import { useEffect, useState } from "react";

export default function Page1() {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const loadCustomizations = () => {
      const savedCustomizations = JSON.parse(
        localStorage.getItem("page1Customizations") || "{}"
      );
      setBgImage(savedCustomizations.background || "");
    };

    loadCustomizations();
    window.addEventListener("storage", loadCustomizations);
    return () => window.removeEventListener("storage", loadCustomizations);
  }, []);

  return (
    <section
    title="Page 1"
      className="h-screen flex items-center justify-center text-white bg-cover"
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
    >
      <h1 className="text-6xl font-extrabold">Welcome to Page 1</h1>
    </section>
  );
}
