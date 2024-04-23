import { useState } from 'react';
import { IInputProps, Input } from './Input';
import Svg from '../Svg';

export type IPasswordInputProps = Omit<IInputProps, 'tail'>

export function PasswordInput({
  ...rest
}: IPasswordInputProps) {
  const [showPwd, setShowPwd] = useState(false);
  const onEyeClick = () => setShowPwd(!showPwd);

  return (
    <Input
      tail={
        <Svg
          id={showPwd ? 'eye-on' : 'eye-off'}
          className='w-6 h-6 cursor-pointer'
          onClick={onEyeClick}
        />
      }
      {...rest}
      type={showPwd ? 'text' : 'password'}
    />
  );
}
