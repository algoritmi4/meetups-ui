import { Menu } from "@headlessui/react";

export function BurgerMenu() {
  return (
    <Menu.Items className="absolute flex flex-col right-0 z-[11] mt-10 w-[293px] h-[435px] px-10 py-[30px] rounded-[20px] bg-white shadow justify-start items-start gap-[15px] inline-flex focus:outline-none">
      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-user-profile w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px] font-['Mulish']">
                Профиль
              </p>
            </div>
          </a>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-favorite w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px]  font-['Mulish']">
                Избранные
              </p>
            </div>
          </a>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-plans w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px]  font-['Mulish']">
                Запланированные
              </p>
            </div>
          </a>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-created w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px]  font-['Mulish']">
                Созданные
              </p>
            </div>
          </a>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-visited w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px]  font-['Mulish']">
                Посещенные
              </p>
            </div>
          </a>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-subscriptions w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px]  font-['Mulish']">
                Подписки
              </p>
            </div>
          </a>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-chat w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px]  font-['Mulish']">
                Чат
              </p>
            </div>
          </a>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-security w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex]">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px] font-['Mulish']">
                Безопасность и вход
              </p>
            </div>
          </a>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <a className={`${active}`} href="/#">
            <div className="flex">
              <div className="bg-logout w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
                {" "}
              </div>
              <p className="text-zinc-600 text-[17px] font-['Mulish']">
                Выйти из профиля
              </p>
            </div>
          </a>
        )}
      </Menu.Item>
    </Menu.Items>
  );
}
