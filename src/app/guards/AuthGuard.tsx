import { selectAccessToken } from "@/shared/lib";
import { ReactElement } from "react"
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactElement;
}

function AuthGuard({children}: AuthGuardProps) {
  if (selectAccessToken()) return <Navigate to="/"/>

  return children
}

export default AuthGuard;
