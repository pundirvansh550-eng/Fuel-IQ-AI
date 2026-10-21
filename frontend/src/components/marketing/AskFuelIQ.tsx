"use client";

import { useState } from "react";

import {
  Camera,
  ImageIcon,
  Mic,
  AudioLines,
  X,
} from "lucide-react";

export default function AskFuelIQ() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xl transition hover:scale-105"
      >
        AI
      </button>

      {/* Assistant */}

      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-[360px] rounded-[32px] border border-zinc-200 bg-white p-6 shadow-2xl">

          {/* Close */}

          <div className="mb-4 flex justify-end">

            <button
              onClick={() =>
                setOpen(false)
              }
              className="text-zinc-400 hover:text-zinc-600"
            >
              <X size={22} />
            </button>

          </div>

          {/* Input */}

          <div className="rounded-[24px] bg-slate-100 p-5">

            <input
              type="text"
              placeholder="Ask anything..."
              className="w-full bg-transparent text-lg outline-none"
            />

          </div>

          {/* Actions */}

          <div className="mt-5 flex items-center justify-between">

            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Camera size={22} />
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <ImageIcon size={22} />
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Mic size={22} />
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <AudioLines size={22} />
            </button>

          </div>

          {/* Branding */}

          <div className="mt-5 text-center text-sm text-zinc-500">
            FuelIQ AI
          </div>

        </div>
      )}
    </>
  );
}