import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";

const ContactPage = () => {
  return (
    <MaxWidthWrapper className="flex flex-col space-y-8">
      <div className="space-y-4">
        <h1>ติดต่อ KangTLee</h1>
        <p>สนใจบริการเขียนเว็บแอป หรือต้องการพูดคุย ติดต่อเราได้ที่นี่...</p>
      </div>
      <ContactForm />
    </MaxWidthWrapper>
  );
};

export default ContactPage;
export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อเรา",
};
