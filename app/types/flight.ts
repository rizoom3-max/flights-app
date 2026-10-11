export type Flight = {
  id: number;
  from: string;
  to: string;
  price: number;
  isDirect: boolean;
  bookings: number;
  airline: string;
  departure: string;
  arrival: string;
};