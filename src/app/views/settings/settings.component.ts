import { Component } from '@angular/core';
import { ThemeService, Theme } from "../../services/theme.service";
import {map} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  Theme = Theme;

  theme = this.themeService.getTheme();

  constructor(private readonly themeService: ThemeService) {}

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  isTheme(theme: Theme) {
    return this.themeService.getTheme()
      .pipe(map(t => t === theme));
  }
}
