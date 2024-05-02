export interface IEventTag {
  id: number,
  name: string
}

interface IEventCurrency {
  name: string;
  id: number;
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
  average_rating: number | null,
  image_url: string,
  description: string,
  start_date: string,
  end_date: string | null,
  start_time: string,
  end_time: string | null,
  tags: IEventTag[] | [],
  address: string,
  category: IEventTag | null,
  participants_number: number,
  is_favorite: boolean
}

export interface IGetEventRequest {
  search?: string;
  categories?: string;
}

export interface IDetailedEvent {
  id: number,
  name: string,
  average_rating: number | null,
  image_url: string,
  description: string,
  start_date: string,
  end_date: string | null,
  start_time: string,
  end_time: string | null,
  tags: IEventTag[] | [],
  address: string,
  category: IEventTag | null,
  participants_number: number,
  desired_participants_number: number,
  created_by: IParticipant,
  participants: IParticipant[],
  gallery: string[],
  free: boolean,
  cost: string,
  any_participant_number: boolean,
  location: number[],
  currency: IEventCurrency,
  type: 'open' | 'private',
  is_visible: boolean,
  is_finished: boolean,
  private_token: string | null,
  is_favorite: boolean
}
