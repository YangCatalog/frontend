import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierInfoComponent } from './notifier-info.component';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  imports: [CommonModule, NotifierModule],
  declarations: [NotifierInfoComponent],
  exports: [NotifierInfoComponent]
})
export class NotifierInfoModule { }
