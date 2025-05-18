"use-client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Image, Button, Text, Box, Center } from "@chakra-ui/react";
import { Loader2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { addToCart, resetCartUpdated } from "../slices/authSlice.ts";
import { User, defaultUser } from "@/types.ts";
import { RootState } from "@/slices/store.ts";
import { getperfume } from "@/slices/perfumeSlice.ts";
export default function PerfumeContext() {
  const router = useRouter();
  const [user, setUser] = useState<User>(defaultUser);
  const [currButton, setCurrButton] = useState("");
  const dispatch = useAppDispatch();
  const { currPerfume, perfumeLoading } = useSelector(
    (state: RootState) => state.perfumes
  );
  const { cartUpdated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("savedUser") || "null");
    setUser(user);
  }, []);

  useEffect(() => {
    const { name } = router.query;
    if (name) dispatch(getperfume(name as string));
  }, [router.query.name]);

  useEffect(() => {
    if (cartUpdated) toast.success("Added to cart successfully");
    dispatch(resetCartUpdated());
  }, [cartUpdated]);

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
        background="#352929"
        textAlign="center"
        transition="0.2s ease-in-out"
        _hover={{
          boxShadow: "0 0 15px 3px pink",
          transform: "scale(1.03)",
          borderColor: "pink",
        }}
      >
        {perfumeLoading ? (
          <Loader2 className="animate-spin text-white-400" />
        ) : (
          <>
            <Image
              objectFit="contain"
              rounded="md"
              src={currPerfume.imageUrl}
              alt={currPerfume.name}
              maxH="400px"
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
              <Text fontSize="1.5rem" fontStyle="italic">
                {currPerfume.discription}
              </Text>

              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                mt={7}
              >
                <Text fontSize="3xl" fontWeight="bold" color="white">
                  ₹ {currPerfume.price}
                </Text>
                <Button
                  variant="outline"
                  border="1px solid white"
                  borderRadius="4px"
                  fontWeight="bold"
                  width="40%"
                  padding="1rem"
                  fontSize="1rem"
                  _hover={{ bg: "white", color: "black" }}
                  onClick={async () => {
                    setCurrButton(currPerfume.name);
                    if (!user) return router.push("/login");
                    await dispatch(
                      addToCart({
                        userId: user.id,
                        cart: { [currPerfume.name]: 1 },
                      })
                    );
                  }}
                >
                  {isLoading && currButton === currPerfume.name ? (
                    <Loader2 className="animate-spin text-white-400" />
                  ) : (
                    "Add to cart"
                  )}
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
                  }}
                >
                  Buy now
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Center>
  );
}
