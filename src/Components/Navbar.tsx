"use client";
import { useEffect } from "react";
import { defaultUser, User } from "@/types.ts";
import {
  Box,
  Image,
  Heading,
  Button,
  VStack,
  Separator
} from "@chakra-ui/react";
import ProfileButton from "./ui/profileButton.tsx";
import SearchBar from "./ui/searchbar.tsx";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import logo from "../images/logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setisLoggedin } from "@/slices/authSlice.ts";
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
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store.ts";
const Navbar = () => {
  const [small, setSmall] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [isVisible, setIsVisible] = useState(false);
  const { isLoggedin } = useSelector((state: RootState) => state.auth)
  const navUrls = [
    { label: "Home", url: "/home" },
    { label: "Shop", url: "/home" },
  ];

  const router = useRouter();
  const dispatch = useAppDispatch();
  const navigate = (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("savedUser") || "null");
    if (currUser) {
      dispatch(setisLoggedin());
      setUser(currUser);
    }
    else setUser(defaultUser)
  }, [dispatch, isLoggedin]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1230px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSmall(e.matches);
    };

    // Set initial value
    setSmall(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <>
      <Box marginBottom="1rem" fontFamily="Cinzel, serif">
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
            {!small && (<Heading
              marginTop="0.5rem"
              onClick={() => router.push("/home")}
              fontFamily="Great Vibes"
              position="relative"
              fontSize="2rem"
            >
              Scentdazzle
            </Heading>)}
          </Box>

          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            id="search-bar"
          >
            <SearchBar />
          </Box>

          {!small && (
            <>
              <Box id="nav-buttons" display={small ? "none" : "flex"} gap={10} fontSize="30px">
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
                  <Button variant="outline" size="sm">
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
                  fontFamily="Cinzel, serif"
                  fontSize="2rem"
                >
                  <DrawerHeader>
                    <DrawerTitle>ScentDazzle</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <VStack mt="10px" display={{ base: "flex" }} spaceY="10px">
                      {navUrls.map((link) => (
                        <>
                          <Button
                            key={link.url}
                            onClick={() => {
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
                          if (user?.name !== "") navigate(`/users/${user?.name}`);
                          else navigate("/login");
                        }}
                        w="full"
                        _hover={{ bg: "pink", color: "black" }}
                      >
                        {user?.name !== "" ? <UserIcon /> : "Login"}
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
