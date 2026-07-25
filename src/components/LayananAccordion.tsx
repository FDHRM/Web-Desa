"use client";

import { useState } from "react";

type Item = { id: string; judul: string; deskripsi: string };

export default function LayananAccordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-navy-700/10 border-t border-navy-700/10">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="animate-fade-up"
            style={{ animationDelay: `${(i % 10) * 40}ms`, animationFillMode: "backwards" }}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="focus-ring flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-medium text-ink">{item.judul}</span>
              <span
                className={`shrink-0 text-xl leading-none text-teal-500 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="whitespace-pre-line pb-4 text-sm leading-relaxed text-ink/70">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
