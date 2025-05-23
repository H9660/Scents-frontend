"use client";
import useSWR from "swr";
import AddressForm from "@/Components/AddressForm";
import PaymentButton from "@/Components/PaymentButton";
import { FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components/ui/spinner";
import { User } from "@/types";
import { useSelector } from "react-redux";
import axios from "axios";
import { RazorpayOptions, RazorpayInstance, defaultUser } from "@/types";
import { RootState } from "@/slices/store";
import Cartdata from "@/Components/Cartdata";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function CheckoutPage() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2 sm:p-4 md:p-6 font-roboto">
      <div className="w-full max-w-6xl bg-black shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden md:h-[40rem] lg:h-[50rem]">
        {/* Left Section: Form (Fixed) */}
        <AddressForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />

        {/* Right Section: Cart (Scrollable Items) */}
        <div className="w-full md:w-1/2 bg-gray-900 p-4 sm:p-6 md:p-8 text-white flex flex-col sm:h-[60vh] md:h-full">
          {data && data.cart && Object.entries(data.cart).length > 0 ? (
            <>
              <Cartdata data={data} />
              <PaymentButton
                formData={formData}
                setErrors={setErrors}
                data={data}
                user={user}
                total={total}
              />
            </>
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
