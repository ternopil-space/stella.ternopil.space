import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type NavigationItem = {
	label: string;
	subtitle: string;
	badge: string;
	icon: string;
	route: string;
	tone: 'primary' | 'secondary';
};

@Component({
	imports: [RouterLink],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	protected readonly navItems: NavigationItem[] = [
		{
			label: 'Номери',
			subtitle: 'Переглянути варіанти проживання та актуальні ціни',
			badge: 'Основний розділ',
			icon: 'hotel',
			route: '/rooms',
			tone: 'primary',
		},
		{
			label: 'Відгуки',
			subtitle: 'Дізнатися враження гостей про Stella Hotel Ternopil',
			badge: 'Гості про нас',
			icon: 'rate_review',
			route: '/reviews',
			tone: 'secondary',
		},
		{
			label: 'Ресторан',
			subtitle: 'Переглянути меню Stella Restaurant з усіма категоріями та стравами',
			badge: 'Меню та напої',
			icon: 'restaurant',
			route: '/restaurant',
			tone: 'secondary',
		},
	];
}
