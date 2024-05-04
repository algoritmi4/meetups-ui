import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { EmailControl, PasswordControl } from "@/features/security";
import PasswordPopup from "@/features/security/ui/PasswordPopup";
import { Preloader } from "@/shared/ui/Preloader";
import { PageTitle } from "@/widgets/PageTitle";
import { ReactElement } from "react";

function SecurityPage(): ReactElement {
  const {
    data,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
    isSuccess: isProfileSuccess
  } = useMyDetailsQuery();

  isProfileError && console.log(`Ошибка при получении профиля ${JSON.stringify(profileError)}`);

  return (
    <main className="w-full min-h-[695px]">
      <PasswordPopup />
      <PageTitle title="Безопасность и вход" />
      <section className="mt-10 grow">
        <h2 className="text-[28px] font-semibold">Данные аккаунта</h2>
        {
          isProfileLoading || !isProfileSuccess ? (
            <Preloader />
          ) : (
            <div className="flex justify-between max-w-[1110px] mt-[25px]">
              <EmailControl email={data.email} />
              <PasswordControl />
            </div>
          )
        }
      </section>
    </main>
  )
}


export default SecurityPage;
