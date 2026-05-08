// src/app/constants/languages.ts

import { LanguageOption } from './language.interface';

export const LANGUAGES: (LanguageOption & { population: number })[] = [
	{
		code: 'ua',
		label: 'Українська',
		flagSrc: 'flags/ukraine.svg',
		htmlLang: 'uk',
		population: 35,
	},
	{
		code: 'en',
		label: 'English',
		flagSrc: 'flags/united-kingdom.svg',
		htmlLang: 'en',
		population: 280,
	},
	{
		code: 'de',
		label: 'Deutsch',
		flagSrc: 'flags/germany.svg',
		htmlLang: 'de',
		population: 130,
	},
	{
		code: 'fr',
		label: 'Français',
		flagSrc: 'flags/france.svg',
		htmlLang: 'fr',
		population: 110,
	},
	{
		code: 'pl',
		label: 'Polski',
		flagSrc: 'flags/poland.svg',
		htmlLang: 'pl',
		population: 45,
	},
];
