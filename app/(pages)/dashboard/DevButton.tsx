"use client";

import { type FC } from "react";
import axios from "axios";

export const DevButton: FC = () => {
  const handleClick = async () => {
    const response = await axios.post("/api/dev", {
      value: "12345678",
    });

    console.log(response);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="px-6 py-2 border border-gray-400 rounded text-sm font-medium cursor-pointer hover:bg-gray-700 hover:text-white"
    >
      送信する
    </button>
  );
};
