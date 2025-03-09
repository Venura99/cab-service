import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = 'lara-dark-blue'; // Default dark theme

  setTheme(theme: string) {
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `assets/themes/${theme}/theme.css`;
    }
    this.currentTheme = theme;
  }

  getTheme(): string {
    return this.currentTheme;
  }
}
