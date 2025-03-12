import {
  Button,
  Input,
  Textarea,
  VStack,
  Box,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Center minH="80vh" bg="black" color="white" p={4} fontFamily="Sirin Stencil">
      <Box
        width="min(90%, 1200px)"
        p={8}
        borderRadius="lg"
        border="2px solid gray"
        boxShadow="lg"
        // maxWidth="50vw"
        // width="min(90%, 1100px)"
      >
        <Heading fontSize="4xl" textAlign="center" mb={4} fontFamily="Sirin Stencil">
          Contact Details
        </Heading>
        <Text fontSize="md" textAlign="center" mb={6}>
          Please provide your contact details below.
        </Text>

        <VStack spaceY={4} align="stretch">
          <Box>
            <Text fontSize="lg" mb={1}>
              Name
            </Text>
            <Input required padding={2} placeholder="Enter your name" border="1px solid gray" />
          </Box>

          <Box>
            <Text fontSize="lg" mb={1}>
              Phone Number
            </Text>
            <Input required padding={2} placeholder="Enter your phone number" border="1px solid gray" />
          </Box>
          <Box>
            <Text fontSize="lg" mb={1}>
              Email
            </Text>
            <Input padding={2} placeholder="Enter your phone number" border="1px solid gray" />
          </Box>
          <Box>
            <Text fontSize="lg" mb={1}>
              Feedback
            </Text>
            <Textarea required padding={2}placeholder="Please type your feedback..." border="1px solid gray" />
          </Box>

          <Button type="submit" bg="white" color="black" _hover={{ bg: "pink.300" }}>
            Submit
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Contact;
