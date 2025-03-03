"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
import Image from "next/image";

export default function CustomizerSheet() {
  const pathname = usePathname();
  const getPageFromPath = (path: string) => {
    if (path.includes("page1")) return "page1";
    if (path.includes("page2")) return "page2";
    if (path.includes("page3")) return "page3";
    return "home";
  };

  const [page, setPage] = useState(getPageFromPath(pathname));
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    setPage(getPageFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    loadCustomizations();
    window.addEventListener("storage", loadCustomizations);
    return () => window.removeEventListener("storage", loadCustomizations);
  }, [page]);

  const loadCustomizations = () => {
    const savedCustomizations = JSON.parse(
      localStorage.getItem(`${page}Customizations`) || "{}"
    );
    setBackgroundImage(savedCustomizations.background || "");
  };

  const applyChanges = () => {
    const savedCustomizations = JSON.parse(
      localStorage.getItem(`${page}Customizations`) || "{}"
    );
    savedCustomizations.background = backgroundImage;
    localStorage.setItem(
      `${page}Customizations`,
      JSON.stringify(savedCustomizations)
    );
    window.dispatchEvent(new Event("storage")); // Update UI instantly
  };

  const resetChanges = () => {
    localStorage.removeItem(`${page}Customizations`);
    setBackgroundImage("");
    window.dispatchEvent(new Event("storage")); // Trigger update
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Customize</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Page</SheetTitle>
          {/* Change theme */}
          <div className="flex items-center space-x-4 py-2">
            <div className="h-8 w-8 rounded-full bg-black shadow-lg cursor-pointer transition-transform hover:scale-110" />
            <div className="h-8 w-8 rounded-full bg-green-500 shadow-lg cursor-pointer transition-transform hover:scale-110" />
            <div className="h-8 w-8 rounded-full bg-blue-500 shadow-lg cursor-pointer transition-transform hover:scale-110" />
            <div className="h-8 w-8 rounded-full bg-orange-500 shadow-lg cursor-pointer transition-transform hover:scale-110" />
          </div>
          <SheetDescription>
            Select customization options for each page.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="page" className="text-right">
              Page
            </Label>
            <select
              title="Page"
              id="page"
              className="col-span-3"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            >
              <option value="home">Home</option>
              <option value="page1">Page 1</option>
              <option value="page2">Page 2</option>
              <option value="page3">Page 3</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="background" className="text-right">
              Background Image
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
          {backgroundImage && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right col-span-1">Preview</Label>
              <Image
                width={200}
                height={200}
                src={backgroundImage}
                alt="Background Preview"
                className="col-span-3 h-20 w-full object-cover border rounded"
              />
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="destructive" onClick={resetChanges}>
              Reset
            </Button>
          </SheetClose>
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
