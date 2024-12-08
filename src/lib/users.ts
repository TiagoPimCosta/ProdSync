export interface userResponse {
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
  isActive?: boolean;
  admission: Date;
}

export async function createUser(
  user: userResponse
): Promise<userResponse | null> {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("User could not be created");
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
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

export async function updateUserById(
  id: number,
  user: userResponse
): Promise<number> {
  try {
    const response = await fetch("http://localhost:8080/api/users/" + id, {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.status;
  } catch (error) {
    console.log(error);
    return 400;
  }
}

export async function deleteUser(id: number): Promise<number> {
  try {
    const response = await fetch("http://localhost:8080/api/users/" + id, {
      method: "DELETE",
    });

    if (!response) {
      throw new Error("User could not be found");
    }
    return response.status;
  } catch (error) {
    console.log(error);
    return 400;
  }
}
