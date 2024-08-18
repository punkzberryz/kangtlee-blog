import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Metadata } from "next";

const ContactPage = () => {
  return (
    <MaxWidthWrapper>
      <h1>ติดต่อ KangTLee</h1>
      <p>สนใจบริการเขียนเว็บแอป หรือต้องการพูดคุย ติดต่อเราได้ที่นี่...</p>
    </MaxWidthWrapper>
  );
};

export default ContactPage;
export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อเรา",
};
