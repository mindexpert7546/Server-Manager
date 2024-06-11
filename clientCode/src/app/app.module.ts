import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    ToastModule,
    DropdownModule,
    TagModule,
    FormsModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }