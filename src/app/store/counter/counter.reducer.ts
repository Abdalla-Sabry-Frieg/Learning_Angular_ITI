import { createReducer, on } from "@ngrx/store";
import { decreaseCounter, increaseCounter } from "./counter.actions";

const initailState =0 ;

export const counterReducer = createReducer(initailState ,
   on(increaseCounter,(state)=>state+1),
   on(decreaseCounter , (state)=>state-1)
  );


