interface IUserFavorite {
  id: number,
  name: string
}

export interface ProfileDto {
  id: number
  username: string
  first_name?: string
  last_name?: string
}

export interface ProfileDetailsDto extends ProfileDto {
  email: string
  image_url: string,
  is_email_verified: boolean,
  city: string,
  is_private: boolean,
  bio: string,
  age: number,
  date_of_birth: string,
  category_favorite: IUserFavorite[] | []
}
   
export interface ProfileFollowingDto  {
  id: number,
  user: number,
  follower: number,
  status: string,
}
  