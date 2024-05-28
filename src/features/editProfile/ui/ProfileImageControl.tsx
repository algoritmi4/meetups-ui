import { ReactElement, useState } from "react";
import { FileInputWithDrag } from "@/shared";
import { useUploadImage } from "@/shared/lib/hooks/useUploadImage";
import { ProfileAvatar } from "@/widgets/Profile/ProfileInfo";

interface IProfileImageControlProps {
  name?: string;
  avatar: string;
  error?: string;
  value?: string;
  onChange?: (image_url: string) => void;
}

export function ProfileImageControl({
  name,
  avatar,
  error,
  value,
  onChange,
}: IProfileImageControlProps): ReactElement {
  const [imageState, setImageState] = useState({
    isImageUpload: false,
    src: "",
  });
  const { onUploadImage } = useUploadImage();

  const onUploadMainImage = (file: File) => {
    onUploadImage(file, (res) => {
      setImageState({
        isImageUpload: true,
        src: `https://storage.googleapis.com/meetups-dev/media/${res.url}`,
      });
      onChange ? onChange(res.url) : "";
    });
  };

  return (
    <FileInputWithDrag uploadImageFunc={onUploadMainImage} error={error}>
      {imageState.isImageUpload ? (
        <ProfileAvatar
          image={value ? `${value}` : imageState.src}
          name={name ? name : ""}
          extraClass="cursor-pointer before:bg-edit-photo before:bg-no-repeat before:bg-center before:absolute before:inset-0 before:bg-edit-profile-shadow before:rounded-circle before:opacity-0 before:hoverscreen:hover:opacity-100 before:z-50 before:duration-150"
        />
      ) : (
        <ProfileAvatar
          image={avatar ? avatar : ""}
          name={name ?? ""}
          extraClass="cursor-pointer before:bg-edit-photo before:bg-no-repeat before:bg-center before:absolute before:inset-0 before:bg-edit-profile-shadow before:rounded-circle before:opacity-0 before:hoverscreen:hover:opacity-100 before:z-50 before:duration-150"
        />
      )}
    </FileInputWithDrag>
  );
}
