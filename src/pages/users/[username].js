"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { defaultUser } from "@/types";
import { logout } from "@/slices/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components/ui/spinner";

const getUserOrders = async (id) => {
  if (!id) return;
  const response = await axios.get(`/api/users/getOrders?${id}`, {
    withCredentials: true,
  });
  return response;
};

export default function UserAccount() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [curruser, setcurrUser] = useState(defaultUser);
  const [address, setAddress] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const dispatch = useAppDispatch();
  const { isLoggedin } = useSelector((state) => state.auth);

  useEffect(() => {
    const userStr = localStorage.getItem("savedUser");
    const addressStr = localStorage.getItem("address");
    if (userStr) setcurrUser(JSON.parse(userStr));
    if (addressStr) setAddress(JSON.parse(addressStr));
    setIsLoadingUser(false);
  }, []);

  useEffect(() => {
    if (!isLoggedin) router.push("/home");
  }, [isLoggedin, router]);

  const { data, error, isLoading } = useSWR(
    curruser?.id ? "myorders" : null,
    () => getUserOrders(curruser.id)
  );

  if (error) return <div className="text-white">Failed to load user data.</div>;
  if (isLoading || isLoadingUser) return <Spinner />;

  return (
    <div className="min-h-[50vh] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex justify-center items-start py-10 px-4">
      <div className="bg-gray-800 p-4 sm:p-6 rounded-3xl w-full max-w-6xl shadow-lg flex flex-col sm:flex-row gap-6">
        {/* Sidebar */}
        <div className="sm:w-1/4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("details")}
            className={`transition-all text-sm font-medium py-2 px-4 rounded-xl ${
              activeTab === "details"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`transition-all text-sm font-medium py-2 px-4 rounded-xl ${
              activeTab === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => {
              dispatch(logout());
              window.location.href = "/";
            }}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl mt-4"
          >
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "details" && (
            <div className="space-y-4 text-gray-300">
              <div><strong>Username:</strong> <span className="ml-2">{curruser.name}</span></div>
              <div><strong>Phone:</strong> <span className="ml-2">{curruser.phone}</span></div>
              <div><strong>Address:</strong> <span className="ml-2">{address.address}</span></div>
              <div>
                <strong>Account Created:</strong>{" "}
                <span className="ml-2">
                  {new Date(curruser.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <strong>Orders Placed:</strong>{" "}
                <span className="ml-2 text-green-400">
                  {data ? data.data.orders.length : 0}
                </span>
              </div>
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-lg"
                onClick={() => setShowModal(true)}
              >
                Edit details
              </button>
            </div>
          )}

          {/* Edit Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
              <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Update Address
                </h2>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Street"
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    value={address.street || ""}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    value={address.city || ""}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    value={address.zip || ""}
                    onChange={(e) =>
                      setAddress({ ...address, zip: e.target.value })
                    }
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        localStorage.setItem(
                          "address",
                          JSON.stringify(address)
                        );
                        setShowModal(false);
                        alert("Address updated!");
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
              {data.data.orders.length === 0 ? (
                <p className="text-gray-400">No orders yet.</p>
              ) : (
                <div className="relative overflow-x-auto max-h-[600px] rounded-lg border border-gray-600">
                  <table className="w-full text-sm text-center text-white">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="p-2 border border-gray-600">Transaction</th>
                        <th className="p-2 border border-gray-600">Order Details</th>
                        <th className="p-2 border border-gray-600">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {data.data.orders.map((order) => (
                        <tr key={order.transactionId}>
                          <td className="p-2 border border-gray-600 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-mono">
                                {order.transactionId.slice(0, 6)}...
                              </span>
                              <button
                                className="bg-gray-700 hover:bg-gray-600 px-2 py-1 text-xs rounded"
                                onClick={() => {
                                  navigator.clipboard.writeText(order.transactionId);
                                  alert("Transaction ID copied!");
                                }}
                              >
                                Copy
                              </button>
                            </div>
                          </td>
                          <td className="p-2 border border-gray-600">
                            <table className="w-full text-xs">
                              <thead className="bg-gray-800">
                                <tr>
                                  <th className="p-1 border border-gray-600">Product</th>
                                  <th className="p-1 border border-gray-600">Qty</th>
                                  <th className="p-1 border border-gray-600">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(order.orderDetails.cart).map(
                                  ([name, item]) => (
                                    <tr key={name}>
                                      <td className="p-1 border border-gray-700 flex items-center gap-2">
                                        <img
                                          src={item.imageUrl}
                                          alt={name}
                                          className="w-6 h-6 rounded object-cover"
                                        />
                                        {name}
                                      </td>
                                      <td className="p-1 border border-gray-700 text-center">
                                        {item.quantity}
                                      </td>
                                      <td className="p-1 border border-gray-700 text-center">
                                        ₹{item.price}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </td>
                          <td className="p-2 border border-gray-600 text-center">
                            ₹{order.subtotal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
