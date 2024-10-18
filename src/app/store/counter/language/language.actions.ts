import { createAction, props } from "@ngrx/store";

export const languageAction = createAction("changeAction", props<{lang:string}>());
