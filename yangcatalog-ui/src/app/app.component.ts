import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatomoTracker } from '@ngx-matomo/tracker';
import { TitleService } from './shared/title/title.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'yc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private notifier: NotifierService;
  
  defaultTitle = 'YANG Catalog';

  constructor(
    private titleService: TitleService,
    private title: Title,
    private tracker: MatomoTracker,
    private notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.titleService.boot()
      .subscribe((title: string) => {
        const pageTitle = title ? `${title} - ${this.defaultTitle}` : this.defaultTitle;
        this.title.setTitle(pageTitle);
        this.tracker.trackPageView(pageTitle);
      });
  }
  
  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}
}
