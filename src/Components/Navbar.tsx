"use client";
import { useEffect } from "react";
import { defaultUser, User } from "@/types.ts";
import {
  Box,
  Image,
  Heading,
  Button,
  VStack,
  Separator,
} from "@chakra-ui/react";
import ProfileButton from "./ui/profileButton.tsx";
import SearchBar from "./ui/searchbar.tsx";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
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
  const [isVisible, setIsVisible] = useState(false);
  const navUrls = [
    { label: "Home", url: "/home" },
    { label: "Shop", url: "/home" },
  ];

  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("savedUser") || "null");
    if (currUser) setUser(currUser);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSmall(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  return (
    <>
      <Box marginBottom="1rem" fontFamily="Sirin Stencil">
        <Box
          display="flex"
          padding="10px"
          margin="auto"
          height="auto"
          flexWrap="wrap"
          borderBottom="1px solid gray"
          backgroundColor="black"
          justifyContent="space-between"
          alignItems="center"
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
            <>
              <Box
                marginLeft="103px"
                flex="1"
                display="flex"
                justifyContent="center"
              >
                <SearchBar small={small} />
              </Box>

              <Box
                display={{ base: "none", md: "flex" }}
                gap={10}
                fontSize="30px"
              >
                {navUrls.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.url)}
                    className="relative group"
                  >
                    <span className="relative">{link.label}</span>
                    <span className="absolute left-0 bottom-0 h-px w-full bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </button>
                ))}

                <ProfileButton />
              </Box>
            </>
          )}

          {small && (
            <>
              <DrawerRoot>
                <DrawerBackdrop />
                <DrawerTrigger>
                  <Button
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
                        key={user?.name}
                        onClick={() => {
                          setSmall(false);
                          if (user?.name) navigate(`/users/${user?.name}`);
                          else navigate("/login");
                        }}
                        w="full"
                        _hover={{ bg: "pink", color: "black" }}
                      >
                        {user?.name ? <UserIcon /> : "Login"}
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
      </Box>
    </>
  );
};
export default Navbar;
