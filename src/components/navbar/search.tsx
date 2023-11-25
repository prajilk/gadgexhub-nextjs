"use client";

import { Input } from "@nextui-org/input";
import { FormEvent, useEffect, useState } from "react";
import { History, Search as SearchIcon, Trash2 } from "lucide-react";
import { CategoryProducts } from "@/lib/types/types";

const Search = ({ bestSeller }: { bestSeller: CategoryProducts | null }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);

  useEffect(() => {
    const currentHistory = getHistoryFromLocalStorage();
    if (currentHistory !== null) setRecentSearch(currentHistory.reverse());
  }, []);

  function getHistoryFromLocalStorage(): string[] | null {
    const history = localStorage.getItem("history");
    if (history !== null && history !== undefined) return JSON.parse(history);
    return null;
  }

  function deleteSearchHistory() {
    localStorage.removeItem("history");
    setRecentSearch([]);
  }

  function saveToLocalStorage() {
    const currentHistory = getHistoryFromLocalStorage() || [];

    // Check if the keyword is not already in the history
    if (!currentHistory.includes(searchKeyword)) {
      currentHistory.push(searchKeyword);
      if (currentHistory.length >= 6) currentHistory.shift();
    }

    localStorage.setItem("history", JSON.stringify(currentHistory));
  }

  function searchProduct(e: FormEvent) {
    e.preventDefault();
    saveToLocalStorage();
  }

  return (
    <form
      onSubmit={searchProduct}
      className="relative w-full space-y-1"
      tabIndex={0}
      onFocus={() => setShowDropdown(true)}
      onBlur={() => setShowDropdown(false)}
    >
      <Input
        type="text"
        placeholder="Search..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        size="sm"
        isClearable={true}
        classNames={{
          inputWrapper: "bg-[rgba(0,0,0,0.05)] m-0 rounded-lg md:rounded-full",
        }}
        onClear={() => setSearchKeyword("")}
        startContent={
          <SearchIcon className="pointer-events-none flex-shrink-0 text-2xl" />
        }
      />
      <div
        className={`absolute z-[9999] min-h-fit w-full rounded-2xl bg-white p-4 shadow-lg ${
          !showDropdown && "hidden"
        }`}
      >
        {!searchKeyword ? (
          <div className="scrollbar-thin overflow-x-auto">
            {/* Recently Searched */}
            {recentSearch.length !== 0 && (
              <>
                <p className="flex items-center justify-between font-light text-muted-foreground">
                  Recently searched
                  <Trash2
                    size={20}
                    className="cursor-pointer text-gray-400"
                    onClick={deleteSearchHistory}
                  />
                </p>
                <div className="flex flex-col py-2">
                  {recentSearch?.map((item, i) => (
                    <span
                      key={i}
                      onClick={() => setSearchKeyword(item)}
                      className="flex cursor-pointer items-center gap-2 py-2 ps-3 text-sm hover:bg-gray-100 md:text-base"
                    >
                      <History className="text-gray-400" size={20} />
                      {item}
                    </span>
                  ))}
                </div>
              </>
            )}
            {/* Popular */}
            {bestSeller && bestSeller?.length !== 0 && (
              <>
                <p className="font-light text-muted-foreground">Popular</p>
                <div className="flex flex-col py-2">
                  {bestSeller.slice(0, 5).map((item, i) => (
                    <span
                      key={i}
                      onClick={() => setSearchKeyword(item.title)}
                      className="cursor-pointer py-2 ps-3 text-sm hover:bg-gray-100 md:text-base"
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </form>
  );
};

export default Search;
