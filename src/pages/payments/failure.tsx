import React from 'react'
import {Grid, Text} from '@chakra-ui/react'
import { FaExclamationCircle } from "react-icons/fa";
export default function success() {
  return (
    <div>
       <Grid justifyContent="center" alignItems="center">
              <Text fontSize="4rem">Your payment failed!</Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaExclamationCircle size={100} color="red" />
              </div>
            </Grid>
    </div>
  )
}
