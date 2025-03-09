"use client";

import { useEffect, useState } from "react";
import CustomizerSheet from "@/components/custom/customizer-sheet";
import { Dot } from "lucide-react";

export default function Navbar() {
  const [navbarColor, setNavbarColor] = useState("#ffffff");

  useEffect(() => {
    const handleStorageChange = () => {
      const storedColor = localStorage.getItem("navbarColor");
      if (storedColor) {
        setNavbarColor(storedColor);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Initial load

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleColorChange = (newColor: string) => {
    setNavbarColor(newColor);
    localStorage.setItem("navbarColor", newColor);
    window.dispatchEvent(new Event("storage")); // Trigger event for instant update
  };

  return (
    <nav style={{ backgroundColor: navbarColor }} className="text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-2xl font-medium">Momayya</div>
          <div className="flex items-center gap-2">
            <Dot size={36} color="green" />
            <CustomizerSheet onColorChange={handleColorChange} />
          </div>
        </div>
      </div>
    </nav>
  );
}