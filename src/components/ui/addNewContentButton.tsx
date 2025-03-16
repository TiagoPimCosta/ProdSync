import { cn } from "@/src/lib/utils";
import { Button, ButtonProps } from "./button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface AddNewContentButtonProps extends ButtonProps {
  label: string;
  href: string;
}

export default function AddNewContentButton(props: AddNewContentButtonProps) {
  const { href, label, className } = props;
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "shadow-none border-2 border-dashed border-primary text-md text-primary font-semibold",
        className
      )}
    >
      <Link className="gap-3" href={href}>
        <PlusCircle className="w-5 h-5" />
        {label}
      </Link>
    </Button>
  );
}
