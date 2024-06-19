import Svg from "@/shared/ui/Svg";

export function Notifications() {

 const notificationsList: any = []


  return (
    <div className="flex flex-col w-[315px] justify-start items-start mx-[30px] mt-[30px] mb-[6px]">
      <div className="flex w-full justify-between">
        <p className="text-zinc-800 text-xl font-semibold">Ваши уведомления</p>
        <Svg
          className="self-center"
          id="notification-list"
          width="30"
          height="24"
          viewBox="0 0 30 24"
          fill="none"
        />
      </div>
      {notificationsList}
    </div>
  );
}
