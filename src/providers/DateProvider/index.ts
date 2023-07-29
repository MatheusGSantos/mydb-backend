import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "./IDateProvider";

dayjs.extend(utc);

export default class DayjsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate);
    const startDateUtc = this.convertToUTC(startDate);
    
    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }
  
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  
  dateNow(): Date {
    return dayjs().toDate();
  }
  
  getMidDayDate(date?: Date): Date {
    return dayjs(date).startOf('day').add(12, 'hours').toDate();
  }
  
  compareInDays(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate);
    const startDateUtc = this.convertToUTC(startDate);
    
    return dayjs(endDateUtc).diff(startDateUtc, "days");
  }
  
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
  
  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  subtractHours(date: Date, hours: number): Date {
    return dayjs(date).subtract(hours, "hour").toDate();
  }
  
  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }
}