import { useLazyConfirmEmailQuery } from "@/entities/session/api/sessionApi";
import { ReactElement, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ProxySecurityConfirmEmailPage(): ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const confirmation_token = searchParams.get('token');

  const [confirmEmail] = useLazyConfirmEmailQuery();

  useEffect(() => {
    if (!confirmation_token) {
      navigate('/');
    } else {
      confirmEmail({ confirmation_token })
        .then(() => navigate('/security'))
        .catch((err) => {
          navigate('/security');
          console.log(err);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
  )
}

export default ProxySecurityConfirmEmailPage;
