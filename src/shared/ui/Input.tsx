import {UseFormRegisterReturn} from "react-hook-form";
import {ChangeEvent, useState} from "react";

interface IInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  HTMLType: 'email' | 'text' | 'password' |'date' | 'number' | 'time';
  iconType?: 'person' | 'mail' | 'password' | 'search-icon-gray';
  value?: string;
  placeholder?: string;
  extraBoxClass?: string;
  extraContentClass?: string;
  inlineLabel?: boolean;
  defaultValue?: string;
  error?: any;
  id?: string;
  labelText?: string;
  hookFormValues?: UseFormRegisterReturn<string>;
}

export function Input({ onChange, HTMLType, iconType, value, placeholder, extraBoxClass, extraContentClass, inlineLabel, defaultValue, error, id, labelText, hookFormValues }: IInputProps) {
  const [type, setType] = useState<string>(HTMLType);
  const [passwordIcon, setPasswordIcon] = useState<string>('show-password');

  const toggleShowPassword = () => {
    if (type === 'password') {
      setType('text');
      setPasswordIcon('hide-password');
    } else {
      setType('password');
      setPasswordIcon('show-password');
    }
  };

  return (
    <div className={`flex  ${inlineLabel ? 'flex-row items-center gap-x-3.5' : 'flex-col'}`}>
      {labelText && (
        <label htmlFor={id} className={`text-xl text-text-black`}>{labelText}</label>
      )}
      <div className={`bg-custom-gray rounded-[10px] border w-[316px] md:w-80 ${extraBoxClass} ${error ? 'border-input-error' : 'border-transparent'}`}>
        <div className={`flex items-center h-48px w-full overflow-hidden p-3.5 ${extraContentClass}`}>
          {iconType &&
            <div
              className='min-w-6 h-6 bg-center bg-no-repeat bg-cover'
              style={{ backgroundImage: `url("/images/${iconType}.svg")` }}
            />}
          <input
            {...hookFormValues}
            onChange={onChange}
            value={value}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            className={`h-full w-full outline-none text-text-black bg-inherit px-2 font-normal placeholder:text-text-light-gray text-base md:text-lg`}
            id={id}
          />
          {(HTMLType === 'password') &&
            <div
              className='min-w-6 h-6 bg-center bg-no-repeat cursor-pointer'
              style={{ backgroundImage: `url("/images/${passwordIcon}.svg")` }}
              onClick={toggleShowPassword}
            />}
        </div>
      </div>
    </div>
  )
}
