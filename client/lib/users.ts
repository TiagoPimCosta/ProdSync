interface userResponse {
  id: number;
  idNumber: number;
  name: string;
  role: string;
  username: string;
  password: string;
  cc: string;
  nif: string;
  phone: string;
  email: string;
  isActive: boolean;
  admission: Date;
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

export async function deleteUser(id: number): Promise<null> {
  try {
    const response = await fetch("http://localhost:8080/api/users/" + id, {
      method: "DELETE",
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
