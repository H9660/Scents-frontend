import { EmailTemplate } from "@/Components/ui/email-template";
import { Resend } from "resend";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
dotenv.config();
const resend = new Resend("re_XJrUCEBs_9EYuCG1tuxECNP5Xc1Xw68U2");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Raw request:", req.method, req.headers, req.body);
  const { name, email, transactionId, cartdata } = req.body;
  console.log("cart is here", cartdata);

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: `Hi ${name}`,
      react: await EmailTemplate({ email, transactionId, cartdata, name }),
    });

    if (error)
      res.status(500).json({
        success: false,
        error: error,
      });
    else res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
