import { IAdditional } from './Additional';
import { IImage } from './Image';

export interface IProduct {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  additional?: IAdditional[];
  image?: IImage[];
  quantity?: number;
  observation?: string;
}
