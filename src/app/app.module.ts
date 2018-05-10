import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';
import { CommonMockService } from './common-mock.service';
import { ModalModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CommonMockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
