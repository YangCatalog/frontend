import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatomoTracker } from '@ngx-matomo/tracker';
import { TitleService } from './shared/title/title.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';

@Component({
  selector: 'yc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  defaultTitle = 'YANG Catalog';

  constructor(
    private titleService: TitleService,
    private title: Title,
    private tracker: MatomoTracker,
    private dataService: AppService,
    private toastrService: ToastrService) { }

  public showNotification() {
    this.dataService.getNotificationJson().subscribe(
      notificationJson => {
        if ('type' in notificationJson && 'message' in notificationJson) {
          const override = { disableTimeOut: true, closeButton: true, positionClass: 'toast-bottom-right' };
          if (notificationJson['type'] === 'info') {
            this.toastrService.info(notificationJson['message'], '', override);
          } else if (notificationJson['type'] === 'warning') {
            this.toastrService.warning(notificationJson['message'], '', override);
          }
        }
      },
      error => { }
    );
  }

  ngOnInit() {
    this.titleService.boot()
      .subscribe((title: string) => {
        const pageTitle = title ? `${title} - ${this.defaultTitle}` : this.defaultTitle;
        this.title.setTitle(pageTitle);
        this.tracker.trackPageView(pageTitle);
      });

    this.showNotification();
  }
}
