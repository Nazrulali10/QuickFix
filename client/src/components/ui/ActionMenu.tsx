import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import type { ActionMenuProps } from "../../types";

export const ActionMenu: React.FC<ActionMenuProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        title="Actions"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 cursor-pointer"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;

                  setOpen(false);
                  item.onClick();
                }}
                className={`w-full text-left px-3 py-2 text-sm ${
                  item.disabled
                    ? "cursor-not-allowed opacity-40"
                    : `cursor-pointer hover:bg-gray-50 ${
                        item.danger ? "text-red-600" : "text-gray-700"
                      }`
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
