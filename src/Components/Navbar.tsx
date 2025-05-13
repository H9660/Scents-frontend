"use client";
import { useEffect, useLayoutEffect } from "react";
import { NavUrl, defaultUser, User } from "@/slices/types.ts";
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
  const [user, setUser] = useState<User>(defaultUser)
  const [navUrls, setnavUrls] = useState<NavUrl[]>([
    { label: "Home", url: "/home" },
    { label: "Cart", url: "/shoppingcart" },
    { label: "Loading...", url: "#" },
  ]);

  const router = useRouter();
  useEffect(()=>{
    const currUser = JSON.parse(localStorage.getItem('savedUser') || "")
    setUser(currUser)
  }, [])
  
  useLayoutEffect(() => {
    setnavUrls((prevNavUrls) => {
      const updatedNavUrls = [...prevNavUrls];
      updatedNavUrls[2] = user?.name
        ? { label: user.name.split(" ")[0], url: `/${user.name}` }
        : { label: "Login", url: "/login" };
      return updatedNavUrls;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) setSmall(true);
      else setSmall(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const navigate = (url: string, label: string) => {
    if(label!="Home" && label!="Cart")
    {{
      if(user)
    router.push(`/users/${user.name}`);
    else router.push("login");}
  }
  else router.push(url)
}
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

          {/* Hamburger Icon (Mobile) */}
          {!small && (
            <Box display={{ md: "flex" }} gap={10} fontSize="30px">
              {navUrls.map((link) => (
                <Button
                  key={link.url}
                  onClick={()=>navigate(link.url, link.label)}
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
                <DrawerTrigger>
                  <Button
                    // Show only on small screens
                    variant="outline"
                    size="sm"
                  >
                    <Bars3Icon />
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
                              navigate(link.url, link.label)
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
