import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuCategoriesComponent } from '../../components/menu-categories/menu-categories.component';
import { MenuItemsComponent } from '../../components/menu-items/menu-items.component';

@Component({
	imports: [MenuCategoriesComponent, MenuItemsComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
