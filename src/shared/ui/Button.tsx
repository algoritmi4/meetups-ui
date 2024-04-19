import { ReactNode } from "react";
import cx from 'classnames';

interface IButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  importance?: 'none' | 'primary' | 'secondary';
  extraClass?: string;
  disabled?: boolean;
}

export function Button({
  onClick,
  children,
  type = 'button',
  size = 'sm',
  importance = 'none',
  extraClass = '',
  disabled = false
}: IButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={
        cx(
          'relative inline-flex items-center justify-center select-none outline-none overflow-hidden rounded-def duration-150 hoverscreen:hover:opacity-70 text-[18px] leading-def',
          {
            'px-5 py-2.5': size === 'sm',
            'px-[30px] py-2.5': size === 'md',
            'px-[45px] py-2.5': size === 'lg',
            'w-full py-3.5': size === 'xl',
            'bg-transparent text-black': importance === 'none',
            'bg-main-purple hoverscreen:hover:bg-hover-pink text-white font-semibold': importance === 'primary',
            'bg-beige text-main-violet font-semibold': importance === 'secondary',
            'cursor-default bg-select-disable text-white pointer-events-none': disabled
          },
          extraClass
        )
      }
    >{children}</button>
  )
}
