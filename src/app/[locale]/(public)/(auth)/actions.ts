"use server";

import { getTranslations } from "next-intl/server";
import type { AddActionResult } from "@/core/types/add-action-result";
import { isFailure } from "@/core/types/results";
import { setAccessToken, setAuthUser } from "@/core/utils/cookie-service";
import { authRepo } from "@/repositories/auth";
import type { User } from "@/repositories/auth/types";
import { createLoginFormSchema } from "./login-schema";
import { createRegisterFormSchema } from "./register-schema";

export async function loginAction(
  values: { email: string; password: string },
): Promise<AddActionResult<{ user: User }>> {
  const t = await getTranslations();
  const parsed = createLoginFormSchema(t).safeParse(values);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      success: false,
      message:
        typeof first?.message === "string"
          ? first.message
          : t("somethingWrongTryAgain"),
    };
  }

  const result = await authRepo.login(parsed.data);
  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  const payload = result.data?.data;
  if (
    payload == null ||
    typeof payload.access_token !== "string" ||
    payload.access_token === "" ||
    payload.user == null
  ) {
    return {
      success: false,
      message: t("somethingWrongTryAgain"),
    };
  }

  await setAccessToken(payload.access_token);
  await setAuthUser(payload.user);

  return {
    success: true,
    message: t("loginSucceeded"),
    data: { user: payload.user },
  };
}

export async function registerAction(values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<AddActionResult<{ user: User }>> {
  const t = await getTranslations();
  const parsed = createRegisterFormSchema(t).safeParse(values);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      success: false,
      message:
        typeof first?.message === "string"
          ? first.message
          : t("somethingWrongTryAgain"),
    };
  }

  const result = await authRepo.register(parsed.data);
  if (isFailure(result)) {
    return { success: false, message: result.failure.message };
  }

  const payload = result.data?.data;
  if (
    payload == null ||
    typeof payload.access_token !== "string" ||
    payload.access_token === "" ||
    payload.user == null
  ) {
    return {
      success: false,
      message: t("somethingWrongTryAgain"),
    };
  }

  await setAccessToken(payload.access_token);
  await setAuthUser(payload.user);

  return {
    success: true,
    message: t("registerSucceeded"),
    data: { user: payload.user },
  };
}
