import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@wawjs/ngx-translate';
import { LanguageService } from './language.service';

@Pipe({
	name: 'translate',
	standalone: true,
	pure: false,
})
export class LiveTranslatePipe implements PipeTransform {
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	transform(text: string | null | undefined): string {
		if (!text) {
			return '';
		}

		this._languageService.language();

		return this._translateService.translate(text)();
	}
}
