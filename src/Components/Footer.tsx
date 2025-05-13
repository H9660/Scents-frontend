"use client";
import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  VStack,
  HStack,
  Separator,
} from "@chakra-ui/react";
export function Footer() {
  return (
    <Box marginTop="2rem" as="footer" bg="gray.900" color="gray.400" py={10} px={6} fontFamily="Sirin Stencil">
      <Container maxW="container.xl">
        <Flex
          direction="row"
          justify="space-between"
          gap={10}
        >
          
          {/* Branding & Description */}
          <VStack align="start" spaceY={3}>
          
            <Text fontSize="3xl" fontWeight="bold" color="white" fontFamily="Great Vibes">
           Scentdazzle
            </Text>
            <Text fontSize={{base: "sm", md:"2xl"}}>
            Experience captivating scents crafted to enchant your senses.
Discover fragrances that leave a lasting impression with every spritz.
            </Text>
          </VStack>

          <VStack align="start" spaceY={2} fontSize="xl">
            <Text fontWeight="bold" color="white">
              Company
            </Text>
            {["About", "Pricing", "Blog", "Careers"].map((link) => (
              <Link key={link} href="#" _hover={{ color: "white" }}>
                {link}
              </Link>
            ))}
          </VStack>

          <VStack align="start" spaceY={2} fontSize="xl">
            <Text fontWeight="bold" color="white">
              Help
            </Text>
            {["FAQ", "Contact", "Privacy", "Terms"].map((link) => (
              <Link key={link} href="#" _hover={{ color: "white" }}>
                {link}
              </Link>
            ))}
          </VStack>
        </Flex>

        <Separator margin="1rem" width="100%" variant="dotted" borderColor="gray" borderWidth="0.1px" />
        <Flex
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          align="center"
          fontSize="xl"
        >
          <Text>&copy; 2025 Scentdazzle. All rights reserved.</Text>
          <HStack spaceX={4}>
            <Link href="#" _hover={{ color: "white" }}>
              Privacy Policy
            </Link>
            <Link href="#" _hover={{ color: "white" }}>
              Terms of Service
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
