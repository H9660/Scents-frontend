import React from 'react'
import { Center, VStack, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
function PerfumeNotFound() {
    const router = useRouter()
    return (
        <div>
            <Center
            >
                <Center
                    w="500px"
                    h="500px"
                    bg="gray.900"
                    border="2px dashed"
                    borderColor="red.400"
                    borderRadius="2xl"
                    boxShadow="dark-lg"
                >
                    <VStack py={4} textAlign="center">
                        <Text
                            fontSize={{ base: "4xl", md: "3xl" }}
                            fontWeight="extrabold"
                            bgGradient="linear(to-r, red.300, yellow.400)"
                        >
                            🚫 Perfume Not Found
                        </Text>
                        <Text color="gray.300" fontSize="md">
                            The perfume you’re looking for might have vanished like its scent.
                        </Text>
                        <Button size="sm"
                            backgroundColor="#FFB433"
                            color="black"
                            _hover={{ bg: "#FFC555" }} mt={10} p={4} onClick={() => router.push("/home")}>Browse Perfumes</Button>
                    </VStack>
                </Center>

            </Center>
        </div>
    )
}

export default PerfumeNotFound
