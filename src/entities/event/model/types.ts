export interface IEventTag {
  id: number,
  name: string
}

export interface IParticipant {
  id: number,
  username: string,
  image_url: string,
  bio?: string
}

export interface IEvent {
  id: number,
  name: string,
  rating: string | null,
  image_url: string,
  description: string,
  start_date: string,
  end_date: string | null,
  tags: IEventTag[] | [],
  address: string,
  category: IEventTag | null,
  participants_number: number,
  desired_participants_number: number,
  created_by: IParticipant,
  participants: IParticipant[],
  gallery: string[],
  free: boolean,
  cost: string
}
