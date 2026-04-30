export interface DishCategory {
	children?: DishCategory[]; // virtual field
	name: string;
	description: string;
	parent: string;
	slug: string;
}

export interface Dish {
	slug: string;
	categorySlug: string;
	title: string;
	description: string;
	price: number;
	labels: string[];
	fullDescription: string;
	suggested: string[];
	cookTimeMinutes: number;
	caloriesKcal: number;
	portion: string;
	allergens: string[];
}
