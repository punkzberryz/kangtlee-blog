import { Metadata } from "next";

const UnauthorizedPage = () => {
  return (
    <div className="my-auto h-full">
      <p>You are not authorized to access this page ...</p>
    </div>
  );
};

export default UnauthorizedPage;
export const metadata: Metadata = {
  title: "Unauthorized",
  description: "You are not authorized to access this page",
};
