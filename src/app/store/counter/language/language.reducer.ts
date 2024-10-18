import { createReducer, on } from "@ngrx/store";
import { languageAction } from "./language.actions";

const initailLanguage = localStorage.getItem('lang')?localStorage.getItem('lang')!:'en';

export const languageReducer = createReducer(initailLanguage ,
  on(languageAction,(state,action)=>action.lang)
)
