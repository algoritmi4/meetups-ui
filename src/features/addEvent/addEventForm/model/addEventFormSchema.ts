import { z } from "zod";

export const addEventSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  category: z
    .number()
    .min(1, { message: 'Обязательное поле' }),
  image_url: z
    .string()
    .min(1, { message: 'Обязательное поле' }),
  description: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  start_date: z
    .string()
    .nullable(),
  end_date: z
    .string()
    .nullable(),
  start_time: z
    .string()
    .nullable(),
  end_time: z
    .string()
    .nullable(),
  repeatable: z
    .boolean({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
  schedule: z.object({
    day_of_week: z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']),
    time: z.string({ invalid_type_error: 'Обязательное поле' })
  }).array().nullable(),
  address: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  city: z
    .string()
    .min(1, { message: 'Сломался поиск адреса' }),
  country: z
    .string()
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
    .number()
    .int({ message: 'Укажите целое чисто'})
    .nonnegative({ message: 'Кол-во участников должно быть >= 0' })
    .max(10000000, { message: 'Кол-во участников должно быть < 10000000' })
    .nullable(),
  any_participant_number: z
    .boolean({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
  participants_age: z
    .number()
    .int({ message: 'Укажите целое чисто'})
    .nonnegative({ message: 'Возраст должен быть >= 0' })
    .max(99, { message: 'Максимальный возраст - 100' }),
  type: z
    .enum(['open', 'private']),
  private_url: z
    .string()
    .nullable(),
  cost: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .nullable(),
  currency: z
    .number()
    .nullable(),
  free: z
    .boolean({ required_error: 'Обязательное поле', invalid_type_error: 'Обязательное поле' }),
  gallery: z
    .string({ invalid_type_error: 'Обязательное поле' })
    .url({ message: 'В галерее могут быть только url' })
    .array(),
  tags: z
    .number()
    .array(),
}).refine((data) => !data.start_date || new Date(`${data.start_date} 24:00`) > new Date(), {
  message: 'Ивент должен начинаться в будущем',
  path: ['start_date']
}).refine((data) => !data.end_date || new Date(data.end_date ?? '') > new Date(data.start_date ?? ''), {
  message: 'Ивент должен заканчиваться после начала',
  path: ['end_date']
}).refine((data) => data.repeatable || (data.start_date && data.start_time), {
  message: 'Заполните дату и время проведения ивента',
  path: ['start_date']
}).refine((data) => !data.repeatable || (data.schedule && data.schedule?.length > 0), {
  message: 'Заполните расписание',
  path: ['schedule']
})

export type AddEventValidationSchema = z.infer<typeof addEventSchema>;
