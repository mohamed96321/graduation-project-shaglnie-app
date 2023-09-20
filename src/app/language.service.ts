import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = 'arb';
  private lang = new Subject<string>();

  changeLang() {
    this.currentLanguage =
      localStorage.getItem('lang') === 'arb' ? 'eng' : 'arb';
    localStorage.setItem('lang', this.currentLanguage);
    this.lang.next(this.currentLanguage);
  }
  initialLanguage() {
    this.currentLanguage = !localStorage.getItem('lang')
      ? 'arb'
      : localStorage.getItem('lang');
    localStorage.setItem('lang', this.currentLanguage);
    this.lang.next(this.currentLanguage);
  }
  getCurrentLanguage(): Observable<string> {
    return this.lang.asObservable();
  }
  getCurrentLang(): string {
    return localStorage.getItem('lang');
  }
}
