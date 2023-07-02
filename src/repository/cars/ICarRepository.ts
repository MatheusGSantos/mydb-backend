export interface AvailablesCarsRequestDTO {
  brand?: string;
  name?: string;
  category?: string;
}

export interface NewCarDTO {
  name: string;
  categoryId: string;
  carImage?: string;
  description: string;
  dailyRate: number;
  fineAmount?: number;
  brand: string;
  licensePlate: string;
  available: boolean;
}