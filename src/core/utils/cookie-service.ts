"use server";

import type { User } from "@/repositories/auth/types";

import { cookies } from "next/headers";

const AUTH_USER_COOKIE = "auth_user";

function authCookieOptions() {
  return {
    httpOnly: true,

    secure: true,

    sameSite: "strict" as const,
  };
}

export async function setAccessToken(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("access_token", token, authCookieOptions());
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();

  return cookieStore.get("access_token")?.value || null;
}

export async function clearAccessToken(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
}

export async function setAuthUser(user: User): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_USER_COOKIE, JSON.stringify(user), authCookieOptions());
}

export async function getAuthUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const raw = cookieStore.get(AUTH_USER_COOKIE)?.value;

  if (raw == null || raw === "") {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as User;

    if (
      typeof parsed.id !== "number" ||
      typeof parsed.email !== "string" ||
      typeof parsed.name !== "string" ||
      typeof parsed.status !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function clearAuthSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");

  cookieStore.delete(AUTH_USER_COOKIE);
}
