"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { defaultUser, User } from "@/slices/types.ts";
import {
  Box,
  Image,
  Heading,
  Button,
  Container,
  VStack,
  Separator,
} from "@chakra-ui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
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
  const [user, setUser] = useState<User>(defaultUser);
  const navUrls = [
    { label: "Home", url: "/home" },
    { label: "Cart", url: "/shoppingcart" },
  ];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect after the component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);
  const router = useRouter();
  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("savedUser") || "");
    setUser(currUser);
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setSmall(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const navigate = (url: string) => {
    router.push(url);
  };
  return (
    <>
      <Container marginTop="2rem" fontFamily="Sirin Stencil">
        <Box
          display="flex"
          padding="10px"
          margin="auto"
          height="auto"
          flexWrap="wrap"
          border="1px solid gray"
          backgroundColor="black"
          justifyContent="space-between"
          alignItems="center"
          width="min(90%, 1200px)"
        >
          <Box display="flex" gap={1} alignItems="center">
            <Image
              width="40px"
              height="40px"
              src={logo.src}
              alt="scents logo"
            />
            <Heading
              marginTop="0.5rem"
              onClick={() => router.push("/home")}
              fontFamily="Great Vibes"
              position="relative"
              fontSize="2rem"
            >
              Scentdazzle
            </Heading>
          </Box>

          {!small && (
            <Box
              display={{ base: "none", md: "flex" }}
              gap={10}
              fontSize="30px"
            >
              {navUrls.map((link) => (
                <Button key={link.url} onClick={() => navigate(link.url)}>
                  {link.label}
                </Button>
              ))}

              <Button
                key={user.name}
                onClick={() => {
                  user.name
                    ? navigate(`/users/${user.name}`)
                    : navigate("/login");
                }}
              >
                {user.name ? user.name.split(" ")[0] : "Login"}
              </Button>
            </Box>
          )}

          {small && (
            <>
              <DrawerRoot>
                <DrawerBackdrop />
                <DrawerTrigger>
                  <Button
                    // Show only on small screens
                    variant="outline"
                    size="sm"
                  >
                      <Box
      opacity={isVisible ? 1 : 0}
      transition="opacity 0.2s ease-in"
      display="inline-block"
    >
      <Bars3Icon />
    </Box>
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
                    <VStack mt="10px" display={{ base: "flex" }} spaceY="10px">
                      {navUrls.map((link) => (
                        <>
                          <Button
                            key={link.url}
                            onClick={() => {
                              setSmall(false);
                              navigate(link.url);
                            }}
                            w="full"
                            _hover={{ bg: "pink", color: "black" }}
                          >
                            {link.label}
                          </Button>
                          <Separator
                            width="100%"
                            variant="dotted"
                            borderColor="gray"
                            borderWidth="0.1px"
                          />
                        </>
                      ))}
                      <Button
                        key={user.name}
                        onClick={() => {
                          setSmall(false);
                          user.name
                            ? navigate(`/users/${user.name}`)
                            : navigate("/login");
                        }}
                        w="full"
                        _hover={{ bg: "pink", color: "black" }}
                      >
                        {user.name ? user.name.split(" ")[0] : "Login"}
                      </Button>
                    </VStack>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerActionTrigger asChild>
                      <Button
                        variant="outline"
                        border="1px solid white"
                        padding="1rem"
                        background="white"
                        color="black"
                      >
                        Cancel
                      </Button>
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
