
export interface RequestLoginBody {
  email: string;
  password: string;
}

export interface RequestRegistrationBody {
  username: string;
  email: string;
  password: string;
}

export interface RequestEmailCheckBody {
  email: string;
}

export interface IConfirmEmailRequest {
  confirmation_token: string;
}
