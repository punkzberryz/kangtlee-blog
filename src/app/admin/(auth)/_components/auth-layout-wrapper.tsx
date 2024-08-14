import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AuthLayoutWrapper = ({
  children,
  subtitle,
  title,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="my-auto space-y-4">
      <h1 className="text-center">
        <span className="pr-1 text-xl">kangtlee&apos;s</span>
        <span className="text-2xl font-bold uppercase text-primary">blog</span>
      </h1>
      <Card className="w-[80%] px-5 shadow-lg sm:px-10 md:w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 pt-10">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
