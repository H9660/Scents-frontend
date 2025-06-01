import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setCurrentPerfume } from "@/slices/perfumeSlice";
import { RootState } from "@/slices/store";
import { perfumeData } from "@/types";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [foundPerfumes, setFoundPerfumes] = useState<perfumeData[]>([]);
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
  className="relative w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px] mx-auto px-2"
  ref={inputRef}
>
      <div className="flex items-center bg-gray-700 rounded px-2 py-1">
        <MagnifyingGlassIcon className="h-5 w-5 text-white mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search perfumes..."
          className="px-2 py-1 bg-black text-white w-full focus:outline-none placeholder-white"
        />
      </div>

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
