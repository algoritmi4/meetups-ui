import { useUploadImageMutation } from "@/shared/api/uploadImageApi";

type onUploadImageFunc = (file: File, callback: (res: {url: string}) => void) => void;

export const useUploadImage = () => {
  const [ uploadImage ] = useUploadImageMutation();

  const onUploadImage: onUploadImageFunc = (file, callback) => {
    const formData = new FormData();

    formData.append('file', file);
  
    uploadImage(formData)
      .unwrap()
      .then(callback)
      .catch((err) => console.log(err));
  }

  return { onUploadImage };
}
