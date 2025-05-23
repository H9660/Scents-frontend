import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { cartItemFormat } from "@/types";
export default function Cartdata({ data }) {
  return (
    <>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
        Your Cart
      </h2>

      {/* Scrollable Cart Items */}
      <ScrollArea className="flex-1 overflow-y-scroll h-[500px]">
        <ul className="divide-y divide-gray-700">
          {Object.entries(data.cart).map(([ele, idx]) => (
            <li key={ele} className="flex py-3 sm:py-4 md:py-6 items-center">
              <Image
                src={(idx as cartItemFormat).imageUrl}
                alt={ele}
                width={100}
                height={100}
                className="w-40 h-40 object-contain"
              />

              <div className="ml-3 sm:ml-4 md:ml-6">
                <p className="text-base sm:text-lg md:text-xl font-medium">
                  {ele}
                </p>
                <p className="text-sm sm:text-base md:text-lg">
                  ₹ {(idx as cartItemFormat).price}
                </p>
                <p className="text-xs sm:text-sm md:text-md text-gray-400">
                  Qty: {(idx as cartItemFormat).quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </>
  );
}
