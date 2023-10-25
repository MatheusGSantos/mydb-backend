interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  getMidDayDate(date?: Date): Date;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  subtractHours(date: Date, hours: number): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}

export { IDateProvider };