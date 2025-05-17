import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Spinner } from "@/Components/ui/spinner";
import { defaultUser } from "@/types";
import { logout } from "@/slices/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import axios from "axios";
const getUser = async (id) => {
  if (!id) return;
  const response = await axios.get(`/api/users/getOrders?${id}`, {
    withCredentials: true,
  });
  return response
};

export default function UserAccount() {
  const [activeTab, setActiveTab] = useState("details");
  const [curruser, setcurrUser] = useState(defaultUser);
  const [address, setAddress] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userStr = localStorage.getItem("savedUser");
    const addressStr = localStorage.getItem("address");

    if (userStr) setcurrUser(JSON.parse(userStr));
    if (addressStr) setAddress(JSON.parse(addressStr));
    setIsLoadingUser(false);
  }, []);

  const { data, error, isLoading } = useSWR(curruser?.id ? "myorders" : {}, () =>
    getUser(curruser.id)
  );
  console.log(data)
  if (error) return <div className="text-white">Failed to load user data.</div>;
  if (isLoadingUser || isLoading) return <Spinner />;

  return (
    <div className="text-white flex justify-center items-center min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-3xl w-full max-w-4xl max-h-5xl h-[900px] shadow-lg flex flex-col sm:flex-row">
        <div className="sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-600 pr-4 mb-4 sm:mb-0 sm:flex sm:flex-col">
          <button
            className={`w-full text-center py-2 px-4 rounded-lg ${
              activeTab === "details" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Personal Details
          </button>
          <button
            className={`w-full text-center py-2 px-4 rounded-lg mt-2 mb-2 ${
              activeTab === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>
          <button
            className="w-full text-center py-2 px-4 mt-4 rounded-lg bg-red-600 hover:bg-red-700"
            onClick={() => {
              dispatch(logout());
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        <div className="sm:w-2/3 pl-0 sm:pl-4">
          {activeTab === "details" && (
            <div className="mt-6 space-y-4 text-gray-300">
              <div>
                <strong>Username:</strong>{" "}
                <span className="ml-2">{curruser.name}</span>
              </div>

              <div>
                <strong>Phone:</strong>{" "}
                <span className="ml-2">{curruser.phone}</span>
              </div>

              <div>
                <strong>Address:</strong>{" "}
                <span className="ml-2">{address.address}</span>
              </div>

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
                onClick={() =>
                  alert("Redirect to password reset page or open modal")
                }
              >
                Change Password
              </button>
              <button
                className="ml-2 mt-2 bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-lg"
                onClick={() => setShowModal(true)}
              >
                Edit details
              </button>
            </div>
          )}

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

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
              {data.data.orders.length === 0 ? (
                <p className="text-gray-400">No orders yet.</p>
              ) : (
                <div className="max-h-64 overflow-y-auto rounded-lg">
                  <table className="w-full border-collapse border border-gray-700 rounded-lg">
                    <thead>
                      <tr className="bg-gray-700 text-white">
                        <th className="border border-gray-600 p-2">
                          Transaction ID
                        </th>
                        <th className="border border-gray-600 p-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.orders.map((order) => (
                        <tr
                          key={order.transactions_id}
                          className="text-center bg-gray-800"
                        >
                          <td className="border border-gray-600 p-2">
                            {order.transactions_id}
                          </td>
                          <td className="border border-gray-600 p-2">
                            ${order.subtotal}
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
