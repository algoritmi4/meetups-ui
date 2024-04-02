import { AddEventForm } from "@/features/addEvent";
import { AddEventPageTitle } from "@/widgets/AddEventPageTitle";
import {ReactElement, useEffect} from "react";
import {Input, SelectInput, LargeTextInput, CheckboxWithValue} from "@/shared";
import { MapWidget } from "@/widgets/mapWidget";
import { PeriodicControl } from "@/features/periodicControl";
import { AccessControl } from "@/features/accessControl";
import { TagsControl } from "@/entities/tags";
import { useForm } from "react-hook-form";
import { AddEventValidationSchema, addEventSchema } from "@/features/addEvent/model/addEventFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategoriesQuery } from "@/features/searchFilter/api/categoriesApi";
import { PriceControl } from "@/features/priceControl";
import { PlacesNumberControl } from "@/features/placesNumberControl";
import { Gallery } from "@/features/gallery";
import { useFormActions } from "@/features/addEvent/model/useFormActions";
import { MainImageControl } from "@/features/mainImageControl";

function AddEventPage(): ReactElement {
  const { data: categories = {results: []} } = useGetCategoriesQuery();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors
  } = useForm<AddEventValidationSchema>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      schedule: [],
      private_url: null,
      free: false,
      repeatable: false,
      currency: 1,
      tags: [],
      gallery: []
    }
  });

  const {
    onSelectCategory,
    onSelectAddress,
    onChangePlacesLimit,
    onSelectEventType,
    onSwitchPriceType,
    onChangeCurrencyType,
    onPeriodicChange,
    onChangeSchedule,
    onChangeScheduleDayTime,
    handleTags,
    onUploadImage
  } = useFormActions({ setValue, clearErrors, getValues });

  useEffect(() => {
    const values = getValues()
    console.log(errors);
    console.log(values);
  }, [errors, getValues]);

  return (
    <main className="w-full max-w-[1005px] mx-auto pb-[98px]">
      <AddEventPageTitle />
      <AddEventForm handleSubmit={handleSubmit}>
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

            <SelectInput
              setValueFunc={onSelectCategory}
              error={errors.category?.message}
              labelText='Категория'
              options={categories.results}
              placeholder='Выберите категорию'
              extraBoxClass="mt-[18px]"
            />

          </div>
          <MainImageControl
            error={errors.image_url?.message}
            onUploadImage={onUploadImage}
            setValue={setValue}
            clearErrors={clearErrors}
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
            extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass='px-[22px]'
          />
          <div
            className='w-4 h-0.5 mx-3.5 mt-8 border-1 border-text-light-gray border-solid'
          />
          <div className='self-end relative'>
            <Input
              hookFormValues={register('end_date', { required: false })}
              error={errors.end_date?.message}
              HTMLType='date'
              placeholder='Конец'
              id='add-event-end-date'
              extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
              extraContentClass={'h-[44px]'}
              extraInputClass='px-[22px]'
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
            extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass='px-[22px]'
          />
          <div
            className='w-4 h-0.5 mx-3.5 mt-8 border-1 border-text-light-gray border-solid'
          />
          <div className='self-end relative'>
            <Input
              hookFormValues={register('end_time', { required: false })}
              error={errors.end_time?.message}
              HTMLType='time'
              placeholder='Конец'
              id='add-event-end-time'
              extraBoxClass={'w-[480px] md:w-[480px] mt-[7px] px-[22px]'}
              extraContentClass={'h-[44px]'}
            />
            <p className='text-text-light-gray mt-2 absolute bottom-[-26px] left-0'>Необязательное поле</p>
          </div>
        </div>

        <div className="mt-[30px] mb-[18px] text-text-black">
          <PeriodicControl
            onPeriodicChange={onPeriodicChange}
            onChangeSchedule={onChangeSchedule}
            onChangeScheduleDayTime={onChangeScheduleDayTime}
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
            hookFormValues={register('desired_participants_number', { valueAsNumber: true })}
            setValuesFunc={onChangePlacesLimit}
            error={errors.desired_participants_number?.message}
          />
          <CheckboxWithValue
            id="chat"
            value="Добавить чат участников"
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
            extraInputClass="px-[19px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <p className={`text-xl text-text-black font-medium ml-1.5`}>+</p>
        </div>

        <AccessControl
          error={errors.type?.message}
          setValueFunc={onSelectEventType}
        />

        <PriceControl
          hookFormValues={register('cost')}
          error={errors.cost?.message}
          onSwitchPriceType={onSwitchPriceType}
          onChangeCurrencyType={onChangeCurrencyType}
        />

        <Gallery
          onUploadImage={onUploadImage}
          setValue={setValue}
          getValues={getValues}
        />

        <TagsControl
          setValuesFunc={handleTags}
        />
      </AddEventForm>
    </main>
  );
}

export default AddEventPage;
