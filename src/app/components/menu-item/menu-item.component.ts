import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@wawjs/ngx-translate';
import { LanguageService } from '../../feature/language/language.service';
import { LiveTranslatePipe } from '../../feature/language/live-translate.pipe';
import { FavoritesService } from '../../feature/menu/favorites.service';
import { MenuItem } from '../../feature/menu/menu.data';

@Component({
	selector: 'app-menu-item',
	imports: [RouterLink, LiveTranslatePipe],
	templateUrl: './menu-item.component.html',
	styleUrl: './menu-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
	private readonly _favoritesService = inject(FavoritesService);
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	readonly item = input.required<MenuItem>();
	protected readonly isFavorite = computed(() =>
		this._favoritesService.isFavorite(this.item().id),
	);
	protected readonly unavailableLabel = computed(() => {
		this._languageService.language();

		return this._translateService.translate('Unavailable')();
	});
	protected readonly favoriteLabel = computed(() => {
		this._languageService.language();

		return this._translateService.translate(
			this.isFavorite() ? 'Remove from favorites' : 'Add to favorites',
		)();
	});

	protected toggleFavorite() {
		this._favoritesService.toggleFavorite(this.item().id);
	}
}
