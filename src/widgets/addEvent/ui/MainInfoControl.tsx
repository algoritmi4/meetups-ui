import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { MainImageControl } from "@/features/addEvent/mainImageControl";
import { Input, LargeTextInput, SelectInput } from "@/shared";
import { ISelectInputOptions } from "@/shared/model/types";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IMainInfoProps {
  categories: ISelectInputOptions[];
}

export function MainInfoControl({ categories }: IMainInfoProps): ReactElement {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<AddEventValidationSchema>();

  return (
    <>
      <div className="flex items-end mt-[40px]">
        <div className="flex flex-col mr-[45px]">
          <Input
            HTMLType='text'
            hookFormValues={register('name')}
            error={errors.name?.message}
            labelText='Название'
            placeholder='Введите название'
            id='name'
            maxLength={250}
            extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass={'px-[22px]'}
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                value={categories.find((el) => el.id === value)}
                onChange={(option: ISelectInputOptions) => {
                  onChange(option.id);
                }}
                error={errors.category?.message}
                labelText='Категория'
                options={categories}
                placeholder='Выберите категорию'
                extraBoxClass="mt-[18px]"
              />
            )}
          />

        </div>
        <Controller
          control={control}
          name="image_url"
          render={({ field: { onChange, value }}) => (
            <MainImageControl
              error={errors.image_url?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>

      <LargeTextInput
        hookFormValues={register('description')}
        error={errors.description?.message}
        labelText='Описание'
        placeholder='Расскажите подробнее'
        extraBoxClass={'mt-[18px]'}
        maxLength={250}
      />
    </>
  )
}
