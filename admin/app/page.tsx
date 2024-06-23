import Image from "next/image";
import { Button } from "@/components/ui/button";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export default function Home() {
  return (
    <main>
      <div>Main Page</div>
    </main>
  );
}
