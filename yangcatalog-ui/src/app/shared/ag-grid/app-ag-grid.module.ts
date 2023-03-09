import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAgGridComponent } from './app-ag-grid.component';
import { AgCellTemplateRendererComponent } from './ag-cell-template-renderer/ag-cell-template-renderer.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppAgGridComponent, AgCellTemplateRendererComponent],
    imports: [
        CommonModule,
        AgGridModule.withComponents([AgCellTemplateRendererComponent]),
        FormsModule,
    ],
    exports: [
        AppAgGridComponent
    ]
})
export class AppAgGridModule {
    static withComponents(components?: any): ModuleWithProviders<AppAgGridModule> {
        return {
            ngModule: AppAgGridModule
        };
    }
}
