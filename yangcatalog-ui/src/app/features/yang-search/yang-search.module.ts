import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CoreModule } from '../../core/core.module';
import { AppAgGridModule } from '../../shared/ag-grid/app-ag-grid.module';
import { YangSearchRoutingModule } from './yang-search-routing.module';
import { YangSearchComponent } from './yang-search.component';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [YangSearchComponent],
  imports: [
    CommonModule,
    YangSearchRoutingModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbNavModule,
    AppAgGridModule,
    NgbTooltipModule,
    NgBootstrapFormValidationModule,
    CoreModule,
    NotifierModule
  ]
})
export class YangSearchModule { }
