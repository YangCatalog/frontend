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
  private toastr: ToastrService;

  defaultTitle = 'YANG Catalog';

  constructor(
    private titleService: TitleService,
    private title: Title,
    private tracker: MatomoTracker,
    private dataService: AppService,
    private toastrService: ToastrService) {
      this.toastr = toastrService;
    }

  public showNotification() {
    this.dataService.getNotificationJson().subscribe(
      notification_json => {
        if ('type' in notification_json && 'message' in notification_json) {
          if (notification_json['type'] == 'info') {
            this.toastr.info(notification_json['message'], '', {disableTimeOut: true, closeButton: true, positionClass: 'toast-bottom-right'});
          } else if (notification_json['type'] == 'warning') {
            this.toastr.warning(notification_json['message'], '', {disableTimeOut: true, closeButton: true, positionClass: 'toast-bottom-right'});
          }
        }
      },
      error => {}
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
