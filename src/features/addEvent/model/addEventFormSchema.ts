import { z } from "zod";

export const addEventSchema = z.object({
  name: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  category: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
  image_url: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .url({ message: 'Некорректный URL' })
    .min(1, { message: 'Обязательное поле' }),
  description: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  start_date: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .refine((v) => new Date(v) > new Date(), { message: 'Ивент должен проводится в будущем' }),
  end_date: z
    .string({ invalid_type_error: 'Обязательное поле' })
    .nullable(),
  start_time: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' }),
  end_time: z
    .string({ invalid_type_error: 'Обязательное поле' })
    .nullable(),
  repeatable: z.boolean(),
  schedule: z.object({
    day_of_week: z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']),
    time: z.string({ invalid_type_error: 'Обязательное поле' })
  }).array(),
  address: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  city: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Сломался поиск адреса' }),
  country: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Сломался поиск адреса' }),
  location: z
    .object({
      latitude: z.string(),
      longitude: z.string()
    }),
  city_south_west_point: z
    .object({
      latitude: z.string(),
      longitude: z.string()
    }),
  city_north_east_point: z
    .object({
      latitude: z.string(),
      longitude: z.string()
    }),
  desired_participants_number: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .int({ message: 'Укажите целое чисто'})
    .nonnegative({ message: 'Кол-во мест должно быть >= 0' })
    .max(10000000, { message: 'Максимальное кол-во мест - 10000000' })
    .nullable(),
  any_participant_number: z
    .boolean({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
  participants_age: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .int({ message: 'Укажите целое чисто'})
    .nonnegative({ message: 'Возраст должен быть >= 0' })
    .max(99, { message: 'Максимальный возраст - 100' }),
  type: z
    .enum(['open', 'private'], { required_error: 'Обязательное поле' }),
  private_url: z
    .string()
    .nullable(),
  cost: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .nullable(),
  currency: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .nullable(),
  free: z
    .boolean(),
  gallery: z
    .string({ invalid_type_error: 'Обязательное поле' })
    .url({ message: 'В галерее могут быть только url' })
    .array(),
  tags: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .array(),
}).refine((data) => !data.end_date || new Date(data.end_date) >= new Date(data.start_date), {
  message: 'Дата окончания ивента должна быть больше даты его начала',
  path: ['end_date']
})

export type AddEventValidationSchema = z.infer<typeof addEventSchema>;
