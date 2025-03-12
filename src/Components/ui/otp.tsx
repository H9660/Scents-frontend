import { useState} from "react";
import { toast } from "react-toastify";
import { reset } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Box, VStack, Heading, Card } from "@chakra-ui/react";
import { verifyotp } from "../../slices/authSlice";
import { useRouter } from "next/navigation";
import { Spinner } from "./spinner";
export default function OTPLogin() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = () => {
    if (otp.length != 6) {
      return;
    }

    dispatch(verifyotp(otp));
    if (isLoading) {
      return <Spinner />;
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      router.push("/home");
      toast.success("Login successful!");
      return;
    }
  };
  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="black"
    >
      <Card.Root width="30%">
        <Card.Body gap="2">
          <VStack spaceY={4}>
            <Heading size="md" textAlign="center">
              Enter OTP
            </Heading>
            <Input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              textAlign="center"
              fontSize="xl"
              letterSpacing="widest"
            />
            <Button colorScheme="blue" w="full" onClick={handleSubmit}>
              Verify OTP
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
