import {ReactElement, useCallback} from "react";
import {Button, FormWrapper} from "@/shared/ui";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  passwordSchema,
  PasswordValidationSchema
} from "@/features/authentication/reset-password/model/ResetPasswordFormSchema";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useConfirmResetPasswordMutation} from "@/features/authentication/reset-password/api/resetPasswordApi";
import {RESET_PASSWORD_FORM_VALUES_KEY} from "@/features/authentication/reset-password/model/constants";
import {ValueTextField} from "@/shared/types";
import {useFilledValue} from "@/shared/lib/hooks";
import { PasswordInput } from "@/shared";
import Svg from "@/shared/ui/Svg";

interface ILoginFormProps {
  onComplete?: () => void;
}

export function EnterNewPasswordStep({onComplete}: ILoginFormProps): ReactElement  {
  const {
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
    register,
    setValue,
  } = useForm<PasswordValidationSchema>({
    resolver: zodResolver(passwordSchema)
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [ postConfirmResetPassword ] = useConfirmResetPasswordMutation();
  useFilledValue(RESET_PASSWORD_FORM_VALUES_KEY, setValue, [ValueTextField.PASSWORD]);

  const onSubmit = useCallback(({password}: PasswordValidationSchema) => {
    const token = searchParams.get("token");
    if (token === null) return;
    postConfirmResetPassword({password, token})
      .unwrap()
      .then(() => {
        navigate('/login/');
        onComplete?.();
      })
      .catch(err => console.log(err))
  }, [searchParams]);

  return (
    <FormWrapper redirectType='register' headerText='Новый пароль'>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-0 md:px-90">
        <p className='text-neutral-500 text-base md:text-lg font-normal mb-2.5 md:mb-3.5'>Придумайте уникальный пароль</p>
        <PasswordInput
          type='password'
          head={<Svg id="password-icon" />}
          placeholder='Пароль'
          hookFormRegister={register('password')}
          isError={!!errors.password}
          size="md"
          className="mt-3.5 text-[18px] !pr-5"
        />
        <div className='flex mt-5 md:mt-18 pb-3.5 md:pb-3 items-center'>
          {(isValid && isSubmitted) ? (
            <div
              className='w-[18px] h-[18px] mr-3 bg-center bg-no-repeat'
              style={{ backgroundImage: `url("/images/icon-checked.svg")` }}
            />
            ) : (
            <div className='bg-custom-gray w-[18px] h-[18px] rounded-full mr-3' />
          )}
          <p className={`text-base md:text-lg font-normal  ${errors.password ? 'text-input-error' : 'text-neutral-500'}`}>
            Минимум 8 символов
          </p>
        </div>
        <Button
          type='submit'
          size="xl"
          importance="primary"
          extraClass='mt-[21px] md:mt-[15px] mb-[31px] md:mb-0'
          disabled={!isValid || isSubmitted}
        >
          Войти
        </Button>
      </form>
    </FormWrapper>
  )
}
