"use client";
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa6"; // Corrected import for newer version
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  return (
    <Box as="footer" bg="gray.900" py={4} mt="5rem" mb="0rem" fontFamily="Sirin Stencil">
      <Container maxW="container.md">
        <Flex direction="column" align="center" gap={2}>
          {/* Social Icons */}
          <Flex gap={6} color="gray.400">
            <Button
              onClick={() =>
                router.push("https://www.instagram.com/hussian_lohawala/")
              }
            >
              <FaInstagram />
            </Button>
            <Button onClick={() => router.push("/contact")}>
              <FaEnvelope />
            </Button>
            <Button>
              <FaPhone />
            </Button>
          </Flex>

          {/* Copyright */}
          <Text fontSize="sm" color="white" textAlign="center" margin="auto">
            &copy; 2025 Scents. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
