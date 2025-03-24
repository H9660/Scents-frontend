import { useEffect, useState} from "react";
import  Tables  from "@/Components/ui/table.tsx";
import { Button, Center, Text, Grid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Spinner } from "@/Components/ui/spinner.tsx";
import { FaExclamationCircle } from "react-icons/fa";
import { User } from "@/slices/types.ts";
import { RazorpayOptions, RazorpayInstance } from "@/slices/types.ts";
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function Shoppingcart() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const getCart = async () => {
    console.log(process.env.API_KEY);
    const user = JSON.parse(localStorage.getItem("savedUser") || "");
    const userCart = await fetch(
      `${process.env.NEXT_PUBLIC_API_KEY}api/users/getCart?userId=${user.id}`
    );
    const parsedCart = await userCart.json();
    setTotal(parsedCart.price);
    return parsedCart;
  };

  const { data, isLoading } = useSWR(
    "render",
    getCart
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("savedUser") || "{}"); // Use "{}" instead of ""
    if (!user.id) {
        router.push("/login");
        return;
    }
    setUser(user as string);
}, [router]);


  if (isLoading) return <Spinner />;
  const handlePayment = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded!");
    };
    document.body.appendChild(script);
    const res = await fetch(`api/payment/makePayment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: data?.price * 100, // Amount in paise (₹500)
        userId: (user as User).id, // Example user ID
      }),
    });
    const { order } = await res.json(); // Get order details from backend

    const options: RazorpayOptions = {
      key_id: process.env.RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: "INR",
      name: "Scents",
      description: `Payment from ${(user as User).id}: ${data?.price}`,
      order_id: order.id,
      handler: function (response) {
        const verifyData = {
          userId: (user as User).id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        (async () => {
          const response = await fetch(`api/payment/verifyPayment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(verifyData),
          });
          console.log(response);
          if (response.ok) router.push("/payments/success");
          else router.push("/payments/failure");
        })();
      },
      prefill: {
        name: "Hussain Lohawala",
        email: "lohahussain0@gmail.com",
        contact: "9660835789",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Center
        display="flex"
        // height="100vh"
        margin="0"
        fontFamily="Sirin Stencil"
      >
        {data ? (
          <>
            <Grid>
              <Text fontSize="4rem" textAlign="center">
                Shopping Cart
              </Text>
              <Tables cart={data.cart} total={total} />
              <Center>
                <Button
                  color="black"
                  fontWeight="bold"
                  backgroundColor="#FFB433"
                  padding="1rem 2rem"
                  borderRadius="4px"
                  transition="0.3s ease-out"
                  _hover={{
                    bg: "pink",
                    color: "black",
                  }}
                  onClick={handlePayment}
                >
                  Go to checkout
                </Button>
              </Center>
            </Grid>
          </>
        ) : (
          <>
            <Grid justifyContent="center" alignItems="" >
              <Text fontSize="4rem"  margin="5rem">Your cart is empty!</Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaExclamationCircle size={100} color="white" />
              </div>
            </Grid>
          </>
        )}
      </Center>
    </>
  );
}
