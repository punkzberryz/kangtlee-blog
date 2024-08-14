import Link from "next/link";
import { AuthLayoutWrapper } from "../../_components/auth-layout-wrapper";
import { buttonVariants } from "@/components/ui/button";

const SignUpErrorPage = () => {
  return (
    <AuthLayoutWrapper title="" subtitle="">
      <p className="text-destructive">
        เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง
      </p>
      <Link href="/admin/signup" className={buttonVariants()}>
        กลับสู่หน้าสมัครสมาชิก
      </Link>
    </AuthLayoutWrapper>
  );
};

export default SignUpErrorPage;
