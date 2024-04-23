import { IInputProps, Input } from "@/shared/ui/Inputs/Input";
import { ReactElement, useId } from "react";
import cx from 'classnames';

interface ILabeledInputProps extends IInputProps {
  extraLabelClass?: string;
  labelText: string;
  extraBoxClass?: string;
}

export function LabeledInput({
  extraLabelClass,
  labelText,
  extraBoxClass,
  ...rest
}: ILabeledInputProps): ReactElement {
  const id = useId();

  return (
    <div className={
      cx(
        'flex flex-col items-start',
        extraBoxClass
      )
    }>
      <label
        htmlFor={id}
        className={
        cx(
          'cursor-pointer',
          extraLabelClass
        )
      }>{labelText}</label>
      <Input
        id={id}
        {...rest}
      />
    </div>
  )
}
