"use client";

import { Input } from "@nextui-org/input";
import { FormEvent, useEffect, useState } from "react";
import { Frown, History, Search as SearchIcon, Trash2 } from "lucide-react";
import { CategoryProduct } from "@/lib/types/types";
import { useSearch } from "@/api-hooks/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import SkeletonSearchResult from "../skeletons/skeleton-search-result";
import { useRouter } from "next/navigation";

const Search = ({ bestSeller }: { bestSeller: CategoryProduct[] | null }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const debouncedSearchKeyword = useDebounce(searchKeyword);

  const router = useRouter();

  const { data, isLoading } = useSearch(debouncedSearchKeyword);

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
    setShowDropdown(false);
    router.push(`/store/search?q=${searchKeyword}`);
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
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          !showDropdown && setShowDropdown(true);
        }}
        size="sm"
        isClearable={true}
        classNames={{
          inputWrapper: "bg-gray-200 m-0 rounded-lg md:rounded-full",
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
        ) : isLoading ? (
          <>
            <SkeletonSearchResult />
            <SkeletonSearchResult />
          </>
        ) : data && data.length !== 0 ? (
          data.map((item, i) => (
            <Link
              href={`/store/${item.slug}?pid=${item.pid}`}
              className="flex gap-3 border-b px-1 py-2 duration-500 hover:bg-gray-100"
              key={i}
            >
              <div className="relative h-14 w-14">
                <Image
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image}
                  alt={item.title + "Image"}
                  fill
                  sizes="100px"
                  className="bg-gray-100"
                />
              </div>
              <div>
                <h1 className="font-medium">{item.title}</h1>
                <p className="font-Roboto text-sm text-muted-foreground">
                  {formatCurrency(item.offerPrice)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          data && (
            <div className="flex flex-col items-center justify-center gap-2 py-10">
              <Frown className="animate-bounce text-gray-300" size={40} />
              <h1 className="text-muted-foreground">
                Sorry, No matches were found.
              </h1>
            </div>
          )
        )}
      </div>
    </form>
  );
};

export default Search;
