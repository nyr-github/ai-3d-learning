"use client";

import React from "react";

interface ConvertButtonProps {
  targetFormat: string;
  disabled?: boolean;
  onConvert: () => void;
}

export function ConvertButton({
  targetFormat,
  disabled,
  onConvert,
}: ConvertButtonProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <button
        onClick={onConvert}
        disabled={disabled}
        className="
          w-full py-4 px-6
          bg-linear-to-r from-(--accent-primary) to-(--accent-secondary)
          text-white font-semibold text-lg rounded-xl
          hover:opacity-90 transition-opacity
          shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        Start Converting to {targetFormat}
      </button>
    </div>
  );
}
