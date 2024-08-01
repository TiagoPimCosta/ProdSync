"use client";

import { useState } from "react";
import { Button } from "./button";
import { login } from "../../lib/auth";
import { getAuthToken, setAuthToken } from "../../lib/cookies";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await login(username, password);

    if (response) {
      await setAuthToken(response.token);

      router.push("/"); // Reroute so that the middleware handles the routing
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-1">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                //minLength={6}
              />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Log in
        </Button>
      </div>
    </form>
  );
}
