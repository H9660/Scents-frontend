"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { clearError, clearOtpWait, verifyotp, reset } from "@/slices/authSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { RootState } from "@/slices/store";
import { useRouter } from "next/router";
interface props {
  name: string;
}

const Login: React.FC<props> = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { otpWait, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(clearError());
    }
    if (!otpWait) {
      router.push("/login");
    }
  });

  const handleOtpSubmit = () => {
    if (otp.length !== 6) return;
    dispatch(verifyotp(otp));
  };

  useEffect(() => {
    if (isSuccess) {
      const prevPath = sessionStorage.getItem("prevPath");
      if (prevPath === "/login" || !prevPath) {
        router.push("/home");  // Redirect to home if no valid previous path
      } else {
        router.push(prevPath); // Go back to the saved path
      }
      toast.success("Login successful!");
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  const handleClose = () => {
    dispatch(clearOtpWait());
    router.back();
  };



  return (
    <>
      {otpWait && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.400"
          backdropFilter="blur(15px)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="1000"
        >
          <Box
            bg="gray.900"
            color="white"
            p={6}
            rounded="lg"
            w={{ base: "90%", md: "500px" }}
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

            <VStack spaceY={4} align="stretch">
              <Heading size="md" textAlign="center">
                Enter OTP
              </Heading>
              <Input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                textAlign="center"
                fontSize="2xl"
                letterSpacing="widest"
                borderColor="gold"
              />
              <Button
                bg="gold"
                color="black"
                onClick={handleOtpSubmit}
              >
                Verify OTP
              </Button>
            </VStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Login;
