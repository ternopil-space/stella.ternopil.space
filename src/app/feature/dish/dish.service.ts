import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import dishesData from '../../../data/dishes.json';
import { Dish } from './dish.interface';
import { LanguageService } from '../language/language.service';
import { cleanText, rawMenuSections, translateMenuValue } from '../menu/menu.data';

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

const _rawMenuItemsBySlug = new Map(
	rawMenuSections.flatMap((section) => section.items.map((item) => [item.slug, item] as const)),
);

@Injectable({
	providedIn: 'root',
})
export class DishService {
	private readonly _languageService = inject(LanguageService);
	private readonly _dishes = signal<Dish[]>(
		environment.dishes.length > 0 ? environment.dishes : _fallbackDishes,
	);

	readonly dishes = computed(() => {
		const language = this._languageService.language();

		return this._dishes().map((dish) => {
			const translatedDish = _rawMenuItemsBySlug.get(dish.slug);

			if (!translatedDish) {
				return dish;
			}

			return {
				...dish,
				title: translateMenuValue(translatedDish.title, language) ?? dish.title,
				description:
					cleanText(translateMenuValue(translatedDish.description, language)) ??
					dish.description,
				fullDescription:
					cleanText(translateMenuValue(translatedDish.fullDescription, language)) ??
					dish.fullDescription,
				labels:
					translatedDish.labels
						.map((label) => cleanText(translateMenuValue(label, language)))
						.filter((label): label is string => Boolean(label)) ?? dish.labels,
			};
		});
	});

	setDishes(dishes: Dish[] | null | undefined) {
		this._dishes.set(Array.isArray(dishes) && dishes.length > 0 ? dishes : _fallbackDishes);
	}
}
