import { ReactElement, useState } from "react";
import addImageIcon from '/images/add-image-icon.svg';
import { FileInputWithDrag } from "@/shared";
import { useUploadImage } from "@/shared/lib/hooks/useUploadImage";

interface IMainImageControlProps {
  error?: string;
  value?: string;
  onChange?: (image_url: string) => void;
}

export function MainImageControl({ error, value, onChange }: IMainImageControlProps): ReactElement {
  const [imageState, setImageState] = useState({isImageUpload: false, src: ''});
  const { onUploadImage } = useUploadImage();

  const onUploadMainImage = (file: File) => {
    onUploadImage(file, (res) => {
      setImageState({isImageUpload: true, src: `https://storage.googleapis.com/meetups-dev/media/${res.url}`});
      onChange && onChange(`https://storage.googleapis.com/meetups-dev/media/${res.url}`);
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
          <img className="object-contain" src={value ?? imageState.src} alt="Ваше загруженное изображение" />
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
