import * as z from "zod";

export function createRegisterFormSchema(t: (key: string) => string) {
  return z
    .object({
      name: z.string().min(3, {
        error: () => ({ message: t("registerNameMinLength") }),
      }),
      email: z.email({ error: () => ({ message: t("invalidEmail") }) }),
      password: z.string().min(8, {
        error: () => ({ message: t("passwordMinLength") }),
      }),
      confirmPassword: z.string().min(1, {
        error: () => ({ message: t("confirmPasswordRequired") }),
      }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("passwordsMustMatch"),
          path: ["confirmPassword"],
        });
      }
    });
}

export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>;
