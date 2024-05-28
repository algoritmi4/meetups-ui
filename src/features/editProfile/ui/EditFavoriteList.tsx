import { ReactElement } from "react";
import { Disclosure } from "@headlessui/react";
import Svg from "@/shared/ui/Svg";
import { ICategory } from "@/features/searchFilter/model/types";
import { Button } from "@/shared";

interface IEditFavoriteList {
  categories: ICategory[] | [];
  value: ICategory[] | [];
  onChange: (arg: ICategory[]) => void;
}

export function EditFavoriteList({
  categories,
  value,
  onChange,
}: IEditFavoriteList): ReactElement {
  const onDeleteItem = (id: number) => {
    onChange(value.filter((item) => item.id != id));
  };

  const onAddItem = (item: ICategory) => {
    if (!value.some((userItem) => userItem.id === item.id)) {
      onChange([...value, item]);
    }
  };

  const interestsList = value.map(({ name, image_url, id }) => (
    <div
      className="flex flex-row flex-nowrap mt-[12px] cursor-pointer"
      key={id}
    >
      <img
        className="w-[24px] h-[24px] flex-nowrap"
        src={`https://storage.googleapis.com/meetups-dev/media/${image_url}`}
        alt={`иконка интереса ${name}`}
      />
      <p className="flex flex-nowrap ml-[8px] text-indigo-600 text-lg font-semibold cursor-pointer">
        {name}
      </p>
      <div className="w-[24px] h-[24px] ml-[4px] mr-[22px]">
        <Svg
          id="profile-x"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          extraUseClass="cursor-pointer"
          onClick={() => onDeleteItem(id)}
        />
      </div>
    </div>
  ));

  const categoriesList = categories.map(({ name, image_url, id }) => (
    <div
      className={`flex flex-row flex-nowrap ml-[18px] mt-[12px] cursor-pointer ${
        value.some((item) => item.id === id)
          ? "opacity-70 cursor-not-allowed"
          : ""
      }`}
      key={id}
      onClick={() => onAddItem({ name, image_url, id })}
    >
      <img
        className="w-[24px] h-[24px] flex-nowrap"
        src={`https://storage.googleapis.com/meetups-dev/media/${image_url}`}
        alt={`иконка интереса ${name}`}
      />
      <p className="flex flex-nowrap ml-[8px] text-indigo-600 text-lg font-semibold">
        {name}
      </p>
    </div>
  ));

  return (
    <div className="mt-[18px]">
      <p className="text-[20px] mt-[18px]">Интересы</p>
      {value?.length != 0 && (
        <div className="flex flex-row-revers flex-wrap max-w-[550px] max-h-[115px] text-pretty text-ellipsis overflow-hidden mt-[14px]">
          {interestsList}
        </div>
      )}
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button as={"div"}>
              <Button
                type="button"
                size="md"
                importance="secondary"
                extraClass="self-start mt-[14px]"
              >
                {open ? "Готово" : "Добавить"}
              </Button>
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-wrap w-[550px] bg-zinc-100 rounded-[10px] pt-[4px] pb-[16px] px-[22px] mt-[4px]">
              {categoriesList}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
