interface userResponse {
  id: number;
  name: string;
  role: string;
  username: string;
  password: string;
  createdAt: string;
}

export async function getAllUsers(): Promise<userResponse[] | []> {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      cache: "no-store",
    });

    if (!response) {
      throw new Error("Users could not be found");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUserById(id: number): Promise<userResponse | null> {
  try {
    const response = await fetch("http://localhost:8080/api/users/" + id, {
      cache: "no-store",
    });

    if (!response) {
      throw new Error("User could not be found");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
