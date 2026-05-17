import * as z from "zod";

export function createLoginFormSchema(t: (key: string) => string) {
  return z.object({
    email: z.email({ error: () => ({ message: t("invalidEmail") }) }),
    password: z.string().min(1, {
      error: () => ({ message: t("passwordRequired") }),
    }),
  });
}

export type LoginFormValues = z.infer<
  ReturnType<typeof createLoginFormSchema>
>;
