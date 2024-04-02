import { ReactElement, useState } from "react";
import addImageIcon from '/images/add-image-icon.svg';
import { FileInputWithDrag } from "@/shared";
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "../addEvent/model/addEventFormSchema";

interface IMainImageControlProps {
  error?: string;
  onUploadImage: (file: File, callback: (res: {url: string}) => void) => void;
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
}

export function MainImageControl({ error, onUploadImage, setValue, clearErrors }: IMainImageControlProps): ReactElement {
  const [imageState, setImageState] = useState({isImageUpload: false, src: ''});

  const onUploadMainImage = (file: File) => {
    onUploadImage(file, (res) => {
      setImageState({isImageUpload: true, src: `https://storage.googleapis.com/meetups-dev/media/${res.url}`});
      setValue('image_url', `https://storage.googleapis.com/meetups-dev/media/${res.url}`);
      clearErrors('image_url');
    })
  }

  return (
    <FileInputWithDrag
      uploadImageFunc={onUploadMainImage}
      error={error}
      extraClass="h-[170px] w-[270px] flex flex-col items-center justify-center"
    >
      {
        imageState.isImageUpload ? (
          <img className="object-contain" src={imageState.src} alt="Ваше загруженное изображение" />
        ) : (
          <>
            <img className="mt-[45px]" src={addImageIcon} alt="Поле для загрузки фото" />
            <p className="text-[18px] font-light text-text-light-gray mt-5 mb-[22px] whitespace-nowrap leading-[22.59px]">Загрузите главное фото</p>
          </>
        )
      }
    </FileInputWithDrag>
  )
}
