import React, { useState, useEffect } from "react";
import useSWR from "swr";
import profile from "../../images/profile.png";
import { Spinner } from "@/Components/ui/spinner";

const getUser = async (id) => {
  const response = await fetch(`/api/users/getOrders?userId=${id}`);
  const data = await response.json();
  return data;
};

export default function UserAccount() {
  const [activeTab, setActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curruser, setcurrUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("savedUser") || "{}");
    setcurrUser(user);
  }, []);

  const { data, error, isLoading } = useSWR("TEST", () => getUser(curruser.id));
  if (error) return <div className="text-white">Failed to load user data.</div>;
  if (isLoading) return <Spinner />;

  return (
    <div className="bg-gray-900 text-white flex justify-center items-center min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-2xl w-[700px] shadow-lg flex">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-600 pr-4">
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeTab === "details" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Personal Details
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg mt-2 ${
              activeTab === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>

        {/* Right Content */}
        <div className="w-2/3 pl-4">
          {activeTab === "details" && (
            <div>
              <div className="flex items-center space-x-4">
                <img
                  src={profile || curruser.photo}
                  alt="User"
                  className="w-16 h-16 rounded-full border-2 border-gray-500"
                />
                <div>
                  <h2 className="text-xl font-semibold">{curruser.name}</h2>
                  <p className="text-gray-400 text-sm">{curruser.email}</p>
                  <p className="text-gray-400 text-sm">{curruser.phone}</p>
                </div>
              </div>
              <p className="mt-4">
                <strong>Address:</strong> {curruser.address}
              </p>
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Update Profile
              </button>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
              {data.orders.length === 0 ? (
                <p className="text-gray-400">No orders yet.</p>
              ) : (
                <table className="w-full border-collapse border border-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border border-gray-600 p-2">Transaction ID</th>
                      <th className="border border-gray-600 p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orders.map((order) => (
                      <tr key={order.transactions_id} className="text-center bg-gray-800">
                        <td className="border border-gray-600 p-2">{order.transactions_id}</td>
                        <td className="border border-gray-600 p-2">${order.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
