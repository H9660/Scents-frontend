import React from 'react'
import {Grid, Text} from '@chakra-ui/react'
import { FaCheckCircle } from "react-icons/fa";
export default function success() {
  return (
    <div>
       <Grid justifyContent="center" alignItems="center">
              <Text fontSize="4rem">Your payment is successful!</Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaCheckCircle size={100} color="gold" />
              </div>
            </Grid>
    </div>
  )
}
