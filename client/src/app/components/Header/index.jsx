"use client";
// import { handleSignOut } from "../../utils";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Header({ moveBack = false, pageTitle }) {
  const router = useRouter();

  return (
    <div className="h-12 flex justify-between items-center bg-cyan-950 p-4">
      <div className="flex items-center">
        {moveBack && (
          <div
            className="flex mr-2"
            onClick={() => {
              router.back();
            }}
          >
            <Image
              src="/back.svg"
              alt="Back icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        )}
        <h1 className="text-white font-bold">{pageTitle}</h1>
      </div>
      <div className="flex items-center">
        <button
          className="bg-red-500 text-white px-4 py-2"
          //   onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
