import { Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { Actions, ofType } from "@ngrx/effects";
import { getUserRole } from "./app.action";
import {of} from 'rxjs'
import {exhaustMap} from 'rxjs/operators'

@Injectable()
export class AppEffects{
    constructor(private actions$:Actions){

    }

   /*  getUserRole$= createEffect(()=>
    this.actions$.pipe(
        ofType(getUserRole), 
        exhaustMap(()=>{
            //llamada al servicio
            //create succes and fail
            return of(true)
        })
    )) */
    
}