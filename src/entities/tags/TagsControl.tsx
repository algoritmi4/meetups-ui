import { Input } from "@/shared";
import { ChangeEvent, ReactElement, useState } from "react";
import { useGetTagsQuery } from "./api/tagsApi";
import { ITag } from "./model/types";

interface ITagsControlProps {
  setValuesFunc?: (tagId: number, toRemove: boolean) => void;
}

export function TagsControl({ setValuesFunc }: ITagsControlProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const { data: tags = {results: []}, isError, error } = useGetTagsQuery();

  isError && console.log(`Ошибка при получении тегов - ${JSON.stringify(error)}`);

  const tips = tags.results.filter((tag) => tag.name.toLowerCase().includes(inputValue.toLowerCase()) && !selectedTags.some((el) => el.id === tag.id));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleTagSelect = (tag: ITag) => {
    setSelectedTags((state) => ([...state, tag]));

    setValuesFunc && setValuesFunc(tag.id, false);

    setInputValue('');
  }

  const handleTagDelete = (tagId: number) => {
    setSelectedTags((state) => state.filter((el) => el.id !== tagId));

    setValuesFunc && setValuesFunc(tagId, true);
  }

  return (
    <div className="mt-[18px] relative">
      <Input
        HTMLType='text'
        iconType='search-icon-gray'
        labelText="Тэги (необязательно)"
        placeholder='Ищите теги'
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
        id='add-event-name'
        extraBoxClass="px-[22px] mt-[7px] max-w-[480px]"
        extraInputClass="pl-3"
      />
      <p className='text-text-light-gray mt-2'>Тезисно опишите свое мероприятие</p>
      {
        inputValue === '' || tips.length === 0 ? (
          <></>
        ) : (
          <div className="absolute top-[90px] w-full bg-custom-gray rounded-[10px] pl-[22px] py-[13px] pr-1.5 max-w-[480px]">
            <ul className="w-full max-h-[170px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]">
              {
                tips.map((tag, index) => (
                  <li onClick={() => handleTagSelect(tag)} key={index} className="flex mt-2 first-of-type:mt-0 cursor-pointer">
                    <div className="text-[18px] w-[22px] text-center">
                      <p>{tag.id}</p>
                    </div>
                    <p className="text-[18px] font-semibold ml-3.5">{tag.name}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
      {
        selectedTags.length === 0 ? (
          <></>
        ) : (
          <ul className="flex flex-wrap max-w-[796px] ml-[-20px]">
            {
              selectedTags.map((tag, index) => (
                <li key={index} className="flex items-center h-[34px] border-1 border-main-blue border-solid rounded-[12px] pl-[22px] pr-3.5 ml-5 mt-3">
                  <p className="text-[18px] text-main-blue">{tag.name}</p>
                  <div onClick={() => handleTagDelete(tag.id)} className="w-6 h-6 bg-close-cross-purple bg-center bg-no-repeat ml-1.5 cursor-pointer"></div>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}
