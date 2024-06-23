import { toast } from "react-hot-toast";

interface Record {
  personId: number;
  machineId: number;
}

export async function addRecord(record: Record): Promise<void> {
  const res = await fetch("http://192.168.1.109:8080/api/records", {
    method: "POST",
    body: JSON.stringify(record),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (res.status === 201) {
    toast.success("Trabalho Submetido", {
      duration: 4000,
    });
  }
}
