import { Component, OnInit } from '@angular/core';
import { ServerService } from './services/server.service';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { DataState } from './enum/data-state.enum';
import { MenuItem, Message } from 'primeng/api';
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
  items: MenuItem[] = [];
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);

  filterStatus$ = this.filterSubject.asObservable();

 constructor(private serverService:ServerService){
  this.items = [
    {
      label:"Server Up",
      command: () => {
        this.serverUp();
     }
    },
    {
      label:"Server Down",
      command: () => {
        this.serverDown();
      }
    },
    { separator: true },
  ];
 }


  ngOnInit(): void {
  
   this.appState$ = this.serverService.server$
   .pipe(
    map(response =>{
      this.dataSubject.next(response);
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

  pingServer(ipAddress: string ): void {
    this.filterSubject.next(ipAddress);
    this.appState$ = this.serverService.ping$(ipAddress)
    .pipe(
     map(response =>{
      this.dataSubject.value.data.Server[
        this.dataSubject.value.data.Server.findIndex(server =>{
          server.id === response.data.server.id
        })
      ] = response.data.server;
      this.filterSubject.next('');
       return { dataState : DataState.LOADED_STATE, appData: response }
     }),
     startWith({ dataState : DataState.LOADED_STATE,appData: this.dataSubject.value }),
     catchError((error:string) => {
      this.filterSubject.next('');
       return of({ dataState : DataState.LOADED_STATE, error})
     })
    );

    this.messages = [
     { severity: 'error', detail: 'Error' },
    ];
   }

    serverUp(){

    }

    serverDown(){

    }
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
