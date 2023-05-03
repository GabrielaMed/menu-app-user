import { OrderStatus } from '../Enum/OrderStatus';
import { IAdditional } from './Additional';
import { IOrderProduct } from './OrderProduct';
import { IProduct } from './Product';

export interface IOrder {
  id: string;
  products?: IOrderProduct[];
  statusOrder: OrderStatus;
  productsQuantity?: number;
}
