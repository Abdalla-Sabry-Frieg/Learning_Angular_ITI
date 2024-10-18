import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { languageAction } from './language.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class LanguageEffects {
  // Define the effect to handle language changes
  savedLang$ = createEffect(
    () => this.actions$.pipe(
      ofType(languageAction), // Listen for the languageAction
      tap(action => {
     if (typeof window !== 'undefined') { // Check for browser environment
          localStorage.setItem('lang', action.lang);
          location.reload(); // Optional: reload the page on language change
}})
    ),
    { dispatch: false } // No need to dispatch another action
  );

  // Ensure that the Actions observable is properly injected
  constructor(private actions$: Actions) {}
}
