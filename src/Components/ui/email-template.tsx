import * as React from "react";
import { emailData, NumberRecord } from "@/types";
export const EmailTemplate: React.FC<Readonly<emailData>> = ({
  email,
  transactionId,
  cartdata,
  address,
}) => {
  return (
    <form>
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            padding: "20px",
            textAlign: "center",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <img
            src="https://scentphotos.s3.ap-south-1.amazonaws.com/logo.png"
            alt="Scentdazzle Logo"
            style={{
              display: "block",
              margin: "0 auto 15px",
              width: "120px",
              height: "auto",
            }}
          />

          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
            Scentdazzle Order Confirmation
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "14px" }}>
            Thank you for your purchase!
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          {/* Greeting */}
          <p style={{ fontSize: "16px", color: "#333333" }}>Hello,</p>
          <p
            style={{ fontSize: "16px", color: "#333333", marginBottom: "20px" }}
          >
            We’ve received your order (Transaction ID:{" "}
            <strong>{transactionId}</strong>) associated with{" "}
            <strong>{email}</strong>. Below are the details of your purchase:
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "#333333",
              marginBottom: "10px",
            }}
          >
            <strong>Shipping Address:</strong>
            <br />
               {address.street}, {address.city}, {address.state},  - {address.pincode}, {address.country}`
          </p>

          {/* Cart Items */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            {Object.entries(cartdata.cart as unknown as NumberRecord).map(
              ([ele, idx]) => (
                <li
                  key={ele}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 0",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <img
                    src={idx.imageUrl}
                    alt={ele}
                    width="100"
                    height="60"
                    className="email-images"
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        margin: "0 0 5px",
                      }}
                    >
                      {ele}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#555555",
                        margin: "0 0 5px",
                      }}
                    >
                      ₹ {idx.price}
                    </p>
                    <p
                      style={{ fontSize: "12px", color: "#888888", margin: 0 }}
                    >
                      Quantity: {idx.quantity}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>

          {/* Total */}
          <div
            style={{
              textAlign: "right",
              padding: "15px 0",
              borderTop: "1px solid #e0e0e0",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Total: ₹ {cartdata.price as any}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            padding: "15px",
            textAlign: "center",
            borderRadius: "0 0 8px 8px",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: "0 0 5px" }}>
            Questions? Contact us at{" "}
            <a
              href="mailto:support@scents.com"
              style={{ color: "#ffd700", textDecoration: "none" }}
            >
              support@scentdazzle.com
            </a>
          </p>
          <p style={{ margin: 0 }}>© 2025 Scents. All rights reserved.</p>
        </div>
      </div>
    </form>
  );
};
