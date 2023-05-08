import { IAdditional } from './Additional';
import { IImage } from './Image';

export interface IProduct {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  additionals?: IAdditional[];
  Image?: IImage[];
  quantity?: number;
  observation?: string;
}
