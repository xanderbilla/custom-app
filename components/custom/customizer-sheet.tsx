"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CustomizerSheet() {
  const [section, setSection] = useState("hero");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const savedCustomizations = JSON.parse(
      localStorage.getItem("pageCustomizations") || "{}"
    );
    if (savedCustomizations.heroBackground) {
      setBackgroundImage(savedCustomizations.heroBackground);
    }
  }, []);

  const applyChanges = () => {
    const savedCustomizations = JSON.parse(
      localStorage.getItem("pageCustomizations") || "{}"
    );
    if (section === "hero") {
      savedCustomizations.heroBackground = backgroundImage;
    }
    localStorage.setItem(
      "pageCustomizations",
      JSON.stringify(savedCustomizations)
    );
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Customize</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Page</SheetTitle>
          <SheetDescription>
            Select customization options below.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
              Section
            </Label>
            <select
              title="Select Section"
              id="section"
              className="col-span-3"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="hero">Hero Section</option>
            </select>
          </div>
          {section === "hero" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="background" className="text-right">
                Image
              </Label>
              <Input
                type="file"
                id="background"
                className="col-span-3 border-none p-0 h-auto"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      if (typeof reader.result === "string") {
                        setBackgroundImage(reader.result);
                      }
                    };
                    reader.readAsDataURL(files[0]);
                  }
                }}
              />
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={applyChanges}>
              Apply Changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
