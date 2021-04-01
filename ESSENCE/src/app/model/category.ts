import { CategoryItem } from "../shared/category-item";

export class Category {
  type = "category";
  displayTitle: string; 
  view: string; 
  id: string;
  singleItemCategory: boolean;
  tooltip: string;
  description: string;
}