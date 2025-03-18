import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Image, Grid, Box, Text} from "@chakra-ui/react";
import { Spinner } from "@/Components/ui/spinner.tsx";
import { addToCart } from "../slices/authSlice.ts";
import { RootState } from "@/slices/store.ts";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { perfumeData } from "@/slices/types.ts";
import { User } from "@/slices/types.ts";

export default function Shoppingpage({ perfumesData = [] }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({});
  const { isLoading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    let user = localStorage.getItem("savedUser");
    if (user) user = JSON.parse(user);
    setUser(user as string);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="mainDiv">
        <Box
          fontFamily="Sirin Stencil"
          margin="auto 10%"
          textAlign="center"
          color="white"
          fontSize="8xl"
          borderBottom="4px solid gray"
          marginBottom={20}
        >
          Our latest arrivals
        </Box>

        <Grid
          margin="auto 2rem"
          justifyContent="center"
          width="clamp(200px,auto, 600px)"
          // maxWidth="1400px"
          flexWrap="wrap"
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
          gap={8} // Increased gap for better spacing
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
                objectFit="contain" // Ensures the image fits without being cut
                rounded="md"
                src={link.imageUrl}
                alt={link.name}
                maxH="300px"
                // alignSelf="center"
                {...(link.name === "Dylin Blue" && { marginTop: "1.5rem" })} 
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
                  justifyContent="center"
                  alignItems="center"
                  gap={7}
                  mt={2}
                  spaceY={5}
                >
                  <Text fontSize={{base: "2xl", md: "3xl" }}fontWeight="bold" color="white">
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
                    onClick={() => {
                      if (!user) return router.push("/login");
                      dispatch(
                        addToCart({
                          userId: (user as User).id,
                          cart: { [link.name]: 1 },
                        })
                      );
                      toast.success("Added to cart successfully");
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
                    onClick={() =>
                      router.push(
                        `/perfumeContext?name=${link.name}&url=${
                          link.imageUrl
                        }&price=${link.price || 1000}`
                      )
                    }
                  >
                    Buy now
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
