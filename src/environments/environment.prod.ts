import { Company } from '../app/feature/company/company.interface';
import { Dish } from '../app/feature/dish/dish.interface';

export const environment: {
	apiUrl: string;
	companyId: string;
	onApiFall: 'spinner' | 'app reload' | 'app';
	appVersion: string;
	production: boolean;
	defaultLanguage: string;
	company: Company;
	dishes: Dish[];
} = {
	apiUrl: 'https://it.webart.work',
	companyId: 'demo',
	onApiFall: 'app',
	appVersion: '1.0.0',
	production: true,
	defaultLanguage: 'ua',
	dishes: [],
	company: {
		_id: '',
		name: '',
	},
};
