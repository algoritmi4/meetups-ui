import {ICardProps} from "@/shared/types";

interface IFormatedWeekDays {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
}

export function generateCalendarDays(days_quantity: number) {
  const date = (new Date());

  const dateArr: ICardProps[] = [];

  const formatedWeekDays = {
    "0": 'ПН',
    "1": 'ВТ',
    "2": 'СР',
    "3": 'ЧТ',
    "4": 'ПТ',
    "5": 'СБ',
    "6": 'ВС'
  }

  for (let i = 0; i < days_quantity; i++) {
    const monthNames = ['01', '02', '03','04','05','06','07','08','09','10','11','12']
    const daysNames = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
    let weekDay: string | number = day.getDay() > 0 ? day.getDay() - 1 : 6;

    Object.keys(formatedWeekDays).forEach((el) => Number(el) === weekDay ? weekDay = formatedWeekDays[el as keyof IFormatedWeekDays] : null);

    dateArr.push({date: daysNames[day.getDate()], weekDay: String(weekDay), month: monthNames[day.getMonth()], year: String(day.getFullYear()), summary: Number((String(day.getFullYear())+ monthNames[day.getMonth()] + String(day.getDate())))});

  }

  return dateArr;
}
