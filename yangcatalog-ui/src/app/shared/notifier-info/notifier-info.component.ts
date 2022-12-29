import { Component } from "@angular/core";
import { NotifierContainerComponent } from "angular-notifier"

@Component({
    selector: 'yc-notifier-info',
    template: `<h1>Here is notifier</h1>
               <notifier-container></notifier-container>`
})
export class NotifierInfoComponent {}
