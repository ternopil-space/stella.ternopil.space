import { Company } from '../company/company.interface';
import { Dish, DishCategory } from '../dish/dish.interface';

export interface BootstrapData {
	company?: Company;
	categories?: DishCategory[] | null;
	dishes?: Dish[];
}
