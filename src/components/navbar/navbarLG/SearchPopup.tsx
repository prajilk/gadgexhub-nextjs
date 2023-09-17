"use client";

import { History, Search, Trash2, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const bestSeller = ["Oneplus earphone", "Zeb Sound Bar", "Table Lamp"];

const SearchPopup = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [recentSearch, setRecentSearch] = useState<string[]>([]);

    useEffect(() => {
        const currentHistory = getHistoryFromLocalStorage();
        if (currentHistory !== null) setRecentSearch(currentHistory.reverse());
    }, []);

    function getHistoryFromLocalStorage(): string[] | null {
        const history = localStorage.getItem("history");
        if (history !== null && history !== undefined)
            return JSON.parse(history);
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
        <div className="search-bar flex items-center rounded-full lg:px-3 lg:py-2">
            <label htmlFor="modal-1" className="cursor-pointer">
                <Search />
            </label>
            <input className="modal-state" id="modal-1" type="checkbox" />
            <div className="modal flex items-start pt-16">
                <label className="modal-overlay" htmlFor="modal-1"></label>
                <div className="modal-content flex flex-col gap-5 pt-8">
                    {/* <div> */}
                    <label
                        htmlFor="modal-1"
                        className="absolute inset-0 w-full h-fit p-2 cursor-pointer"
                    >
                        <X className="float-right stroke-neutral" size={20} />
                    </label>
                    {/* </div> */}
                    <div className="flex w-fit md:w-96 border border-gray-300 items-center">
                        <Search className="ms-3 cursor-pointer" />
                        <form onSubmit={searchProduct} className="w-full">
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) =>
                                    setSearchKeyword(e.target.value)
                                }
                                className="w-full outline-none px-2 py-3"
                                placeholder="Search..."
                            />
                        </form>
                        {searchKeyword && (
                            <X
                                className="me-3 cursor-pointer"
                                onClick={() => setSearchKeyword("")}
                            />
                        )}
                    </div>
                    {!searchKeyword ? (
                        <div className="overflow-x-auto scrollbar-thin">
                            {/* Recently Searched */}
                            {recentSearch.length !== 0 && (
                                <>
                                    <p className="text-slate-400 flex items-center justify-between">
                                        Recently searched
                                        <Trash2
                                            size={20}
                                            className="text-gray-400 cursor-pointer"
                                            onClick={deleteSearchHistory}
                                        />
                                    </p>
                                    <div className="flex flex-col py-2">
                                        {recentSearch?.map((item, i) => (
                                            <span
                                                key={i}
                                                onClick={() =>
                                                    setSearchKeyword(item)
                                                }
                                                className="ps-3 py-2 cursor-pointer hover:bg-gray-100 flex gap-2 items-center"
                                            >
                                                <History
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                            {/* Popular */}
                            <p className="text-slate-400">Popular</p>
                            <div className="flex flex-col py-2">
                                {bestSeller.map((item, i) => (
                                    <span
                                        key={i}
                                        onClick={() => setSearchKeyword(item)}
                                        className="ps-3 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        "Loading"
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;
