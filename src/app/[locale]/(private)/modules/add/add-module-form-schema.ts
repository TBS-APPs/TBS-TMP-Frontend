import * as z from "zod";

/** Keys under the `addModuleForm` message namespace. */

/**
 * Pass `t` from `useTranslations("addModuleForm")` or `getTranslations("addModuleForm")`.
 */
export function createAddModuleFormSchema(
  t: (key: string) => string,
) {
  return z.object({
    name: z.string().min(3, t("nameMinLength")),
  });
}

export type AddModuleFormValues = z.infer<
  ReturnType<typeof createAddModuleFormSchema>
>;
