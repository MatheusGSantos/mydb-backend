export interface FormattedCarReturnDTO {
  id: string;
  available: boolean;
  brand: string;
  name: string;
  carImage: string;
  description: string;
  dailyRate: number;
  fineAmount: number;
  licensePlate: string;
  category: {
    id: string;
    name: string;
  }
}