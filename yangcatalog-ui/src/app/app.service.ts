import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './core/data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService extends DataService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    getNotificationJson(): Observable<any> {
        return this.customGet('notifications/notification.json');
    }
}
