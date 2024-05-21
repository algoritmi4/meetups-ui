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
    .max(30, { message: "Максимальная длина - 30 символов" })
    .nullable(),
  gender: z.string().optional(),
  is_private: z
  .boolean({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
  bio: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .max(410, { message: "Максимальная длина - 410 символов" })
    .nullable(),
  // category_favorite: z
  // .string().array()
  // .nullable(),
  date_of_birth: z.string().nullable()
});

export type EditProfileValidationSchema = z.infer<typeof editProfileFormSchema>;
