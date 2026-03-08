"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import DefaultImage from "../../../shared/component/ui/default_image";
import { Env } from "@/shared/constant/env";
import { useGlobalLogic } from "@/shared/logic/global_logic";

function DarkModeButtonInner() {
  const { changeDarkMode, isDarkMode } = useGlobalLogic();

  return (
    <button
      className={`rounded-full ${isDarkMode ? "bg-gray-300" : "bg-blue-500"} p-1`}
      aria-label="toggle theme"
      onClick={changeDarkMode}
    >
      <div className={`flex h-7 min-w-14 items-center rounded-full  px-1`}>
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs transition-all duration-300 ${
            isDarkMode ? "ml-auto" : "mr-auto"
          }`}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </div>
      </div>
    </button>
  );
}

const DarkModeButton = dynamic(async () => DarkModeButtonInner, {
  ssr: false,
});

const menus = [
  "Skills",
  "Work Experiences",
  "Open Source",
  "Achievements",
  "Blogs",
  "Talks",
  "Resume",
  "Contact Me",
];

export default function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { fontColor, bgColor } = useGlobalLogic();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-blue px-4 py-4">
        <div className="mx-auto flex w-full justify-between gap-4">
          <div className="h-12 w-12 shrink-0">
            <DefaultImage src={Env.logoPath} alt="Logo" sizes="48px" />
          </div>

          <nav className="hidden flex-1 md:block">
            <div
              className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${fontColor} pl-10`}
            >
              {menus.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={
                    index === 0
                      ? "bg-blue-400 px-4 py-3 text-sm font-medium"
                      : `text-sm font-medium hover:text-white`
                  }
                >
                  {item}
                </a>
              ))}

              <DarkModeButton />
            </div>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-70 h-full w-70 transform ${bgColor} p-6 ${fontColor} shadow-xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="h-10 w-10">
            <DefaultImage src={Env.logoPath} alt="Logo" sizes="40px" />
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {menus.map((item, index) => (
            <a
              key={item}
              href="#"
              onClick={() => setIsOpen(false)}
              className={
                index === 0
                  ? "rounded-md bg-purple-700 px-4 py-3 text-sm font-medium"
                  : "rounded-md px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white"
              }
            >
              {item}
            </a>
          ))}

          <div className="pl-3.5">
            <DarkModeButton />
          </div>
        </nav>
      </aside>
    </>
  );
}
