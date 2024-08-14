import React from "react";
import { AuthLayoutWrapper } from "../_components/auth-layout-wrapper";
import { FetchUserOnAuth } from "../_components/fetch-user-on-auth";
import { SignUpForm } from "./_components/sign-up-form";

const SignUpPage = () => {
  return (
    <AuthLayoutWrapper
      title="สมัครสมาชิกใหม่"
      subtitle="สมัครสมาชิกเพื่อจัดการระบบ"
    >
      <FetchUserOnAuth>
        {/* Oauth */}
        <SignUpForm />
      </FetchUserOnAuth>
    </AuthLayoutWrapper>
  );
};

export default SignUpPage;
