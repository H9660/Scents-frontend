"use client";
import { toast } from "react-toastify";
import {
  Input,
  Button,
  VStack,
  Box,
  Text,
  Flex
} from "@chakra-ui/react";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { clearError, clearSuccess } from "@/slices/authSlice";
import { useSelector } from "react-redux";
import { login } from "@/slices/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/slices/store";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { toggleCartDrawer } from "@/slices/cartSlice";
interface props {
  name: string;
}

const Login: React.FC<props> = ({ name }) => {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const [formData, setFormData] = useState({
    userPhone: "",
    userPassword: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { userPhone, userPassword } = formData;
  const dispatch = useAppDispatch();
  const { isError, message, isSuccess, isLoggedin, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
      dispatch(clearError());
    }

    if (isSuccess) {
      toast.success("Login Successful!");
      dispatch(clearSuccess());
      router.push("/home");
    }
  }, [isError, isLoggedin, isSuccess, dispatch, message, router]);

  const handleClick = async () => {
    if (userPhone.length !== 10) {
      toast.error("Phone number must have 10 digits.");
      return;
    }

    if (userPassword === "") {
      toast.error("Password field cannot be empty.");
      return;
    }
    await dispatch(login(formData));
    if (isError) toast.error(message);
  };

  const handleClose = () => {
    dispatch(toggleCartDrawer());
    setFadeOut(true);
    router.push("/home");
  };

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex="1000"
        className={fadeOut ? "fade-out" : ""}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgGradient="linear(to-r, blackAlpha.700, blackAlpha.400)"
          backdropFilter="blur(12px)"
          onClick={handleClose}
        />

        <Box
          bg="gray.900"
          color="white"
          p={6}
          rounded="2xl"
          fontFamily="Sirin Stencil"
          w={{ base: "90%", md: "500px" }}
          mx="auto"
          border="1px solid"
          borderColor="gray.700"
          boxShadow="xl"
          fontSize="1rem"
          zIndex="1001"
          position="relative"
        >
          <Button
            position="absolute"
            top="10px"
            right="10px"
            size="sm"
            onClick={handleClose}
            bg="transparent"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            ✕
          </Button>

          <Text
            textAlign="center"
            style={{ fontWeight: "bold", marginBottom: "1.5rem" }}
          >
            {name}
          </Text>

          <VStack spaceY={4} align="stretch">
            <Box>
              <Text fontSize="lg" mb={1}>
                Phone Number
              </Text>
              <Input
                bg="gray.800"
                borderColor="gray.600"
                _focus={{ borderColor: "pink.400", boxShadow: "0 0 8px pink" }}
                onChange={onChange}
                name="userPhone"
                value={userPhone}
              />
            </Box>
            <Box>
              <Text fontSize="lg" mb={1}>
                Password
              </Text>
              <Input
                bg="gray.800"
                borderColor="gray.600"
                _focus={{ borderColor: "pink.400", boxShadow: "0 0 8px pink" }}
                onChange={onChange}
                name="userPassword"
                value={userPassword}
              />
            </Box>
            <Flex direction="column" align="center" justify="center">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px white solid"
                borderRadius="1rem"
                transition="0.2s ease-out"
                color="white"
                cursor="pointer"
                padding="0.5rem 2rem"
                fontSize="1.5rem"
                margin="1rem"
                _hover={{
                  bg: "pink",
                  color: "black",
                }}
                onClick={handleClick}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin text-white-400" />
                ) : (
                  "Sign In"
                )}
              </Box>

              <Text color="white" mt="0.5rem">
                Don’t have an account?{" "}
                <Box
                  as="span"
                  color="pink"
                  cursor="pointer"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => router.push("/register")}
                >
                  Sign up
                </Box>
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Box>

      <style jsx>{`
        .fade-out {
          animation: fadeOut 0.3s forwards;
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </>
  );
};

export default Login;
