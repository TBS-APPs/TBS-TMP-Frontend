"use server";

import { cookies } from "next/headers";

export async function setAccessToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value || null;
}

export async function clearAccessToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
