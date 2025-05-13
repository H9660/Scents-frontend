"use-client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Center, Grid, Image, Card, Button, Text, Box } from "@chakra-ui/react";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { addToCart } from "../slices/authSlice.ts";
import { User } from "@/slices/types.ts";
import ShoppingCart from "./shoppingcart.tsx";
import { RootState } from "@/slices/store.ts";
export default function PerfumeContext() {
  const router = useRouter();
  // const params = useSearchParams();
  // const name = params?.get("name");
  // const url = params?.get("url");
  // const price = params?.get("price");
  const [user, setUser] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {currPerfume} = useSelector((state: RootState)=>state.perfumes)
  useEffect(() => {
    let user = localStorage.getItem("savedUser");
    if (user) user = JSON.parse(user);
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

  const gotoCart= async () => {
      await addtoCart()
      return <ShoppingCart/>
    }

  return (
    <Center color="white" p={4} fontFamily="Sirin Stencil">
      <Box
        width="auto"
        border="1px solid white"
        borderRadius="1rem"
        padding="12px"
      >
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="6">
          <Center>
            <Image
              maxWidth="100%"
              objectFit="contain"
              position="relative"
              alignItems="center"
              rounded="md"
              src={currPerfume.imageUrl}
              alt="Dan Abramov"
              maxH="300px"
            />
          </Center>
          <Card.Root width="320px">
            <Card.Body textAlign="center" gap="2" spaceY="2rem">
              <Card.Title fontSize="3rem" textWrap="wrap" lineHeight="shorter">
                {currPerfume.name}
              </Card.Title>
              <Card.Description fontSize={{ base: "2rem" }}>
              {currPerfume.discription}
              </Card.Description>
            </Card.Body>

            <Card.Footer justifyContent="flex-end">
              <Text fontSize="xl" fontWeight="bold" mr="10px">
                ₹ {currPerfume.price}
              </Text>
              <Button
                variant="outline"
                border="1px solid white"
                padding="10px"
                borderRadius="4px"
                fontWeight="bold"
                transition="0.3s ease-out"
                _hover={{
                  bg: "white",
                  color: "black",
                }}
                onClick={addtoCart}
              >
                Add to cart
              </Button>
              <Button
                color="black"
                fontWeight="bold"
                backgroundColor="#FFB433"
                padding="10px"
                borderRadius="4px"
                ml="1rem"
                transition="0.3s ease-out"
                _hover={{
                  bg: "pink",
                  color: "black",
                }}
                onClick={gotoCart}
              >
                Buy now
              </Button>
            </Card.Footer>
          </Card.Root>
        </Grid>
      </Box>
    </Center>
  );
}
