import { HStack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/Components/ui/radio-card"

export const Radiogroup= () => {
  return (
    <RadioCardRoot defaultValue="next">
      <RadioCardLabel>Select payment method</RadioCardLabel>
      <HStack align="stretch" display="flex" flexDirection="column" >
        {items.map((item) => (
          <RadioCardItem
          fontSize="1.5rem"
          position="relative"
          width="90%"
            color="black"
            fontFamily="Cinzel, serif"
            label={item.title}
            description={item.description}
            key={item.value}
            value={item.value}
            background="white"
          />
        ))}
      </HStack>
    </RadioCardRoot>
  )
}

const items = [
  { value: "Not COD", title: "UPI, cards, wallet", description: "Fast and secure" },
  { value: "COD", title: "Cash on delivery", description: "Pay as you receive" },
]
