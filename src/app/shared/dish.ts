import { comment } from './comment';
export class Dish
{
    id: string ;
    name :string ;
    image: string;
    category :string ;
    featured:boolean;
    label:string;
    price: string ;
    comments : comment[];
    description :string ;
}