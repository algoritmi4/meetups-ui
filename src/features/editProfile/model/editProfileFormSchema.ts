import { z } from "zod";

export const editProfileFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .max(30, { message: "Максимальная длина - 30 символов" })
    .nullable(),
  image_url: z.string().optional(),
  city: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .max(30, { message: "Максимальная длина - 30 символов" }),
  gender: z.string().optional(),
  is_private: z.boolean({
    required_error: "Обязательное поле",
    invalid_type_error: "Обязательное поле",
  }),
  bio: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .max(410, { message: "Максимальная длина - 410 символов" }),
  category_favorite: z
    .object({ id: z.number(), name: z.string(), image_url: z.string() })
    .array(),
  date_of_birth: z.string(),
});

export type EditProfileValidationSchema = z.infer<typeof editProfileFormSchema>;
