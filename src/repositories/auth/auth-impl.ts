import { Result, ResultType } from "@/core/types/results";
import { AuthRepo, AuthResponse } from ".";
import { authEndpoints } from "@/core/constants/endpoints";
import { callPost } from "@/core/services/api-services";
import type { LoginFormValues } from "@/app/[locale]/(public)/(auth)/login-schema";
import type { RegisterFormValues } from "@/app/[locale]/(public)/(auth)/register-schema";

export class AuthImpl implements AuthRepo {
  login(values: LoginFormValues): Promise<Result<ResultType<AuthResponse>>> {
    const endpoint = authEndpoints.login;
    return callPost<ResultType<AuthResponse>>(
      endpoint,
      JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    );
  }
  register(
    values: RegisterFormValues,
  ): Promise<Result<ResultType<AuthResponse>>> {
    const endpoint = authEndpoints.register;
    return callPost<ResultType<AuthResponse>>(
      endpoint,
      JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    );
  }
}
