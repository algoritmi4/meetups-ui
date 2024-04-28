import { AddEventForm } from "@/features/addEvent/addEventForm";
import { ReactElement, useEffect } from "react";
import { MapWidget } from "@/widgets/mapWidget";
import { FormProvider, useForm } from "react-hook-form";
import { AddEventValidationSchema, addEventSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategoriesQuery } from "@/features/searchFilter/api/categoriesApi";
import { useFormActions } from "@/features/addEvent/addEventForm/model/useFormActions";
import { useGetTagsQuery } from "@/entities/tags/api/tagsApi";
import { useGetCurrenciesQuery } from "@/features/addEvent/priceControl/api/currencyApi";
import { PageTitle, ParticipantsControl, TimeControl, MediaControl, MainInfoControl } from "@/widgets/addEvent";

function AddEventPage(): ReactElement {
  const { data: categories = {results: []}, isError: isCategoriesError, error: categoriesError, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess } = useGetCategoriesQuery();
  const { data: tags = {results: []}, isError: isTagsError, error: tagsError, isLoading: isTagsLoading, isSuccess: isTagsSuccess } = useGetTagsQuery();
  const { data: currencies = {results: []}, isError: isCurrenciesError, error: currenciesError, isLoading: isCurrenciesLoading, isSuccess: isCurrenciesSuccess } = useGetCurrenciesQuery();

  isCurrenciesError && console.log(`Ошибка при получении валют - ${JSON.stringify(currenciesError)}`);
  isTagsError && console.log(`Ошибка при получении тегов - ${JSON.stringify(tagsError)}`);
  isCategoriesError && console.log(`Ошибка при получении тегов - ${JSON.stringify(categoriesError)}`);

  const isFormLoading = isCategoriesLoading || isTagsLoading || isCurrenciesLoading || !isCategoriesSuccess || !isTagsSuccess || !isCurrenciesSuccess;

  const methods = useForm<AddEventValidationSchema>({
    resolver: zodResolver(addEventSchema),
    mode: 'onBlur',
    defaultValues: {
      any_participant_number: false,
      schedule: [],
      private_url: null,
      repeatable: false,
      free: false,
      tags: [],
      gallery: [],
      start_time: null,
      end_time: null
    }
  });

  const { onSelectAddress } = useFormActions({ setValue: methods.setValue, clearErrors: methods.clearErrors });

  useEffect(() => {
    console.log(methods.formState.errors);
    console.log(methods.getValues());
  }, [methods.formState.errors])

  return (
    <main className={`w-full max-w-[1005px] mx-auto ${isFormLoading ? "" : "pb-[98px]"}`}>
      <PageTitle />
      <FormProvider {...methods}>
        <AddEventForm handleSubmit={methods.handleSubmit} isLoading={isFormLoading}>
          <MainInfoControl categories={categories.results}/>
          <TimeControl />
          <MapWidget
            setValuesFunc={onSelectAddress}
            setValue={methods.setValue}
            error={methods.formState.errors.address?.message}
            text="Точка на карте"
            position={{ lat: 53.9, lng: 27.56667 }}
            zoom={14}
            withAddressControl={true}
          />
          <ParticipantsControl currencies={currencies.results} />
          <MediaControl tags={tags.results}/>
        </AddEventForm>
      </FormProvider>
    </main>
  );
}

export default AddEventPage;
