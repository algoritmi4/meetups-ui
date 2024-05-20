import { ReactElement, ReactNode } from "react";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { useEditProfileMutation } from "@/entities/profile/api/profileApi";
import { UseFormHandleSubmit } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared";
import { Preloader } from "@/shared/ui/Preloader";

interface IEditProfileFormProps {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<EditProfileValidationSchema>;
  isLoading: boolean;
}

export function EditProfileForm({
  children,
  handleSubmit,
  isLoading,
}: IEditProfileFormProps): ReactElement {

  const navigate = useNavigate();
  const [editProfile, { isLoading: isEditProfileLoading }] =
    useEditProfileMutation();

  const onSubmit = (data: EditProfileValidationSchema) => {
    console.log('patch info')
    editProfile(data)
      .unwrap()
      .then(() => navigate("/profile/me"))
      .catch((err) => console.log(err));
  };

  if (isLoading) return <Preloader />;

  return (
    <form
      onSubmit={(data) => void handleSubmit(onSubmit)(data)}
      noValidate
      className="flex flex-col scrollbar"
    >
      {children}
      <Button
        type="submit"
        size="lg"
        importance="primary"
        extraClass="self-start mt-10"
        disabled={isEditProfileLoading}
      >
        Сохранить
      </Button>
    </form>
  );
}
