"use client"
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Image, Box, Text, Icon, Stack } from "@chakra-ui/react";
import { addToCart, resetCartUpdated } from "../slices/authSlice.ts";
import { RootState } from "@/slices/store.ts";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { Loader2 } from "lucide-react";
import { defaultUser, perfumeData } from "@/types.ts";
import { User } from "@/types.ts";
import {
  setAvailablePerfumes,
} from "@/slices/perfumeSlice.ts";
import { FaShoppingCart } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
    if (user) setUser(user);
  }, []);

  useEffect(() => {
    if (cartUpdated) {
      toast.success("Added to cart successfully");
      dispatch(resetCartUpdated());
    }

    if (message === "Authentication token is missing")
      toast.error("Please login.");
    else if (message !== "") toast.error(message);
  }, [cartUpdated, message, dispatch]);

  useEffect(() => {
    dispatch(setAvailablePerfumes(perfumesData));
  }, [perfumesData, dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Box
        className="mainDiv"
        bg="gray.900"
        color="white"
        minH="100vh"
        py={10}
        overflow="hidden"
      >
        <Box
          fontFamily="Great Vibes"
          textAlign="center"
          fontSize={{ md: "8xl", base: "6xl" }}
          mb={10}
        >
          Our Latest Arrivals
        </Box>

        <Box maxW="1200px" mx="auto" px={4}>
          {perfumesData?.length > 0 && (
            <Slider {...settings}>
              {perfumesData.map((link: perfumeData) => (
                <Box key={link.name} px={3} py={5}>
                  <Box
                    fontFamily="Hanken Grotesk, sans-serif"
                    border="1px solid"
                    borderColor="gray.700"
                    bg="gray.800"
                    borderRadius="1rem"
                    padding="1.5rem"
                    transition="0.3s ease-in-out"
                    _hover={{
                      boxShadow: "0 0 15px 3px rgba(255, 180, 51, 0.6)",
                      borderColor: "#FFB433",
                    }}
                    height="550px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Box h="250px" w="100%" mb={4}>
                        <Image
                          objectFit="contain"
                          rounded="md"
                          src={link.imageUrl}
                          alt={link.name}
                          h="100%"
                          w="100%"
                        />
                      </Box>

                      <Box textAlign="center" h="120px">
                        <Text
                          fontSize="2rem"
                          fontWeight="bold"
                          lineHeight="shorter"
                          mb={2}
                          color="#FFB433"
                          css={{
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {link.name}
                        </Text>
                        <Text
                          fontSize="1rem"
                          fontStyle="italic"
                          color="gray.300"
                          mb={6}
                          css={{
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {link.discription}
                        </Text>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-end"
                      mt={4}
                    >
                      <Text
                        fontSize="2.2rem"
                        fontWeight="bold"
                        color="white"
                        fontFamily="Cinzel, serif"
                      >
                        ₹{link.price}
                      </Text>
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        width="55%"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          borderColor="#FFB433"
                          color="#FFB433"
                          _hover={{ bg: "#FFB433", color: "black" }}
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
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Stack direction="row" align="center" px={2}>
                              <Icon as={FaShoppingCart} />
                              <Text>Add to cart</Text>
                            </Stack>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          backgroundColor="#FFB433"
                          color="black"
                          _hover={{ bg: "#FFC555" }}
                          onClick={() => {
                            router.push(`/perfumeContext?name=${link.name}`);
                          }}
                        >
                          Buy Now
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Slider>
          )}
        </Box>
      </Box>
    </>
  );
}
