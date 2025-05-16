"use-client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Image,  Button, Text, Box, Center } from "@chakra-ui/react";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { addToCart } from "../slices/authSlice.ts";
import { User } from "@/slices/types.ts";
import ShoppingCart from "./shoppingcart.tsx";
import { RootState } from "@/slices/store.ts";
export default function PerfumeContext() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {currPerfume, message } = useSelector((state: RootState) => state.perfumes);
  const {cartUpdated} = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("savedUser") || "null");
    setUser(user);
  }, []);

  const addtoCart = async () => {
    if (!user) router.push("/login");
    else {
      const data = {
        userId: (user as unknown as User).id,
        cart: {
          [currPerfume.name as string]: 1,
        },
      };

      await dispatch(addToCart(data));
      toast.success("Added to cart successfully. Please click on cart.");
    }
  };

  const gotoCart = async () => {
    await addtoCart();
    return <ShoppingCart />;
  };

  return (
    <Center>
    <Box
    key={currPerfume.name}
    fontFamily="Sirin Stencil"
    border="2px solid white"
    borderRadius="1rem"
    m="1rem"
    p="1rem"
    display="flex"
    flexDirection="column"
    textAlign="center"
    transition="0.2s ease-in-out"
    _hover={{
      boxShadow: "0 0 15px 3px pink",
      transform: "scale(1.03)",
      borderColor: "pink",
    }}
  >
  
      <Image
        objectFit="contain"
        rounded="md"
        src={currPerfume.imageUrl}
        alt={currPerfume.name}
        maxH="200px"
        width="100%"
      />

      <Box textAlign="center" mt={4}>
        <Text
          fontSize="2rem"
          whiteSpace="normal"
          lineHeight="shorter"
          marginBottom="1rem"
        >
          {currPerfume.name}
        </Text>
        <Text fontSize="1.2rem" fontStyle="italic">
          {currPerfume.discription}
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={7}
        >
          <Text fontSize="2xl" fontWeight="bold" color="white">
            ₹ {currPerfume.price}
          </Text>
          <Button
            variant="outline"
            border="1px solid white"
            borderRadius="4px"
            fontWeight="bold"
            width="33%"
            padding="1rem"
            fontSize="1rem"
            _hover={{ bg: "white", color: "black" }}
            onClick={async () => {
              if (!user) return router.push("/login");
              await dispatch(
                addToCart({
                  userId: (user as User).id,
                  cart: { [currPerfume.name]: 1 },
                })
              );

              if (cartUpdated) toast.success("Added to cart successfully");
              else toast.error(message);
            }}
          >
            Add to cart
          </Button>

          <Button
            color="black"
            backgroundColor="#FFB433"
            padding="1rem"
            position="relative"
            fontWeight="bold"
            fontSize="1rem"
            borderRadius="4px"
            width="33%"
            _hover={{ bg: "pink", color: "black" }}
            onClick={async () => {
              if (!user) return router.push("/login");
              await dispatch(
                addToCart({
                  userId: (user as User).id,
                  cart: { [currPerfume.name]: 1 },
                })
              );

              if (cartUpdated) toast.success("Added to cart successfully");
              else toast.error(message);
            }}
          >
            Buy now
          </Button>
        </Box>
      </Box>
    </Box>
    </Center>
  );
}
