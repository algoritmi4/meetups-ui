import { IDay, IDayObj } from "./types";

export const daysArr: IDay[] = [
  { id: 1, name: 'ПН', isSelected: false, day_of_week: 'mon', time: '18:00' },
  { id: 2, name: 'ВТ', isSelected: false, day_of_week: 'tue', time: '18:00' },
  { id: 3, name: 'СР', isSelected: false, day_of_week: 'wed', time: '18:00' },
  { id: 4, name: 'ЧТ', isSelected: false, day_of_week: 'thu', time: '18:00' },
  { id: 5, name: 'ПТ', isSelected: false, day_of_week: 'fri', time: '18:00' },
  { id: 6, name: 'СБ', isSelected: false, day_of_week: 'sat', time: '18:00' },
  { id: 7, name: 'ВС', isSelected: false, day_of_week: 'sun', time: '18:00' }
]

export const daysObj: IDayObj = {
  'ПН': {
    day_of_week: 'mon',
    isSelected: false,
    time: '18:00'
  },
  'ВТ': {
    day_of_week: 'tue',
    isSelected: false,
    time: '18:00'
  },
  'СР': {
    day_of_week: 'wed',
    isSelected: false,
    time: '18:00'
  },
  'ЧТ': {
    day_of_week: 'thu',
    isSelected: false,
    time: '18:00'
  },
  'ПТ': {
    day_of_week: 'fri',
    isSelected: false,
    time: '18:00'
  },
  'СБ': {
    day_of_week: 'sat',
    isSelected: false,
    time: '18:00'
  },
  'ВС': {
    day_of_week: 'sun',
    isSelected: false,
    time: '18:00'
  }
}
