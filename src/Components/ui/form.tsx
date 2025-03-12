"use client";
import { toast } from "react-toastify";
import { Input, Button, VStack, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Spinner } from "@/Components/ui/spinner";
import { clearError } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../../slices/authSlice";
import { useRouter } from "next/navigation";
interface props {
  name: string;
  btn: string;
  page: string;
}
export const Form: React.FC<props> = ({ name, page, btn }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userPhone: "",
    userName: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { userName, userPhone } = formData;
  const dispatch = useDispatch();
  const { isLoading, otpWait, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(clearError());
    }
  }, [isError, dispatch, message]);

  const handleClick = () => {
    if (userPhone === "") {
      toast.error("Please fill all the details.");
      return;
    }

    if (page === "Register" && userName === "") {
      toast.error("Please fill all the details.");
      return;
    }

    if (page == "Login") dispatch(login(formData));
    else dispatch(register(formData));

    if (isError) toast.error(message);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (otpWait) {
    router.push("/otpverify");
  }

  return (
    <Box
      bg="gray.900"
      color="white"
      marginTop="2rem"
      p={6}
      rounded="md"
      fontFamily="Sirin Stencil"
      w={{ base: "90%", md: "500px" }}
      mx="auto"
      border="1px solid"
      borderColor="gray.700"
      fontSize="2rem"
    >
      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <Text
          textAlign="center"
          style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
        >
          {name}
        </Text>

        <VStack spaceY={4} align="stretch">
          {page == "Register" && (
            <Box>
              <Text fontSize="sm" mb={1}>
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
          )}
          <Box>
            <Text fontSize="sm" mb={1}>
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
          <Button
            alignItems="center"
            border="1px white solid"
            colorScheme="whiteAlpha"
            margin="auto"
            padding="1.5rem"
            width="30%"
            _hover={{
              color: "black",
              bg: "pink",
            }}
            onClick={handleClick}
          >
            {btn}
          </Button>
        </VStack>
      </fieldset>
    </Box>
  );
};
