import { CategoryItem } from "../shared/category-item";

export class Category {
  displayTitle: string; 
  view: string; 
  id: string;
  items: {text: string}[];
}