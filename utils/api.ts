import { User } from "@/types/user";

interface Fetcher {
    url: string;
    method: string;
    body: User;
    json: boolean;
}

const fetcher = async ({ url, method, body, json = true }: Fetcher) => {
    const res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("API Error");
    }
  
    if (json) {
      const data = await res.json();
      return data;
    }
  };
  
  export const register = async (user: User) => {
    return fetcher({
      url: "/api/register",
      method: "POST",
      body: user,
      json: false,
    });
  };
  
  export const signin = async (user: User) => {
    return fetcher({
      url: "/api/signin",
      method: "POST",
      body: user,
      json: false,
    });
  };