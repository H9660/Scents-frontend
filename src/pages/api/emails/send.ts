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
  const { name, email, transactionId, cartdata, address } = req.body;
  console.log("From send")
  console.log(name)
  console.log(email)
  console.log(transactionId)
  console.log(cartdata)
  console.log(address)
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: `Hi ${name}`,
      react: await EmailTemplate({ email, transactionId, cartdata, name, address }),
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
