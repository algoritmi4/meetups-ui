import { AddEventForm } from "@/features/addEvent";
import { AddEventPageTitle } from "@/widgets/AddEventPageTitle";
import { ReactElement } from "react";
import { Input, SelectInput, LargeTextInput, CheckboxWithLabel } from "@/shared";
import { MapWidget } from "@/widgets/mapWidget";
import { PeriodicControl } from "@/features/periodicControl";
import { AccessControl } from "@/features/accessControl";
import { TagsControl } from "@/entities/tags";
import { Controller, useForm } from "react-hook-form";
import { AddEventValidationSchema, addEventSchema } from "@/features/addEvent/model/addEventFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategoriesQuery } from "@/features/searchFilter/api/categoriesApi";
import { PriceControl } from "@/features/priceControl";
import { PlacesNumberControl } from "@/features/placesNumberControl";
import { Gallery } from "@/features/gallery";
import { useFormActions } from "@/features/addEvent/model/useFormActions";
import { MainImageControl } from "@/features/mainImageControl";
import { ISelectInputOptions } from "@/shared/model/types";
import { useGetTagsQuery } from "@/entities/tags/api/tagsApi";
import { useGetCurrenciesQuery } from "@/features/priceControl/api/currencyApi";

function AddEventPage(): ReactElement {
  const { data: categories = {results: []}, isError: isCategoriesError, error: categoriesError, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: tags = {results: []}, isError: isTagsError, error: tagsError, isLoading: isTagsLoading } = useGetTagsQuery();
  const { data: currencies = {results: []}, isError: isCurrenciesError, error: currenciesError, isLoading: isCurrenciesLoading } = useGetCurrenciesQuery();

  isCurrenciesError && console.log(`Ошибка при получении валют - ${JSON.stringify(currenciesError)}`);
  isTagsError && console.log(`Ошибка при получении тегов - ${JSON.stringify(tagsError)}`);
  isCategoriesError && console.log(`Ошибка при получении тегов - ${JSON.stringify(categoriesError)}`);

  const isFormLoading = isCategoriesLoading || isTagsLoading || isCurrenciesLoading || isCurrenciesError || isTagsError || isCategoriesError;

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    watch
  } = useForm<AddEventValidationSchema>({
    resolver: zodResolver(addEventSchema),
    mode: 'onBlur',
    defaultValues: {
      any_participant_number: false,
      schedule: [],
      private_url: null,
      repeatable: false,
      free: false,
      tags: [],
      gallery: []
    }
  });

  const { onSelectAddress } = useFormActions({ setValue, clearErrors });

  return (
    <main className="w-full max-w-[1005px] mx-auto pb-[98px]">
      <AddEventPageTitle />
      <AddEventForm handleSubmit={handleSubmit} isLoading={isFormLoading}>
        <div className="flex items-end mt-[40px]">
          <div className="flex flex-col mr-[45px]">
            <Input
              HTMLType='text'
              hookFormValues={register('name')}
              error={errors.name?.message}
              labelText='Название'
              placeholder='Введите название'
              id='name'
              extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
              extraContentClass={'h-[44px]'}
              extraInputClass={'px-[22px]'}
            />

            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  value={categories.results.find((el) => el.id === value)}
                  onChange={(option: ISelectInputOptions) => {
                    onChange(option.id);
                  }}
                  error={errors.category?.message}
                  labelText='Категория'
                  options={categories.results}
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
        />

        <div className='flex items-center relative mt-[18px]'>
          <Input
            hookFormValues={register('start_date')}
            error={errors.start_date?.message}
            HTMLType='date'
            labelText='Дата'
            placeholder='Начало'
            id='add-event-start-date'
            extraBoxClass={`w-[480px] mt-[7px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
            extraContentClass={'h-[44px]'}
            extraInputClass='px-[22px]'
            isDisabled={watch('repeatable')}
          />
          <div
            className='w-4 h-0.5 mx-3.5 mt-8 border-1 border-text-light-gray border-solid'
          />
          <div className='self-end relative'>
            <Input
              hookFormValues={register('end_date')}
              error={errors.end_date?.message}
              HTMLType='date'
              placeholder='Конец'
              id='add-event-end-date'
              extraBoxClass={`w-[480px] mt-[7px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
              extraContentClass={'h-[44px]'}
              extraInputClass='px-[22px]'
              isDisabled={watch('repeatable')}
            />
            <p className='text-text-light-gray mt-2 absolute bottom-[-26px] left-0'>Необязательное поле</p>
          </div>
        </div>

        <div className='flex items-center relative mt-[20px]'>
          <Input
            hookFormValues={register('start_time')}
            error={errors.start_time?.message}
            HTMLType='time'
            labelText='Время'
            placeholder='Начало'
            id='add-event-start-time'
            extraBoxClass={`w-[480px] mt-[7px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
            extraContentClass={'h-[44px]'}
            extraInputClass='px-[22px]'
            isDisabled={watch('repeatable')}
          />
          <div
            className='w-4 h-0.5 mx-3.5 mt-8 border-1 border-text-light-gray border-solid'
          />
          <div className='self-end relative'>
            <Input
              hookFormValues={register('end_time')}
              error={errors.end_time?.message}
              HTMLType='time'
              placeholder='Конец'
              id='add-event-end-time'
              extraBoxClass={`w-[480px] mt-[7px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
              extraContentClass={'h-[44px]'}
              extraInputClass='px-[22px]'
              isDisabled={watch('repeatable')}
            />
            <p className='text-text-light-gray mt-2 absolute bottom-[-26px] left-0'>Необязательное поле</p>
          </div>
        </div>

        <div className="mt-[30px] mb-[18px] text-text-black">
          <Controller
            control={control}
            name="schedule"
            render={({ field: { onChange, value } }) => (
              <PeriodicControl
                isPeriodic={watch('repeatable')}
                control={control}
                onChange={onChange}
                schedule={value ?? []}
                error={errors.schedule?.message}
              />
            )}
          />
        </div>

        <MapWidget
          setValuesFunc={onSelectAddress}
          setValue={setValue}
          error={errors.address?.message}
          text="Точка на карте"
          position={{ lat: 53.9, lng: 27.56667 }}
          zoom={14}
          withAddressControl={true}
        />

        <div className="flex items-center mt-[18px]">
          <PlacesNumberControl
            isPlacesDisabled={watch('any_participant_number')}
            hookFormValues={register('desired_participants_number', { valueAsNumber: true })}
            error={errors.desired_participants_number?.message}
            control={control}
            setValue={setValue}
            clearErrors={clearErrors}
          />
          <CheckboxWithLabel
            id="chat"
            label="Добавить чат участников"
            extraBoxClass="ml-auto"
            extraLabelClass="ml-2.5"
          />
        </div>

        <div className={`flex items-center mt-[18px]`}>
          <Input
            hookFormValues={register('participants_age', { valueAsNumber: true })}
            error={errors.participants_age?.message}
            HTMLType='number'
            labelText='Возраст участников'
            placeholder='18'
            id='add-event-people-age'
            inlineLabel={true}
            extraBoxClass={'w-[62px] md:w-[62px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass="px-[10px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <p className={`text-xl text-text-black font-medium ml-1.5`}>+</p>
        </div>

        <Controller
          control={control}
          name="private_url"
          render={({ field: { onChange, value } }) => (
            <AccessControl
              error={errors.type?.message}
              control={control}
              onChangeLink={onChange}
              link={value}
              type={watch('type')}
            />
          )}
        />

        <PriceControl
          hookFormValues={register('cost')}
          error={errors.cost?.message}
          control={control}
          isPriceActive={!watch('free')}
          setValue={setValue}
          clearErrors={clearErrors}
          currencies={currencies.results}
        />

        <Controller
          name="gallery"
          control={control}
          render={({ field: { onChange, value }}) => (
            <Gallery
              onChange={(image_url: string) => {
                onChange([...value, image_url]);
              }}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => (
            <TagsControl
              tags={tags.results}
              onChange={(tagId: number, toRemove: boolean) => 
                toRemove ? onChange(value.filter((el) => el !== tagId)) : onChange([...value, tagId])
              }
              value={value}
            />
          )}
        />
      </AddEventForm>
    </main>
  );
}

export default AddEventPage;
