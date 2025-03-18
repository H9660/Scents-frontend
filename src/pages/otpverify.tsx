"use client"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { reset, clearError } from "../slices/authSlice.ts";
import { useSelector } from "react-redux";
import { Input, Button, Box, VStack, Heading, Card } from "@chakra-ui/react";
import { verifyotp } from "../slices/authSlice.ts";
import { useRouter } from "next/navigation";
import { Spinner } from "../Components/ui/spinner.tsx";
import { RootState } from '../slices/store.js'; // Import your RootState type
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
export default function OTPLogin() {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(clearError());
    }
  }, [isError, message, dispatch]);

  const handleSubmit = () => {
    if (otp.length != 6) {
      return;
    }

    dispatch(verifyotp(otp));

    if (isError) {
      toast.error(message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess) {
    router.push("/home");
    toast.success("Login successful!");
    dispatch(reset());
  }

  return (
    <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="60vh"
    bgGradient="linear(to-br, #1a1a2e, #16213e)"
    color="white"
    fontFamily="Sirin Stencil"
  >
    <Card.Root
      width="100%"
      maxWidth={{base:"400px", md:"500px"}}
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(15px)"
      border="1px solid rgba(255, 255, 255, 0.2)"
      borderRadius="2xl"
      boxShadow="xl"
      p={6}
      textAlign="center"
    >
      <Card.Body gap="4">
        <VStack spaceX={6}>
          <Heading size="lg" color="gold">
            🔒 Secure Login
          </Heading>
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
            margin="2rem auto"
            fontSize="2xl"
            letterSpacing="widest"
            borderColor="gold"
            _placeholder={{ color: "gray.400" }}
            _focus={{ borderColor: "gold" }}
          />
          <Button
            bg="gold"
            color="black"
            fontWeight="bold"
            width="full"
            padding="12px"
            borderRadius="lg"
            borderColor="white"
            _hover={{
              bg: "white",
              color: "black",
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
            }}
            onClick={handleSubmit}
          >
            Verify OTP
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
  );
}
