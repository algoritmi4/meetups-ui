import { Button, LabeledInput } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { Disclosure, Transition } from "@headlessui/react";
import { ReactElement, useState } from "react";

interface IEmailControlProps {
  email: string;
}

function EmailControl({ email }: IEmailControlProps): ReactElement {
  const [isEmailChanging, setIsEmailChanging] = useState(false);

  const handleEmailChanging = () => {
    setIsEmailChanging((state) => !state);
  }

  return (
    <div className="flex flex-col items-start">
      <LabeledInput
        labelText="Привязанная почта"
        extraLabelClass="text-[20px]"
        size="lg"
        className="w-[480px] mt-[7px] text-[18px]"
        tail={<Svg className="w-6 h-6" id="email-envelope-icon" />}
        value={email}
        readOnly={true}
        disabled={isEmailChanging}
      />
      <Disclosure>
        <Disclosure.Button onClick={handleEmailChanging} as="div">
          <Button
            type="button"
            extraClass={`mt-5 text-[18px] font-semibold ${isEmailChanging ? "text-text-disable" : "text-but-primary"}`}
          >Привязать другую</Button>
        </Disclosure.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="mt-10">
            <LabeledInput
              labelText="Новая почта"
              extraLabelClass="text-[20px]"
              size="lg"
              className="w-[480px] mt-[7px] text-[18px]"
              tail={<Svg className="w-6 h-6" id="email-envelope-icon" />}
              placeholder="Введите новый адрес"
            />
            <Button
              type="submit"
              size="sm"
              importance="primary"
              extraClass="mt-5"
            >Подтвердить
            </Button>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  )
}

export default EmailControl;
