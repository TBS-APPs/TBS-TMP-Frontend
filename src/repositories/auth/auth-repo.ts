import { Result, ResultType } from "@/core/types/results";
import type { LoginFormValues } from "@/app/[locale]/(public)/(auth)/login-schema";
import type { RegisterFormValues } from "@/app/[locale]/(public)/(auth)/register-schema";
import { AuthResponse } from ".";

export interface AuthRepo {
  login(values: LoginFormValues): Promise<Result<ResultType<AuthResponse>>>;
  register(
    values: RegisterFormValues,
  ): Promise<Result<ResultType<AuthResponse>>>;
}
