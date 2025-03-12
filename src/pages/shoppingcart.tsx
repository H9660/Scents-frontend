import { useEffect, useState } from "react";
import { Tables } from "@/Components/ui/table";
import { Button, Center, Text, Grid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/Components/ui/spinner";
import { getUserCart } from "../slices/authSlice";
import { verifyPayment } from "@/slices/paymentSlice";
import { FaExclamationCircle } from "react-icons/fa";
import Razorpay from 'razorpay'
interface Window {
  Razorpay: new (options: any) => any;
}

export default function Shoppingcart() {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const { isLoading } = useSelector((state) => state.auth);
  const { ispaymentLoading } = useSelector((state) => state.payments);
  useEffect(()=> {
    (async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay script loaded!");
      };
      document.body.appendChild(script);

      let user = localStorage.getItem("savedUser");
      if (!user) {
        router.push("/login");
        return;
      }
      if (user) user = JSON.parse(user);
      setUser(user);
      const userCart = await dispatch(getUserCart(user.id));
      console.log(userCart);
      setCart(userCart.payload.cart);
      setTotal(userCart.payload.price);
    })();
  }, []);

  const handlePayment = async () => {
    const res = await fetch(
      `api/payment/makePayment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total * 100, // Amount in paise (₹500)
          userId: user.id, // Example user ID
        }),
      }
    );
    const { order } = await res.json(); // Get order details from backend

    const options = {
      key_id: "rzp_test_UZYDhupdHjejNu",
      amount: order.amount,
      currency: "INR",
      name: "Scents",
      description: `Payment from ${user.id}: ${total}`,
      order_id: order.id,
      handler: function (response) {
        const verifyData = {
          userId: user.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        (async () => {
          const response = await dispatch(verifyPayment(verifyData));
          console.log(response);
          if (response.payload.success === true)
            router.push("/payments/success");
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

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  if (isLoading || ispaymentLoading) return <Spinner />;
  return (
    <>
      <Center
        display="flex"
        height="100vh"
        margin="0"
        fontFamily="Sirin Stencil"
      >
        {cart ? (
          <>
            <Grid>
              <Text fontSize="4rem" marginBottom="2rem" textAlign="center">
                Shopping Cart
              </Text>
              <Tables cart={cart} total={total} />
              <Center>
                <Button
                  alignSelf="center"
                  margin="3rem"
                  color="black"
                  fontWeight="bold"
                  backgroundColor="#FFB433"
                  padding="1rem 2rem"
                  borderRadius="4px"
                  ml="1rem"
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
            <Grid justifyContent="center" alignItems="center">
              <Text fontSize="4rem">Your cart is empty!</Text>
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
