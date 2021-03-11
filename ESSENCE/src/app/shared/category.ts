import { CategoryItem } from "./category-item";

export interface Category {
    displayTitle: String;
    view: String;
    items: CategoryItem[];
}
