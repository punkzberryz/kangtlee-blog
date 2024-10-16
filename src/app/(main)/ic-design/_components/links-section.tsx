import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const LinksSection = () => {
  return (
    <section id="links" className="space-y-4">
      {LINKS.map((card, index) => (
        <CardItem key={index} links={card.links} title={card.title} />
      ))}
    </section>
  );
};

const LINKS: CardItemProps[] = [
  {
    title: "พื้นฐานสำคัญ: ",
    links: [
      {
        description: "ออกแบบ Transistor ในวงจรอนาลอค IC",
        href: "/blog/mos-characterization",
      },
      {
        description: "วิธีออกแบบ Design specification สำหรับ Opamp",
        href: "/blog/how-to-design-specification-for-opamp",
      },
    ],
  },
  {
    title: "ออกแบบวงจรอนาลอก (Analog IC design): ",
    links: [
      {
        description: "ออกแบบวงจรตัวป้อนกระแส Cascode Current Mirror",
        href: "/blog/cascode-current-mirror",
      },
      {
        description:
          "ออกแบบวงจรออปแอมป์ (Opamp) แบบ Two-stage single-ended CMOS Opamp",
        href: "/blog/design-single-ended-two-stage-cmos-opamp",
      },
      {
        description:
          "ออกแบบวงจรออปแอมป์ (Opamp) แบบ Single-stage ด้วย Symmetrical OTA",
        href: "/blog/symmetrical-ota",
      },
    ],
  },
];

type CardItemProps = { title: string; links: LinkItemProps[] };

const CardItem = ({ title, links }: CardItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h2>{title}</h2>
        <div className="flex flex-col space-y-2">
          {links.map((link) => (
            <LinkItem key={link.href} {...link} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

type LinkItemProps = { description: string; href: string };

const LinkItem = ({ description, href }: LinkItemProps) => {
  return (
    <Button asChild variant="link" className="w-fit text-lg">
      <Link href={href} target="_blank">
        {description}
      </Link>
    </Button>
  );
};
