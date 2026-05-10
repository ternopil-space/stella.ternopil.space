import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateService } from '@wawjs/ngx-translate';
import { ThemeService } from '@wawjs/ngx-ui';
import { filter, map, startWith } from 'rxjs';
import { LiveTranslatePipe } from '../../feature/language/live-translate.pipe';
import { LanguageOption } from '../../feature/language/language.interface';
import { LanguageService } from '../../feature/language/language.service';

@Component({
	selector: 'app-topbar',
	imports: [NgOptimizedImage, RouterLink, LiveTranslatePipe],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
	private readonly _translateService = inject(TranslateService);
	private readonly _themeService = inject(ThemeService);
	private readonly _languageService = inject(LanguageService);
	private readonly _router = inject(Router);
	private readonly _currentUrl = toSignal(
		this._router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd),
			map((event) => event.urlAfterRedirects),
			startWith(this._router.url),
		),
		{ initialValue: this._router.url },
	);

	protected readonly mode = computed(() => this._themeService.mode() ?? 'light');
	protected readonly languageMenuOpen = signal(false);
	protected readonly languages = this._languageService.languages;
	protected readonly currentLanguage = computed(() =>
		this._languageService.getLanguage(this._languageService.language()),
	);
	protected readonly isRestaurantRoute = computed(() => {
		const path = this._currentUrl();

		return path.includes('restaurant') || path.includes('menu') || path.includes('dish');
	});
	protected readonly brandLabel = computed(() =>
		this.isRestaurantRoute() ? 'STELLA RESTAURANT' : 'STELLA HOTEL TERNOPIL',
	);
	protected readonly toggleIcon = computed(() =>
		this.mode() === 'dark' ? 'light_mode' : 'dark_mode',
	);
	protected readonly toggleLabel = computed(() => {
		this._languageService.language();

		return this.mode() === 'dark'
			? this._translateService.translate('Switch to light mode')()
			: this._translateService.translate('Switch to dark mode')();
	});
	protected readonly languageMenuLabel = computed(() => {
		this._languageService.language();

		return this._translateService.translate('Open language menu')();
	});
	protected readonly languageCycleLabel = computed(() => {
		this._languageService.language();

		return `${this._translateService.translate('Switch language to')()} ${this.getNextLanguage().label}`;
	});

	constructor() {
		this._themeService.init();
		this._languageService.init();
	}

	protected toggleMode() {
		const nextMode = this.mode() === 'dark' ? 'light' : 'dark';
		this._themeService.setMode(nextMode);
	}

	protected nextLanguage() {
		this._languageService.nextLanguage();
		this.languageMenuOpen.set(false);
	}

	protected toggleLanguageMenu() {
		this.languageMenuOpen.update((open) => !open);
	}

	protected setLanguage(language: LanguageOption) {
		this._languageService.setLanguage(language.code);
		this.languageMenuOpen.set(false);
	}

	protected getNextLanguage() {
		const languages = this.languages();
		const currentCode = this.currentLanguage().code;
		const currentIndex = languages.findIndex((language) => language.code === currentCode);

		return languages[(currentIndex + 1) % languages.length] ?? languages[0]!;
	}
}
