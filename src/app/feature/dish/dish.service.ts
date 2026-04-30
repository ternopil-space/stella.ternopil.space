import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import dishesData from '../../../data/dishes.json';
import { Dish } from './dish.interface';

const _fallbackDishes: Dish[] = (dishesData as Dish[]).map((dish) => ({
	...dish,
	price: dish.price ?? 0,
	description: dish.description ?? '',
	fullDescription: dish.fullDescription ?? '',
	labels: dish.labels ?? [],
	suggested: dish.suggested ?? [],
	cookTimeMinutes: dish.cookTimeMinutes ?? 0,
	caloriesKcal: dish.caloriesKcal ?? 0,
	portion: dish.portion ?? '',
	allergens: dish.allergens ?? [],
}));

@Injectable({
	providedIn: 'root',
})
export class DishService {
	readonly dishes = signal<Dish[]>(
		environment.dishes.length > 0 ? environment.dishes : _fallbackDishes,
	);
}
