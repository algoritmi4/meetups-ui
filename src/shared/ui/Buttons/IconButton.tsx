import cx from 'classnames';
import Svg from '../Svg';
import { Button, IButtonProps } from './Button';
import { ReactElement } from 'react';

export interface IIconButtonProps extends Omit<IButtonProps, 'children' | 'size'> {
  iconId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({
  iconId,
  extraClass,
  size = 'md',
  ...rest
}: IIconButtonProps): ReactElement {
  return (
    <Button
      extraClass={
        cx(
          'flex items-center justify-center duration-150 hoverscreen:hover:opacity-70',
          {
            'w-10 h-10 !p-2 rounded-def': size === 'lg',
          },
          extraClass,
        )
      }
      size='md'
      {...rest}
    >
      <Svg className="fill-current w-6 h-6" id={iconId} />
    </Button>
  );
}
