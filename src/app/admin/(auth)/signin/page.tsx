import Link from "next/link";
import { AuthLayoutWrapper } from "../_components/auth-layout-wrapper";
import { FetchUserOnAuth } from "../_components/fetch-user-on-auth";
import { Button } from "@/components/ui/button";
import { GoogleIcon, LineIcon } from "@/lib/icons";

const SignInPage = () => {
  return (
    <AuthLayoutWrapper
      title="เข้าสู่ระบบ"
      subtitle="เข้าสู่ระบบเพื่อจัดการระบบ"
    >
      <FetchUserOnAuth>
        {/* Oauth */}
        <div className="flex w-full flex-col gap-4">
          <GoogleSignInButton />
          <LineSignInButton />
        </div>
      </FetchUserOnAuth>
    </AuthLayoutWrapper>
  );
};

export default SignInPage;

const GoogleSignInButton = () => {
  return (
    <Button asChild>
      <a href="/admin/signin/google">
        <GoogleIcon />
        <span className="w-40 pl-2">เข้าสู่ระบบด้วย Google</span>
      </a>
    </Button>
  );
};
const LineSignInButton = () => {
  return (
    <Button asChild>
      <a href="/admin/signin/line">
        <LineIcon />
        <span className="w-40 pl-2">เข้าสู่ระบบด้วย Line</span>
      </a>
    </Button>
  );
};
