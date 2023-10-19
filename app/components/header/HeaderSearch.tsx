"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");

  return (
    <form className="hidden sm:flex border border-gray-500 bg-[#f1f5f8] rounded outline-1 outline-black focus-within:outline">
      <label htmlFor="search" className="flex items-center justify-center p-2 text-xl">
        <AiOutlineSearch />
      </label>

      <input
        type="text"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="text-sm outline-none rounded-tr rounded-br bg-[#f1f5f8] pr-2"
      />
    </form>
  );
};

export default HeaderSearch;
