"use client";
import { toast } from "react-toastify";
import { Input, Button, VStack, Box, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { clearError, register } from "@/slices/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/slices/store";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";

interface props {
  name: string;
}

const Register: React.FC<props> = ({ name }) => {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const [formData, setFormData] = useState({
    userPhone: "",
    userName: "",
    userPassword: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { userName, userPhone, userPassword } = formData;
  const dispatch = useAppDispatch();
  const { isLoading, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(clearError());
    }
  }, [isError, dispatch, message]);

  const handleClick = () => {
    if (userPhone === "" || userName === "" || userPassword === "") {
      toast.error("Please fill all the details.");
      return;
    }

    if (userPhone.length !== 10) {
      toast.error("Phone number must have 10 digits.");
      return;
    }
    dispatch(register(formData));
    if (isError) toast.error(message);
    else {
      toast.success("You are registered. Please login");
      router.push("/login");
    }
  };

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => router.back(), 300);
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
          bg="blackAlpha.600"
          backdropFilter="blur(8px)"
          onClick={handleClose}
        />

        <Box
          bg="gray.900"
          color="white"
          p={6}
          rounded="md"
          fontFamily="Cinzel, serif"
          w={{ base: "90%", md: "500px" }}
          mx="auto"
          border="1px solid"
          borderColor="gray.700"
          fontSize="2rem"
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
                Name
              </Text>
              <Input
                bg="gray.800"
                borderColor="gray.600"
                onChange={onChange}
                name="userName"
                value={userName}
              />
            </Box>
            <Box>
              <Text fontSize="lg" mb={1}>
                Phone Number
              </Text>
              <Input
                bg="gray.800"
                borderColor="gray.600"
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
                  "Sign Up"
                )}
              </Box>

              <Text color="white" mt="0.5rem" fontSize="1rem">
                Alredy have an account?{" "}
                <Box
                  as="span"
                  color="pink"
                  cursor="pointer"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Box>
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Box>

      {/* Add CSS for fade-out effect */}
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

export default Register;
