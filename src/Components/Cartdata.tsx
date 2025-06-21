import React, { useEffect, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { CirclePlus, CircleMinus, Loader2 } from "lucide-react";
import { mutate } from "swr";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { resetCartUpdated } from "@/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { cartItemFormat, defaultUser, User } from "@/types";
import { addToCart } from "@/slices/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";
export default function Cartdata({ data }) {
  const [user, setUser] = useState<User>(defaultUser);
  const { isLoading, cartUpdated } = useSelector(
    (state: RootState) => state.auth
  );
  const [currAddCart, setCurrAddCart] = useState("");
  const [currRemCart, setCurrRemCart] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  async function updateCart(ele, count) {
    if (count == 1) setCurrAddCart(ele);
    else setCurrRemCart(ele);
    await dispatch(
      addToCart({
        userId: (user as User).id,
        cart: { [ele]: count },
      })
    );

    if (count == 1) setCurrAddCart("");
    else setCurrRemCart("");
    mutate("cart");
  }
  useEffect(() => {
    let authUser;
    (async () => {
      authUser = await axios.get("/api/users/me", { withCredentials: true });
      if (authUser.status == "401") {
        toast.error("Session Expired. Please login.");
        router.push("/login");
        return;
      }
    })();

    const savedUser = JSON.parse(localStorage.getItem("savedUser") || "");
    if (!savedUser) {
      toast.error("Please login");
      router.push("/login");
    }

    setUser(savedUser);
  }, [router]);

  useEffect(() => {
    if (cartUpdated) {
      toast.success("Cart updated!");
      dispatch(resetCartUpdated());
    }
  }, [cartUpdated]);

  return (
    <>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
        Your Cart
      </h2>

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

              <div className="ml-3 sm:ml-4 md:ml-6 w-full">
                <div className="flex justify-between items-start w-full">
                  <p className="text-base sm:text-lg md:text-xl font-medium">
                    {ele}
                  </p>
                  <div className="flex flex-row items-center gap-3 mr-3">
                    <Button onClick={() => updateCart(ele, 1)}>
                      {isLoading && currAddCart === ele ? (
                        <Loader2 className="animate-spin text-white-400" />
                      ) : (
                        <CirclePlus />
                      )}
                    </Button>
                    {(idx as cartItemFormat).quantity}
                    <Button onClick={() => updateCart(ele, -1)}>
                      {isLoading && currRemCart === ele ? (
                        <Loader2 className="animate-spin text-white-400" />
                      ) : (
                        <CircleMinus />
                      )}
                    </Button>
                  </div>
                </div>

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
