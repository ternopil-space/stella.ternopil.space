import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LiveTranslatePipe } from '../../feature/language/live-translate.pipe';

type NavigationItem = {
	label: string;
	subtitle: string;
	badge: string;
	icon: string;
	route: string;
	tone: 'primary' | 'secondary';
};

@Component({
	imports: [RouterLink, LiveTranslatePipe],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	protected readonly navItems: NavigationItem[] = [
		{
			label: 'Rooms',
			subtitle: 'View accommodation options and current prices',
			badge: 'Main section',
			icon: 'hotel',
			route: '/rooms',
			tone: 'primary',
		},
		{
			label: 'Reviews',
			subtitle: 'Read guest impressions of Stella Hotel Ternopil',
			badge: 'Guests about us',
			icon: 'rate_review',
			route: '/reviews',
			tone: 'secondary',
		},
		{
			label: 'Restaurant',
			subtitle: 'View the Stella Restaurant menu with all categories and dishes',
			badge: 'Menu and drinks',
			icon: 'restaurant',
			route: '/restaurant',
			tone: 'secondary',
		},
	];
}
