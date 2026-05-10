import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LiveTranslatePipe } from '../../feature/language/live-translate.pipe';

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
	imports: [NgOptimizedImage, LiveTranslatePipe],
	templateUrl: './rooms.component.html',
	styleUrl: './rooms.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
	protected readonly amenities = [
		'Comfortable rooms',
		'Breakfast for guests',
		'On-site restaurant',
		'Room service',
		'In-room Wi-Fi',
		'Parking',
		'Air conditioning',
		'24-hour reception',
		'Transfer on request',
	];

	protected readonly rooms: RoomCard[] = [
		{
			name: 'Business Standard',
			description: 'A practical room for business guests with all essential amenities.',
			price: 'from 1200 UAH per night',
			image: 'room/room-1.webp',
			imageAlt: 'Business Standard room at Stella Hotel Ternopil',
		},
		{
			name: 'Deluxe with balcony',
			description: 'A spacious room with a large bed and balcony for a comfortable stay.',
			price: 'from 1500 UAH per night',
			image: 'room/room-2.webp',
			imageAlt: 'Deluxe room with balcony at Stella Hotel Ternopil',
		},
		{
			name: 'Premium room',
			description: 'An upgraded room with modern design and maximum comfort.',
			price: 'from 1800 UAH per night',
			image: 'room/room-3.webp',
			imageAlt: 'Premium room at Stella Hotel Ternopil',
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
