/**
 * ✅ DX Best Practice
 * Use branded type to entity id to
 * don't to be confused with other identifiers
 */
interface IUserFavorite {
  id: number,
  name: string
}
export interface ProfileId {userId: string};

export interface ProfileDetails {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  image: Url,
  isEmailVerified: boolean,
  city: string,
  is_private: boolean,
  bio: string,
  age: number,
  date_of_birth: string,
  category_favorite: IUserFavorite[] | []
} 

export interface ProfileFollowing {
  id: number,
  user: number,
  follower: number,
  status: string,
} 
