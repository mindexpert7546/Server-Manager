import { Component, OnInit } from '@angular/core';
import { ServerService } from './services/server.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { DataState } from './enum/data-state.enum';
import { Message } from 'primeng/api';
import { Status } from './enum/status.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  readonly Status = Status
  messages: Message[] | undefined;
server: any;

 constructor(private serverService:ServerService){}


  ngOnInit(): void {
   this.appState$ = this.serverService.server$
   .pipe(
    map(response =>{
      return { dataState : DataState.LOADED_STATE, appData: response }
    }),
    startWith({ dataState : DataState.LOADING_STATE}),
    catchError((error:string) => {
      return of({ dataState : DataState.ERROR_STATE, error})
    })
   );
   this.messages = [
    { severity: 'error', detail: 'Error' },
   ];
  }

  save(arg0: string) {
    throw new Error('Method not implemented.');
    }
    items:any = [
      {label:"Server Up"},
      {label:"Server Down"}
    ]
    
    getAddServerToolTipName(){
      return "Add new Server";
    }
    
    getExcelExpertToolTipName(){
      return "Download excel list";
    }
    
    getTypeOfServerToolTipName(){
      return "Type of server";
    }
    
    getPingToolTipName(){
      return "Ping server";
    }
    
    getDeleteToolTipName(){
      return "Delete server";
    }
}
