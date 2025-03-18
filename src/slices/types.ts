export interface userDataFormat {
  userPhone?: string;
  userName: string;
}

export interface cartData {
  userId?: string;
  cart: Record<string, number>;
}

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
};

export type perfumeData = {
  name: string;
  price: number;
  imageUrl: string;
  discription: string;
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
  handler: (response: RazorpaySuccessResponse) => void
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  theme?: {
    color: string;
  };
}

export interface RazorpayInstance {
  open(): void;
  on(event: 'payment.failed', callback: (response: { error: string }) => void): void;
}

export interface paymentResponsePayload {
  success: boolean;
}

export interface paymentApiResponse {
  payload?: paymentResponsePayload; // Mark `payload` as optional
}

export type data = {
  price: number;
  quantity: number;
};
export type NumberRecord = Record<string, data>;
export type TablesProps = {
  cart: NumberRecord;
  total: number;
};