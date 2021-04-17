import {THEMES} from '../config/themesConfig.js';
import {createElement, getElement} from './viewUtils.js';

export class ThemeToggleView {
    constructor() {
        this.app = getElement('#root');
        this.themeSwitch = createElement('label', ['switch']);
        this.themeInput = createElement('input');
        this.themeInput.type = 'checkbox';
        this.themeInput.checked = window.localStorage.getItem('isDark');
        const isDark = window.localStorage.getItem('isDark');
        console.log(isDark);
        if (isDark) {
            if (isDark === 'true') {
                this.themeInput.checked = true;
            } else {
                this.themeInput.checked = false;
            }
        }
        this.themeSpan = createElement('span', ['slider', 'round']);
        this.themeSwitch.append(this.themeInput, this.themeSpan);
        this.app.append(this.themeSwitch);

        this.toggleDarkTheme(this.themeInput.checked);
        this.initLocalListeners();
    }

    initLocalListeners() {
        this.themeInput.addEventListener('change', () => {
            this.toggleDarkTheme(this.themeInput.checked);
        });
    }

    toggleDarkTheme(isDark) {
        const theme = isDark ? THEMES['dark'] : THEMES['light'];
        window.localStorage.setItem('isDark', isDark);
        for (const cssVariable in theme) {
            document.documentElement.style.setProperty(cssVariable, theme[cssVariable]);
        }
    }
}
