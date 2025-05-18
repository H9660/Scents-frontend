"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Center,
  Grid,
  Image,
  Box,
  Text,
  Button,
  VStack,
  Flex,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { addToCart, resetCartUpdated } from "../slices/authSlice.ts";
import { User } from "@/types.ts";
import { RootState } from "@/slices/store.ts";

export default function PerfumeContext() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { currPerfume } = useSelector((state: RootState) => state.perfumes);
  const quantities = createListCollection({
    items: [
      { label: "SMALL", value: "5ml" },
      { label: "MEDIUM", value: "10ml" },
      { label: "LARGE", value: "15ml" },
    ],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("savedUser") || "null");
    setUser(user);
  }, []);

  const addtoCart = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const data = {
      userId: (user as unknown as User).id,
      cart: {
        [currPerfume.name as string]: 1,
      },
    };
    await dispatch(addToCart(data));
  };

  const gotoCart = async () => {
    await addtoCart();
    dispatch(resetCartUpdated());
    router.push("/shoppingcart");
  };

  const totalStars = 4.5 as number;

  const renderStars = (stars: number) => {
    const fullStars = Math.floor(stars);
    const halfStar = stars - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <Center color="white" py={6} px={4} fontFamily="Sirin Stencil">
      <Box
        maxW={{ base: "100%", md: "90%", lg: "70%" }}
        border="1px solid white"
        borderRadius="1.5rem"
        background="#352929"
        boxShadow="lg"
        p={{ base: 4, md: 8 }}
        bgGradient="linear(to-r, gray.900, gray.800)"
      >
        {/* Stars at the top */}
        <Text
          fontSize="lg"
          fontWeight="bold"
          mb={4}
          textAlign="right"
          color="yellow.400"
        >
          Rating: {renderStars(totalStars)} ({totalStars.toFixed(1)} / 5)
        </Text>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 6, md: 10 }}
          alignItems="center"
        >
          <Center>
            <Image
              src={currPerfume.imageUrl}
              alt={currPerfume.name}
              borderRadius="lg"
              objectFit="cover"
              border="1px solid white"
              boxShadow="2xl"
              maxH="400px"
            />
          </Center>

          <VStack
            alignItems="flex-start"
            spaceY={6}
            border="1px solid gray"
            padding="1rem"
          >
            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
              {currPerfume.name}
            </Text>
            <Text fontSize={{ base: "1xl", md: "2xl" }} color="gray.300">
              {currPerfume.discription}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              ₹ {currPerfume.price}
            </Text>

            {/* Quantity selector + buttons */}
            <Flex gap={4} w="full" flexWrap={{ base: "wrap", md: "nowrap" }}>
              <Select.Root
                collection={quantities}
                size="sm"
                width="150px"
                border="1px solid white"
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText
                      placeholder="Select quantity"
                      paddingLeft="1rem"
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {quantities.items.map((quantity) => (
                        <Select.Item item={quantity} key={quantity.value}>
                          {quantity.label}{" ("}{quantity.value}{")"}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Button
                variant="outline"
                colorScheme="whiteAlpha"
                borderRadius="full"
                px={6}
                flex="1"
                onClick={addtoCart}
                background="black"
                border="1px solid white"
                _hover={{ bg: "white", color: "black" }}
              >
                Add to cart
              </Button>

              <Button
                bg="#FFB433"
                color="black"
                borderRadius="full"
                px={6}
                fontWeight="bold"
                flex="1"
                onClick={gotoCart}
                _hover={{ bg: "pink.300", color: "black" }}
              >
                Buy now
              </Button>
            </Flex>
          </VStack>
        </Grid>
      </Box>
    </Center>
  );
}
