import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Sparkles, X } from "lucide-react";
import { Button, Image, Grid, Box, Text, IconButton } from "@chakra-ui/react";
import { addToCart, resetCartUpdated } from "../slices/authSlice.ts";
import { RootState } from "@/slices/store.ts";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { Loader2 } from "lucide-react";
import { defaultUser, perfumeData } from "@/types.ts";
import { User } from "@/types.ts";
import {
  setCurrentPerfume,
  setAvailablePerfumes,
} from "@/slices/perfumeSlice.ts";
export default function Shoppingpage({ perfumesData = [] }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>(defaultUser);
  const [botOpen, setBotOpen] = useState(false);
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
              background="#352929"
              borderRadius="1rem"
              padding="12px"
              transition="0.3s ease-in-out"
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
                      router.push(`/perfumeContext?name=${link.name}`);
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>

        <Box position="fixed" bottom="30px" right="30px" zIndex="9999">
          {/* Chat Popup */}
          {botOpen && (
            <Box
              position="absolute"
              bottom="80px"
              right="0"
              w="360px"
              h="500px"
              borderRadius="1rem"
              overflow="hidden"
              background="linear-gradient(270deg, #1e0525, #2b0e36, #1e0525)"
              backgroundSize="400% 400%"
              border="2px solid #FFB433"
              boxShadow="0 0 20px 5px rgba(255, 180, 51, 0.6)"
              animation="fadeIn 0.3s ease-out, gradientShift 10s ease infinite"
            >
              {/* Close Button */}
              <IconButton
                icon={<X />}
                aria-label="Close bot"
                size="sm"
                position="absolute"
                top="8px"
                right="8px"
                bg="white"
                color="black"
                zIndex="100"
                _hover={{ bg: "pink.200" }}
                onClick={() => setBotOpen(false)}
              />

              {/* Iframe */}
              <iframe
                src="https://www.chatbase.co/chatbot-iframe/GIMECfaIxW8Bs0Z6o8BJW"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  backgroundColor: "#1e0525",
                }}
              />
            </Box>
          )}

          {/* Floating Button */}
          <Button
            onClick={() => setBotOpen(!botOpen)}
            leftIcon={<Sparkles />}
            bgColor="white"
            color="black"
            padding="1.5rem"
            borderRadius="50px"
            fontWeight="bold"
            fontSize="1rem"
            boxShadow="0 0 15px rgba(255, 102, 196, 0.7)"
            animation="pulse 2s infinite"
            _hover={{
              bgGradient: "linear(to-r, #FF66C4, #FFB433)",
              transform: "scale(1.05)",
            }}
          >
            Find Your Scent
          </Button>

          {/* Animations */}
          <style jsx>{`
            @keyframes pulse {
              0% {
                transform: scale(1);
                box-shadow: 0 0 10px rgba(255, 102, 196, 0.7);
              }
              50% {
                transform: scale(1.05);
                box-shadow: 0 0 20px rgba(255, 102, 196, 1);
              }
              100% {
                transform: scale(1);
                box-shadow: 0 0 10px rgba(255, 102, 196, 0.7);
              }
            }
            @keyframes gradientShift {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </Box>
      </div>
    </>
  );
}
