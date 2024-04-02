import { FileInputWithDrag } from "@/shared";
import { ReactElement, useId, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "../addEvent/model/addEventFormSchema";

interface IGalleryProps {
  onUploadImage: (file: File, callback: (res: {url: string}) => void) => void;
  setValue: UseFormSetValue<AddEventValidationSchema>;
  getValues: UseFormGetValues<AddEventValidationSchema>;
}

export function Gallery({ onUploadImage, setValue, getValues }: IGalleryProps): ReactElement {
  const uploadInputId = useId();
  const [imagesArr, setImagesArr] = useState<string[]>([]);

  const onUploadImageInGallery = (file: File) => {
    onUploadImage(file, (res) => {
      setImagesArr((state) => ([...state, `https://storage.googleapis.com/meetups-dev/media/${res.url}`]));
      const gallery = getValues('gallery');

      setValue('gallery', [...gallery, `https://storage.googleapis.com/meetups-dev/media/${res.url}`]);
    })
  }

  return (
    <>
      <label htmlFor={uploadInputId} className="text-[20px] mt-[18px] cursor-pointer">Галерея фото и видео (необязательно)</label>
      <FileInputWithDrag uploadImageFunc={onUploadImageInGallery} id={uploadInputId} extraClass="min-h-[80px] px-[22px] mt-[7px]">
        {
          imagesArr.length > 0 ? (
            <div className="flex items-center flex-wrap py-1.5">
              <div className="w-6 h-6 bg-plus-icon bg-center bg-no-repeat mr-3.5"></div>
              {
                imagesArr.map((el, index) => <img key={index} src={el} className="w-[68px] h-[68px] rounded-[10px] object-cover mr-1.5" alt="Ваше загруженное изображение" />)
              }
            </div>
          ) : (
            <div className="flex py-[13px]">
              <div className="w-6 h-6 bg-gallery-icon bg-center bg-no-repeat"></div>
              <p className="text-text-light-gray text-[18px] leading-[22.59px] ml-[12px]">Загрузите дополнительные материалы</p>
            </div>
          )
        }
      </FileInputWithDrag>
    </>
  )
}
