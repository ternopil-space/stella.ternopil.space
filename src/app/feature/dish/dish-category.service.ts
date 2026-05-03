import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import dishCategoriesData from '../../../data/dishCategories.json';
import { DishCategory } from './dish.interface';
import { LanguageCode } from '../language/language.type';
import { LanguageService } from '../language/language.service';
import { buildMenuGroups } from '../menu/menu.data';

@Injectable({
	providedIn: 'root',
})
export class DishCategoryService {
	private readonly _languageService = inject(LanguageService);
	private readonly _fallbackCategories = (dishCategoriesData as DishCategory[]).map((category) => ({
		...category,
	}));

	private readonly _categories = signal<DishCategory[]>(this._fallbackCategories);

	readonly flatCategories = computed(() => {
		const translations = this._buildCategoryTranslationMap(this._languageService.language());

		return this._categories().map((category) => {
			const translated = translations.get(category.slug);

			return translated
				? {
						...category,
						name: translated.name,
						description: translated.description,
					}
				: category;
		});
	});
	readonly categories = computed<DishCategory[]>(() =>
		this.flatCategories()
			.filter((category) => !category.parent)
			.map((category) => this._mapCategory(category)),
	);
	readonly selectedCategories = signal<DishCategory[]>([]);

	constructor() {
		effect(() => {
			const categories = this.categories();
			const selectedSlugs = this.selectedCategories().map((category) => category.slug);

			untracked(() => {
				if (!categories.length) {
					this.selectedCategories.set([]);
					return;
				}

				const nextSelection = this._resolveSelection(categories, selectedSlugs);
				const currentSelection = this.selectedCategories();
				const hasSameSelection =
					currentSelection.length === nextSelection.length &&
					currentSelection.every(
						(category, index) => category.slug === nextSelection[index]?.slug,
					);

				if (
					!hasSameSelection ||
					currentSelection.some((category, index) => category !== nextSelection[index])
				) {
					this.selectedCategories.set(nextSelection);
				}
			});
		});
	}

	setCategories(categories: DishCategory[] | null | undefined) {
		this._categories.set(
			Array.isArray(categories) && categories.length > 0
				? categories
				: this._fallbackCategories,
		);
	}

	selectCategory(
		category: DishCategory,
		_categories: DishCategory[],
		selectedCategories: DishCategory[] = [],
	) {
		const parentIndex = selectedCategories.findIndex(
			(selectedCategory) => selectedCategory.slug === category.parent,
		);
		const nextSelection = parentIndex >= 0 ? selectedCategories.slice(0, parentIndex + 1) : [];

		nextSelection.push(category);

		let currentCategory = category;

		while (currentCategory.children?.length) {
			currentCategory = currentCategory.children[0]!;
			nextSelection.push(currentCategory);
		}

		this.selectedCategories.set(nextSelection);
	}

	private _mapCategory(category: DishCategory): DishCategory {
		const children = this.flatCategories()
			.filter((_category) => _category.parent === category.slug)
			.map((_category) => this._mapCategory(_category));

		return {
			...category,
			children,
		};
	}

	private _resolveSelection(categories: DishCategory[], selectedSlugs: string[]) {
		const selection: DishCategory[] = [];
		let currentCategory =
			categories.find((category) => category.slug === selectedSlugs[0]) ?? categories[0]!;
		let level = 1;

		selection.push(currentCategory);

		while (currentCategory.children?.length) {
			currentCategory =
				currentCategory.children.find((category) => category.slug === selectedSlugs[level]) ??
				currentCategory.children[0]!;
			selection.push(currentCategory);
			level += 1;
		}

		return selection;
	}

	private _buildCategoryTranslationMap(language: LanguageCode) {
		return new Map(
			buildMenuGroups(language).flatMap((group) => [
				[
					group.id,
					{
						name: group.name,
						description: '',
					},
				] as const,
				...group.sections.map((section) => [
					section.id,
					{
						name: section.name,
						description: section.description ?? '',
					},
				] as const),
			]),
		);
	}
}
