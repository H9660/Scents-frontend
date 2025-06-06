"use-client"
import React, {useState} from 'react'
import { Button, IconButton, Box } from '@chakra-ui/react'
import { X } from 'lucide-react'
export default function Chatbot() {
  const [botOpen, setBotOpen] = useState(false)
  return (
    <div>
      <Box position="fixed" bottom="30px" right="30px" zIndex="9999">
                {/* Chat Popup */}
                {botOpen && (
                  <Box
                    position="absolute"
                    bottom="80px"
                    right="0"
                    w="360px"
                    h="500px"
                    borderRadius="1rem"
                    overflow="hidden"
                    background="linear-gradient(270deg, #1e0525, #2b0e36, #1e0525)"
                    backgroundSize="400% 400%"
                    border="2px solid #FFB433"
                    boxShadow="0 0 20px 5px rgba(255, 180, 51, 0.6)"
                    animation="fadeIn 0.3s ease-out, gradientShift 10s ease infinite"
                  >
                    {/* Close Button */}
                    <IconButton
                      aria-label="Close bot"
                      size="sm"
                      position="absolute"
                      top="8px"
                      right="8px"
                      bg="white"
                      color="black"
                      zIndex="100"
                      
                      _hover={{ bg: "pink.200" }}
                      onClick={() => setBotOpen(false)}
                    ><X/>
                    </IconButton>
      
                    {/* Iframe */}
                    <iframe
                      src="https://www.chatbase.co/chatbot-iframe/GIMECfaIxW8Bs0Z6o8BJW"
                      width="100%"
                      height="100%"
                      style={{
                        border: "none",
                        backgroundColor: "#1e0525",
                      }}
                    />
                  </Box>
                )}
      
                {/* Floating Button */}
                <Button
                  onClick={() => setBotOpen(!botOpen)}
                  bgColor="white"
                  color="black"
                  padding="1.5rem"
                  borderRadius="50px"
                  fontWeight="bold"
                  fontSize="1rem"
                  boxShadow="0 0 15px rgba(255, 102, 196, 0.7)"
                  animation="pulse 2s infinite"
                  _hover={{
                    bgGradient: "linear(to-r, #FF66C4, #FFB433)",
                    transform: "scale(1.05)",
                  }}
                >
                  Find Your Scent
                </Button>
      
                {/* Animations */}
                <style jsx>{`
                  @keyframes pulse {
                    0% {
                      transform: scale(1);
                      box-shadow: 0 0 10px rgba(255, 102, 196, 0.7);
                    }
                    50% {
                      transform: scale(1.05);
                      box-shadow: 0 0 20px rgba(255, 102, 196, 1);
                    }
                    100% {
                      transform: scale(1);
                      box-shadow: 0 0 10px rgba(255, 102, 196, 0.7);
                    }
                  }
                  @keyframes gradientShift {
                    0% {
                      background-position: 0% 50%;
                    }
                    50% {
                      background-position: 100% 50%;
                    }
                    100% {
                      background-position: 0% 50%;
                    }
                  }
      
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                      transform: translateY(10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </Box>
    </div>
  )
}
