import { LINKS } from "@/components/navbar/links";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

const ToolsPage = () => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col space-y-8">
      <div className="space-y-4">
        <h1>เครื่องมือ</h1>
        <p>
          เครื่องมือทั้งหมดที่เรามีเพื่อช่วยเพิ่มประสิทธิภาพในการทำงานของคุณ 🤯
        </p>
      </div>
      <ToolLink />
    </div>
  );
};

export default ToolsPage;

const ToolLink = () => {
  return (
    <ul className="space-y-4 pl-4">
      {LINKS.map((link) => {
        if (link.href !== "/tools") return;
        return link.sublinks?.map((sublink, index) => (
          <li key={index} className="flex items-center space-x-4">
            <Link
              href={sublink.href}
              className="w-[250px] font-semibold underline-offset-4 hover:text-primary hover:underline"
            >
              {sublink.label}
            </Link>
            <p>{sublink.description}</p>
          </li>
        ));
      })}
    </ul>
  );
};

export const metadata: Metadata = {
  title: "เครื่องมือ",
  description:
    "เครื่องมือทั้งหมดที่เรามีเพื่อช่วยเพิ่มประสิทธิภาพในการทำงานของคุณ",
};
