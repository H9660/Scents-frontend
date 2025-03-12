import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Image, Grid, Box, Text, Center } from "@chakra-ui/react";
import { Spinner } from "@/Components/ui/Spinner";
import { getperfumes } from "../slices/perfumeSlice";
import { addToCart } from "../slices/authSlice";
export default function Shoppingpage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { perfumes } = useSelector((state) => state.perfumes);
  const { isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    let user = localStorage.getItem("savedUser");
    if (user) user = JSON.parse(user);
    setUser(user);
    dispatch(getperfumes());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Box
        //   m={10}
        fontFamily="Sirin Stencil"
        margin="auto 10% auto"
        textAlign="center"
        color={"white"}
        fontSize="8xl"
        width="clamp(200px, auto, 600px)"
        borderBottom="2px solid gray"
        marginBottom={20}
      >
        Our latest arrivals
      </Box>
      <Grid
        justifyContent="center"
        width="clamp(200px,auto, 600px)"
        display="flex"
        //   placeItems="center"
        marginBottom="4rem"
        flexWrap="wrap"
        templateColumns="repeat(5, minmax(0, 1fr))"
        gap="10"
      >
        {perfumes.map((link) => {
          return (
            <Box
            key={link.name}
              fontFamily="Sirin Stencil"
              border="1px solid white"
              borderRadius="1rem"
              padding="12px"
              transition="0.1s ease-in-out"
              _hover={{
                boxShadow: "0 0 10px 2px white", // Creates the glow effect
                borderColor: "pink", // Optional: Change border color
              }}
            >
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="6">
                <Center>
                  <Image
                    objectFit="contain"
                    position="relative"
                    alignItems="center"
                    rounded="md"
                    src={link.imageUrl}
                    alt="Dan Abramov"
                    maxH="300px"
                  />
                </Center>
                <Card.Root width="320px">
                  <Card.Body textAlign="center" gap="2" spaceY="2rem">
                    <Card.Title
                      fontSize="3rem"
                      textWrap="wrap"
                      lineHeight="shorter"
                    >
                      {link.name}
                    </Card.Title>
                    <Card.Description fontSize={{ base: "2rem" }}>
                      Queen Energy Eau De Parfum Intense
                    </Card.Description>
                  </Card.Body>

                  <Card.Footer justifyContent="flex-end">
                    <Text fontSize="xl" fontWeight="bold" mr="10px">
                      ₹ {link.price}
                    </Text>
                    <Button
                      variant="outline"
                      border="1px solid white"
                      padding="10px"
                      mr="0.8rem"
                      width="auto"
                      borderRadius="4px"
                      fontWeight="bold"
                      transition="0.3s ease-out"
                      _hover={{
                        bg: "white",
                        color: "black",
                      }}
                      onClick={() => {
                        if(!user)
                        {
                          router.push("/login")
                          return
                        }
                        const data = {
                          userId: user.id,
                          cart: {
                            [link.name]: 1,
                          },
                        };
                        console.log(user.id);
                        dispatch(addToCart(data));
                        toast.success("Added to cart successfully");
                      }}
                    >
                      Add to cart
                    </Button>
                    <Button
                      color="black"
                      fontWeight="bold"
                      backgroundColor="#FFB433"
                      padding="10px"
                      borderRadius="4px"
                      // ml="1rem"
                      transition="0.3s ease-out"
                      _hover={{
                        bg: "pink",
                        color: "black",
                      }}
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
                  </Card.Footer>
                </Card.Root>
              </Grid>
            </Box>
          );
        })}
      </Grid>
    </>
  );
}
