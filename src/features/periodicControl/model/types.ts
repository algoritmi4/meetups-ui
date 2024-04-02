export interface IDay {
  id: number;
  name: string;
  isSelected: boolean;
  day_of_week: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  time: string;
}

export interface ISchemaDay {
  day_of_week: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  time: string;
}

export interface IDays {
  day_of_week: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  isSelected: boolean;
  time: string;
}

export interface IDayObj {
  'ПН': IDays;
  'ВТ': IDays;
  'СР': IDays;
  'ЧТ': IDays;
  'ПТ': IDays;
  'СБ': IDays;
  'ВС': IDays;
}
