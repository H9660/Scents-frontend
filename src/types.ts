import { LuType } from "react-icons/lu";

export interface userDataFormat {
  userPhone: string;
  userName?: string;
  userPassword?: string;
}

export interface RazorpayOrder {
  order: {
    amount: number; // e.g., 400000 (in paise)
    amount_due: number; // e.g., 400000
    amount_paid: number; // e.g., 0
    attempts: number; // e.g., 0
    created_at: number; // e.g., 1748075235 (Unix timestamp)
    currency: string; // e.g., "INR"
    entity: "order";
    id: string; // e.g., "order_QYhS2X5DHRLFr7"
    notes: Record<string, string>; // Empty or key-value notes
    offer_id: string | null;
    receipt: string | null;
    status: "created" | "paid" | "attempted";
  };
}

export interface cartData {
  userId?: string;
  cart: Record<string, number>;
}

export interface emailData {
  name: string;
  email: string;
  transactionId: TransactionIdFormat;
  cartdata: NumberRecord;
  address: AddressFormat;
}

export type AddressFormat = {
  city: string;
  street: string;
  state: string;
  pincode: string;
  country: string;
};
export interface perfumeUpdateDataFormat {
  name: string;
  price?: number;
  quantity?: string;
  imageUrl?: string;
  discription?: string;
}

export type User = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt?: string;
  token?: string;
};

export type perfumeData = {
  name: string;
  price: number;
  imageUrl: string;
  discription?: string;
};

export type paymentResponse = {
  success: string;
};

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name: string;
    contact: string;
  };
  theme?: {
    color: string;
  };
}

export interface RazorpayInstance {
  open(): void;
  on(
    event: "payment.failed",
    callback: (response: { error: string }) => void
  ): void;
}

export interface paymentResponsePayload {
  success: boolean;
}

export type paymentData = {
  userId: string;
  amount: number;
};

export type verifyData = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
export interface paymentApiResponse {
  payload?: paymentResponsePayload; // Mark `payload` as optional
}

export type cartItemFormat = {
  imageUrl: string;
  price: number;
  quantity: number;
};
export type NumberRecord = Record<string, cartItemFormat>;
export type cartDataProps = {
  cart: NumberRecord;
  total: number;
};

export type TransactionIdFormat = {
  transactionId: string;
};

export const defaultUser = {
  id: "",
  name: "",
  phone: "",
  createdAt: "",
  updatedAt: "",
  address: "",
  totalCartprice: 0,
};
