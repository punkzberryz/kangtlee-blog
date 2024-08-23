import { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";

const ContactPage = () => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col space-y-8">
      <div className="space-y-4">
        <h1>ติดต่อ KangTLee</h1>
        <p>สนใจบริการเขียนเว็บแอป หรือต้องการพูดคุย ติดต่อเราได้ที่นี่...</p>
      </div>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อเรา",
};
