import { z } from "zod";

export const editProfileFormSchema = z.object({
    username: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(30, { message: 'Максимальная длина - 30 символов' }),
    first_name: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(30, { message: 'Максимальная длина - 30 символов' }),
    last_name: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(30, { message: 'Максимальная длина - 30 символов' }),
    email: z
    .string({ invalid_type_error: 'Обязательное поле', required_error: 'Обязательное поле'})
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Неверный формат' }),
    image_url: z
    .string()
    .min(1, { message: 'Обязательное поле' }),
    is_email_verified: z
    .boolean({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
    city: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(30, { message: 'Максимальная длина - 30 символов' }),
    is_private: z
    .boolean({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
    bio: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(410, { message: 'Максимальная длина - 410 символов' }),
    age: z
    .number()
    .min(1, { message: 'Обязательное поле' })
    .max(99, { message: 'Максимальное значение - 99' }),
    category_favorite: z
    .string().array(),
    date_of_birth: z
    .string()
    .nullable(),
})

export type EditProfileValidationSchema = z.infer<typeof editProfileFormSchema>;
