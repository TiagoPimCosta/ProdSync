import { fetchWithAuth } from "./fetch";

const API_ENDPOINT_URL = process.env.NEXT_PUBLIC_API_ENDPOINT_URL;

export async function addRecord(machineId: number): Promise<void> {
  try {
    const user = await fetchWithAuth(API_ENDPOINT_URL + "/auth/status");

    if (!user) {
      throw new Error("User could not be found");
    }

    const res = await fetch(API_ENDPOINT_URL + "/records", {
      method: "POST",
      body: JSON.stringify({ userId: user.id, machineId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (res.status === 201) {
    } else {
      throw new Error("Erro ao submeter trabalho");
    }
  } catch (error) {
    console.log(error);
  }
}
