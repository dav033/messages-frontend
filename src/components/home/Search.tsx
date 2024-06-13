'use client'

import { Search as SearchIcon } from "@/icons/Search.icon";

export default function Search() {
  return (
    <div className="flex items-center justify-between bg-white rounded px-4 py-1">
      <input
        type="text"
        placeholder="Search..."
        className="focus:outline-none w-full"
      />

      <button>
        <SearchIcon />
      </button>
    </div>
  );
}
