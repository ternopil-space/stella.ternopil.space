import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

type RoomCard = {
	name: string;
	description: string;
	price: string;
	image: string;
	imageAlt: string;
};

type ContactLink = {
	label: string;
	href: string;
	description: string;
};

@Component({
	imports: [NgOptimizedImage],
	templateUrl: './rooms.component.html',
	styleUrl: './rooms.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
	protected readonly amenities = [
		'Комфортні номери',
		'Сніданки для гостей',
		'Ресторан на території',
		'Room service',
		'Wi-Fi у номерах',
		'Паркінг',
		'Кондиціонер',
		'Цілодобова рецепція',
		'Трансфер за запитом',
	];

	protected readonly rooms: RoomCard[] = [
		{
			name: 'Стандарт бізнес',
			description:
				'Практичний номер для гостей у відрядженні з усіма необхідними зручностями.',
			price: 'від 1200 грн/доба',
			image: 'room/room-1.webp',
			imageAlt: 'Стандарт бізнес у Stella Hotel Ternopil',
		},
		{
			name: 'Делюкс із балконом',
			description:
				'Просторий номер з великим ліжком та балконом для комфортного відпочинку.',
			price: 'від 1500 грн/доба',
			image: 'room/room-2.webp',
			imageAlt: 'Делюкс із балконом у Stella Hotel Ternopil',
		},
		{
			name: 'Преміум номер',
			description:
				'Покращений номер з сучасним дизайном та максимальним комфортом.',
			price: 'від 1800 грн/доба',
			image: 'room/room-3.webp',
			imageAlt: 'Преміум номер у Stella Hotel Ternopil',
		},
	];

	protected readonly contactLinks: ContactLink[] = [
		{
			label: 'Call',
			href: 'tel:+380632185555',
			description: '+38 063 218 5555',
		},
		{
			label: 'Telegram',
			href: 'https://t.me/+380632185555',
			description: '+38 063 218 5555',
		},
		{
			label: 'WhatsApp',
			href: 'https://wa.me/380632185555',
			description: '+38 063 218 5555',
		},
	];
}
