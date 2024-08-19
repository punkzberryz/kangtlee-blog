"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { contachSchema, ContactSchema } from "./contact-schema";
import { BadRequestError } from "@/lib/error";
import { createTransport } from "nodemailer";
export const sendContactEmailAction = async ({
  data,
}: {
  data: ContactSchema;
}) => {
  try {
    //validate data
    const parse = contachSchema.safeParse(data);
    if (!parse.success) throw new BadRequestError();
    if (data.phone !== "") return {};
    const transporter = createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });
    const mail = await transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: process.env.MAILER_EMAIL,
      subject: `[KangTLEE Blog] Contact Me Sender - ${data.name} - ${data.email}`,
      html: `
      <p>Name: ${data.name} </p>
      <p>Email: ${data.email} </p>
      <p>Message: ${data.message} </p>
      <p>Bot?: ${data.phone} </p>            
      `,
    });

    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    console.log({ error });
    return { error };
  }
};
