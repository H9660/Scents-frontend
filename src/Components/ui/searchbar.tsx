import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setCurrentPerfume } from "@/slices/perfumeSlice";
import { RootState } from "@/slices/store";
import { perfumeData } from "@/types";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ small }: { small: boolean }) {
  const [query, setQuery] = useState("");
  const [foundPerfumes, setFoundPerfumes] = useState<perfumeData[]>([]);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useAppDispatch();
  const { perfumes } = useSelector((state: RootState) => state.perfumes);
  const inputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredPerfumes = perfumes.filter((perfume) =>
      perfume.name.toLowerCase().includes(value.toLowerCase())
    );
    setFoundPerfumes(filteredPerfumes);
    setQuery(value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setFoundPerfumes([]);
        setShowInput(false); // hide on click outside for small screen
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      {small ? (
        <div>
          <button
            onClick={() => setShowInput(!showInput)}
            className="p-2 bg-white rounded-full"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-black" />
          </button>

          {showInput && (
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search perfumes..."
              className="mt-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px] bg-white text-black"
              autoFocus
            />
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search your favourite perfume..."
            className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[500px] bg-transparent"
          />
        </div>
      )}

      {foundPerfumes.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-48 overflow-y-auto border border-gray-300 bg-white rounded shadow-lg z-10">
          <ul>
            {foundPerfumes.map((perfume) => (
              <li
                key={perfume.name}
                className="text-black px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  router.push(`/perfumeContext?name=${perfume.name}`);
                  dispatch(setCurrentPerfume(perfume));
                  setFoundPerfumes([]);
                  setQuery(perfume.name);
                  if (small) setShowInput(false);
                }}
              >
                {perfume.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
