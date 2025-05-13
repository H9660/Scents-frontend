"use client";
import { toast } from "react-toastify";
import { Input, Button, VStack, Box, Text, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { clearError, clearOtpWait } from "@/slices/authSlice";
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
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { userPhone } = formData;
  const dispatch = useAppDispatch();
  const { otpWait, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(clearError());
    }
  }, [isError, dispatch, message]);

  const handleClick = async () => {
    if (userPhone.length!==10) {
      toast.error("Phone number must have 10 digits.");
      return;
    }
    await dispatch(login(formData));
    if (isError) toast.error(message);
  };

  const handleClose = () => {
    dispatch(clearOtpWait());
    dispatch(toggleCartDrawer())
    setFadeOut(true);
    router.push("/home")
  };

  if (otpWait) {
    sessionStorage.setItem("prevPath", window.location.pathname);
    router.push("/otpverify");
  }

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
            <Grid templateColumns="1fr 1fr">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px white solid"
              borderRadius="1rem"
              color="white"
              cursor="pointer"
              transition="0.2s ease-out"
              margin="1rem"
              _hover={{
                bg: "pink",
                color: "black",
              }}
              onClick={handleClick}
            >
               Login
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              border="1px white solid"
              color="white"
              borderRadius="1rem"
              margin="1rem"
              transition="0.2s ease-out"
              cursor="pointer"
              _hover={{
                bg: "pink",
                color: "black",
              }}
              onClick={()=>router.push("/register")}
            >
               Sign Up
            </Box>
            </Grid>
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