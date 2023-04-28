import { OrderStatus } from '../Enum/OrderStatus';
import { IAdditional } from './Additional';
import { IProduct } from './Product';

export interface IOrder {
  id: string;
  products?: IProduct[];
  additionals?: IAdditional[];
  statusOrder: OrderStatus;
  productsQuantity?: number;
}
