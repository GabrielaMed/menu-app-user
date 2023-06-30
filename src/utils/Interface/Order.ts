import { OrderStatus } from '../Enum/OrderStatus';
import { IOrderProduct } from './OrderProduct';

export interface IOrder {
  id: string;
  products?: IOrderProduct[];
  statusOrder: OrderStatus;
  productsQuantity?: number;
}
