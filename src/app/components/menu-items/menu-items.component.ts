import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DishCategoryService } from '../../feature/dish/dish-category.service';
import { Dish, DishCategory } from '../../feature/dish/dish.interface';
import { DishService } from '../../feature/dish/dish.service';
import { MenuItem } from '../../feature/menu/menu.data';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
	selector: 'app-menu-items',
	imports: [MenuItemComponent],
	templateUrl: './menu-items.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemsComponent {
	private readonly _dishService = inject(DishService);
	private readonly _dishCategoryService = inject(DishCategoryService);

	readonly categories = computed(() => {
		const selectedCategories = this._dishCategoryService.selectedCategories();
		const lastSelectedCategory = selectedCategories[selectedCategories.length - 1];

		if (lastSelectedCategory?.children?.length) {
			return lastSelectedCategory.children;
		}

		if (lastSelectedCategory) {
			return [lastSelectedCategory];
		}

		return this._dishCategoryService.flatCategories().filter((category) => !category.parent);
	});

	protected readonly sections = computed(() =>
		this.categories()
			.map((category) => this._toSection(category))
			.filter((section) => section.items.length > 0),
	);

	private _toSection(category: DishCategory) {
		return {
			id: category.slug,
			name: category.name,
			description: category.description,
			items: this._collectItems(category),
		};
	}

	private _collectItems(category: DishCategory): MenuItem[] {
		const categories = this._dishCategoryService.flatCategories();
		const categorySlugs = [
			category.slug,
			...categories
				.filter((entry) => entry.parent === category.slug)
				.map((entry) => entry.slug),
		];

		return this._dishService
			.dishes()
			.filter((dish) => categorySlugs.includes(dish.categorySlug))
			.map((dish) => this._toMenuItem(dish));
	}

	private _toMenuItem(dish: Dish): MenuItem {
		return {
			id: dish.slug,
			slug: dish.slug,
			title: dish.title,
			price: dish.price,
			description: dish.description,
			labels: dish.labels,
			image: `/item/${dish.slug}.webp`,
			imageAlt: dish.title,
			soldOut: false,
		};
	}
}
