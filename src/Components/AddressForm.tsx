import React from "react";

export default function AddressForm({
  formData,
  setFormData,
  errors,
  setErrors,
}) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
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
  );
}
