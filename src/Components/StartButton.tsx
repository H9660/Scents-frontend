import React from 'react'
import {Button} from '@chakra-ui/react'
import { useRouter } from 'next/router'
export default function StartButton() {
  const router = useRouter()
  return (
    <Button onClick={()=>router.push("/shoppingpage")} margin="auto" variant="solid" backgroundColor="white" color="black">Solid</Button>
  )
}
