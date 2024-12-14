import { fetchWithAuth } from "./fetch";

export async function addRecord(machineId: number): Promise<void> {
  try {
    const user = await fetchWithAuth("http://localhost:8080/api/auth/status");

    if (!user) {
      throw new Error("User could not be found");
    }

    const res = await fetch("http://localhost:8080/api/records", {
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
