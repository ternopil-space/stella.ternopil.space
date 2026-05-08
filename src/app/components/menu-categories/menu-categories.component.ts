import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DishCategoryService } from '../../feature/dish/dish-category.service';

@Component({
	selector: 'app-menu-categories',
	templateUrl: './menu-categories.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCategoriesComponent {
	readonly dishCategoryService = inject(DishCategoryService);
}
