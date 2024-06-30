import { Status } from '../types/status';

export type UpdateOrderDto = {
  id: number;
  service: string;
  clientName?: string;
  clientAddress?: string;
  clientTel?: string;
  price?: number;
  finalPrice?: number;
  status?: Status;
  review?: string;
  engineerId?: number;
  note?: string;
  visitAt?: string;
  finishAt?: string;
  expireAt?: string;
};
