import { string } from "zod";

export enum ValueTextField {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
}

export interface ISelectorOptions {
  value: string;
  name: string;
}

export interface ISlickSliderSettings {
  infinite?: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
}

export interface ICardProps {
  date: string;
  weekDay: string;
  month: string;
  year: string;
  summary: number;
}

export interface ArrowsExtraClasses {
  rightArrow: string;
  leftArrow: string;
}

export type DebounceFunctionType = () => {
  payload: string;
  type: "searchFilter/setSearchFilter";
}

export interface IApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}
