import useSWR from "swr";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components/ui/spinner";
import { User } from "@/types";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  RazorpayOptions,
  RazorpayInstance,
  defaultUser,
  cartItemFormat,
} from "@/types";
import Image from "next/image";
import { createTransaction } from "@/utils/paymentUtil";
import { RootState } from "@/slices/store";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function CheckoutPage() {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { isLoggedin } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!isLoggedin) router.push("/home");
  }, [isLoggedin, router]);

  const getCart = async () => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("savedUser") || "null");
      if (!savedUser) {
        router.push("/home");
        return;
      }

      const userCart = await axios.get(
        `api/users/getCart?userId=${savedUser.id}`,
        {
          withCredentials: true,
        }
      );

      setTotal(userCart.data.price);
      return userCart.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  };

  const { data, isLoading } = useSWR("cart", getCart, {
    revalidateOnFocus: false,
  });
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("savedUser") || "null");
    const formData = JSON.parse(localStorage.getItem("address") || "null");
    if (formData) setFormData(formData);
    if (!savedUser?.id) {
      router.push("/login");
      return;
    }
    setUser(savedUser as User);
  }, [router]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.street) newErrors.street = "Street address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode || !/^\d{5,6}$/.test(formData.pincode))
      newErrors.pincode = "Valid ZIP code is required (5-6 digits)";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    localStorage.setItem("address", JSON.stringify(formData));
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    const res = await fetch(`api/payment/makePayment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: data.price * 100,
        userId: user?.id,
      }),
    });

    const { order } = await res.json();
    const options: RazorpayOptions = {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: "INR",
      name: "Scentdazzle",
      description: `Payment from ${user?.id}: ${data?.price}`,
      order_id: order.id,
      handler: async function (response) {
        const verifyData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        const responseVerify = await fetch(`api/payment/verifyPayment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verifyData),
        });
        let status = "Pending";
        if (responseVerify.ok) {
          status = "Completed";
          router.push("/payments/success");
        } else {
          status = "Failed";
          router.push("/payments/failure");
          return;
        }

        const orderDetails = {
          cart: data.cart,
          userId: user?.id,
        };

        const { name, email, ...sendData } = formData;
        console.log(formData);
        const transxnId = await createTransaction({
          userId: user?.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          subtotal: data?.price || 0,
          orderDetails: orderDetails,
          status: status,
          address: sendData,
        });

        const emaildata = {
          name: name,
          email: email,
          transactionId: transxnId,
          cartdata: data,
          address: sendData,
        };

        await fetch(`/sendemail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emaildata),
        });

        await fetch("/api/users/deletecart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.id }), // Sending userId as payload in the request body
        });
      },

      prefill: {
        name: formData.name,
        contact: "",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2 sm:p-4 md:p-6 font-roboto">
      <div className="w-full max-w-6xl bg-black shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden md:h-[40rem] lg:h-[50rem]">
        {/* Left Section: Form (Fixed) */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 bg-gray-800 text-white flex flex-col md:h-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
            Shipping Details
          </h2>
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData ? formData.name : ""}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base md:text-lg"
              />
              {errors.name && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData ? formData.email : ""}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base md:text-lg"
              />
              {errors.email && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <textarea
                name="street"
                placeholder="Street Address"
                value={formData ? formData.street : ""}
                onChange={handleInputChange}
                className="w-full p-2 sm:p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base md:text-lg"
                rows={3}
              />
              {errors.street && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.street}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData ? formData.city : ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base md:text-lg"
                />
                {errors.city && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData ? formData.state : ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base md:text-lg"
                />
                {errors.state && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="ZIP Code"
                  value={formData ? formData.pincode : ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base md:text-lg"
                />
                {errors.pincode && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {errors.pincode}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData ? formData.country : ""}
                  onChange={handleInputChange}
                  className="w-full p-2 sm:p-3 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm sm:text-base md:text-lg"
                />
                {errors.country && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {errors.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Cart (Scrollable Items) */}
        <div className="w-full md:w-1/2 bg-gray-900 p-4 sm:p-6 md:p-8 text-white flex flex-col sm:h-[60vh] md:h-full">
          {data && data.cart && Object.entries(data.cart).length > 0 ? (
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
                Your Cart
              </h2>

              {/* Scrollable Cart Items */}
              <ScrollArea className="flex-1 overflow-y-scroll h-[500px]">
                <ul className="divide-y divide-gray-700">
                  {Object.entries(data.cart).map(([ele, idx]) => (
                    <li
                      key={ele}
                      className="flex py-3 sm:py-4 md:py-6 items-center"
                    >
                      <Image
                        src={(idx as cartItemFormat).imageUrl}
                        alt={ele}
                        width={100}
                        height={100}
                        className="w-40 h-40 object-contain"
                      />

                      <div className="ml-3 sm:ml-4 md:ml-6">
                        <p className="text-base sm:text-lg md:text-xl font-medium">
                          {ele}
                        </p>
                        <p className="text-sm sm:text-base md:text-lg">
                          ₹ {(idx as cartItemFormat).price}
                        </p>
                        <p className="text-xs sm:text-sm md:text-md text-gray-400">
                          Qty: {(idx as cartItemFormat).quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="mt-4 sm:mt-6 md:mt-8 border-t border-gray-700 pt-3 sm:pt-4 md:pt-6">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                  Subtotal: ₹ {total}
                </p>
                <button
                  onClick={handlePayment}
                  className="mt-3 sm:mt-4 md:mt-6 w-full bg-yellow-500 text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-md hover:bg-yellow-600 transition-colors duration-200 font-semibold text-sm sm:text-base md:text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <FiAlertCircle className="text-xl text-gray-400 mr-2" />
              <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                Your cart is empty!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
