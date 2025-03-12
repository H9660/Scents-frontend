"use client";
import { useEffect } from "react";
import {
  Box,
  Image,
  Heading,
  Button,
  Container,
  VStack,
  Separator,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import logo from "../images/logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/Components/ui/drawer";
const Navbar = () => {
  const [small, setSmall] = useState(false);
  const router = useRouter();
  const navUrls = [
    { label: "Home", url: "/home" },
    { label: "Cart", url: "/shoppingcart" },
    { label: "Contact", url: "/contact" },
    { label: "Login", url: "/login" },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) setSmall(true);
      else setSmall(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);
  return (
    <>
    <Container marginTop="2rem" fontFamily="Sirin Stencil">
      <Box
        display="flex"
        padding="10px"
        margin="auto"
        height="auto"
        flexWrap="wrap"
        border="2px solid gray"
        backgroundColor="black"
        justifyContent="space-between"
        alignItems="center"
        width="min(90%, 1200px)"
      >
        <Box display="flex" gap={1} alignItems="center">
          <Image width="60px" height="60px" src={logo.src} alt="scents logo" />
          <Heading
            onClick={() => router.push("/home")}
            fontFamily="Sirin Stencil"
            position="relative"
            fontSize="40px"
 
          >
            Scents
          </Heading>
        </Box>

        {/* Hamburger Icon (Mobile) */}
        {!small && (
          <Box display={{ base: "none", md: "flex" }} gap={5} fontSize="30px">
            {navUrls.map((link) => (
              <Button
                key={link.url}
                onClick={() => router.push(link.url)}
                padding="15px"
                _hover={{ bg: "pink", color: "black" }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        )}

        {small && (
          <>
          <DrawerRoot>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <Button
                display={{ base: "flex", md: "none" }} // Show only on small screens
                variant="outline"
                size="sm"
              >
                <HiMenu />
              </Button>
            </DrawerTrigger>
            <DrawerContent
              textAlign="center"
              fontFamily="Sirin Stencil"
              fontSize="2rem"
            >
              <DrawerHeader>
                <DrawerTitle>Navigation Page</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <VStack
                  mt="10px"
                  display={{ base: "flex", md: "none" }}
                  spaceY="10px"
                >
                  {navUrls.map((link) => (
                     <>
                     <Button
                      key={link.url}
                      onClick={() => {
                        setSmall(false);
                        router.push(link.url);
                      }}
                      w="full"
                      _hover={{ bg: "pink", color: "black" }}
                    >
                      {link.label}
                    </Button>
                    <Separator width="100%" variant="dotted" borderColor="gray" borderWidth="0.1px" />
                      
                   </>
                  ))}
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <DrawerActionTrigger asChild>
                  <Button variant="outline" border="1px solid white" padding="1rem" background="white" color="black">Cancel</Button>
                </DrawerActionTrigger>
              </DrawerFooter>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
          </>
        )}
      </Box>
    </Container>
    </>
  );
};
export default Navbar;
