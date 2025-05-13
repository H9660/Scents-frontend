import React from "react";
import { Grid, Text, Box } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
export default function success() {
  return (
    <div>
      <Grid justifyContent="center" textAlign="center">
        <Box>
          <Text fontSize="3rem">Your payment is successful!</Text>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaCheckCircle size={100} color="gold" />
          </div>
        </Box>
        <Text fontSize="2rem" marginTop="5rem">
          Please check your inbox for order confirmation.
        </Text>
      </Grid>
    </div>
  );
}
