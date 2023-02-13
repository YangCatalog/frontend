import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { CoreModule } from '../../core/core.module';
import { FileUploadFormModule } from '../../shared/file-upload-form/file-upload-form.module';
import { ApiOverviewComponent } from './api-overview/api-overview.component';
import { MissingModulesSelectionComponent } from './missing-modules-confirmation/missing-modules-selection.component';
import { ValidationAlertComponent } from './validation-alert/validation-alert.component';
import { ValidationResultComponent } from './validation-result/validation-result.component';
import { YangValidatorRoutingModule } from './yang-validator-routing.module';
import { YangValidatorComponent } from './yang-validator.component';


@NgModule({
  declarations: [
    YangValidatorComponent,
    MissingModulesSelectionComponent,
    ValidationResultComponent,
    ValidationAlertComponent,
    ApiOverviewComponent
  ],
  entryComponents: [MissingModulesSelectionComponent],
  imports: [
    CommonModule,
    YangValidatorRoutingModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormsModule,
    NgBootstrapFormValidationModule,
    NgbAccordionModule,
    NgbAlertModule,
    FileUploadFormModule,
    RouterModule,
    CoreModule
  ]
})
export class YangValidatorModule { }
