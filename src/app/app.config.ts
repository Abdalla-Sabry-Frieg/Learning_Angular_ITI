import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authenticationIntercertors } from './services/authenticationInterceptors.service';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './store/counter/counter.reducer';
import { languageReducer } from './store/counter/language/language.reducer';
import { provideEffects } from '@ngrx/effects';
import { LanguageEffects} from './store/counter/language/language.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    // add interceptor here becuse all req. and res. must passing here
    provideHttpClient(withFetch(), withInterceptors([authenticationIntercertors])),
    // add here any reducer i want to set it as a sheard in the project
    provideStore({
        counter: counterReducer,
        language: languageReducer
    }),
     provideEffects([LanguageEffects])
    ]
};




