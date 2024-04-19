export interface Session {
  access: string
  refresh: string
}

export interface AccessToken {
  access: string
}

export interface RefreshToken {
  refresh: string
}

export interface SessionDto {
  access: string,
  refresh: string
}

export interface AccessTokenDto {
  access: string,
}

export interface IUploadImageResponse {
  url: string;
  test_url: string;
}

export interface ISelectInputOptions {
  id: number;
  name: string;
}
