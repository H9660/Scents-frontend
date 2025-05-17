import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Image, Grid, Box, Text } from "@chakra-ui/react";
import { addToCart, resetCartUpdated } from "../slices/authSlice.ts";
import { RootState } from "@/slices/store.ts";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { Loader2 } from "lucide-react";
import { defaultUser, perfumeData } from "@/types.ts";
import { User } from "@/types.ts";
import { setCurrentPerfume, setAvailablePerfumes } from "@/slices/perfumeSlice.ts";
export default function Shoppingpage({ perfumesData = [] }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>(defaultUser);
  const { isLoading, cartUpdated, message } = useSelector(
    (state: RootState) => state.auth
  );
  const [currButtontoCart, setCurrButtontoCart] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("savedUser") || "null");
    setUser(user);
  }, []);

  useEffect(() => {
    if (cartUpdated) {
      toast.success("Added to cart successfully");
      dispatch(resetCartUpdated());
    }
    if(message!=="")
    toast.error(message)
  }, [cartUpdated, message]);
  
  useEffect(()=>{
    dispatch(setAvailablePerfumes(perfumesData))
  }, [perfumesData])

  return (
    <>
      <div className="mainDiv">
        <Box
          fontFamily="Great Vibes"
          textAlign="center"
          color="white"
          fontSize={{ md: "8xl", base: "6xl" }}
          marginTop={{ base: "5%", md: "4%", lg: "3%" }}
          marginBottom={{ base: "5%", md: "4%", lg: "3%" }}
        >
          Our latest arrivals
        </Box>

        <Grid
          margin="auto 2rem"
          justifyContent="center"
          width="clamp(200px,auto, 600px)"
          flexWrap="wrap"
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
          gap={8}
        >
          {perfumesData.map((link: perfumeData) => (
            <Box
              key={link.name}
              fontFamily="Sirin Stencil"
              border="1px solid white"
              borderRadius="1rem"
              padding="12px"
              transition="0.1s ease-in-out"
              _hover={{
                boxShadow: "0 0 10px 2px white",
                borderColor: "pink",
              }}
            >
              <Image
                objectFit="contain"
                rounded="md"
                src={link.imageUrl}
                alt={link.name}
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
                  {link.name}
                </Text>
                <Text fontSize="1.2rem" fontStyle="italic">
                  {link.discription}
                </Text>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={7}
                >
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    ₹ {link.price}
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
                      setCurrButtontoCart(link.name);
                      if (!user) {
                        router.push("/login");
                        return;
                      }
                      await dispatch(
                        addToCart({
                          userId: (user as User).id,
                          cart: { [link.name]: 1 },
                        })
                      );
                    }}
                  >
                    {isLoading && currButtontoCart === link.name ? (
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
                    onClick={() => {
                      dispatch(setCurrentPerfume(link));
                      router.push(
                        `/perfumeContext?name=${link.name}`
                      );
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </div>
    </>
  );
}
