import { IEvent } from "@/entities/event/model/types";

export interface IProfileEvents {
    profileId: string;
    data: IEvent[];
    isLoading: boolean;
    title: string;
  }
