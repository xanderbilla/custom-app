// import Image from "next/image";
import { Dot } from "lucide-react";
import CustomizerSheet from "@/components/custom/customizer-sheet";
import Image from "next/image";

type Props = object;

export default function Navbar({}: Props) {
  return (
    <nav className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 text-2xl font-medium">
            <Image
              src="/logo.png"
              alt="momayya"
              width={40}
              height={40}
              className="object-contain"
            />
            Momayya
            </div>
          <div className="flex items-center gap-2">
            <Dot size={36} color="green" />
            <CustomizerSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
