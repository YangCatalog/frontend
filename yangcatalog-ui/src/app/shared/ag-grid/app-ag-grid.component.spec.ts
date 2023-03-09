import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppAgGridComponent } from './app-ag-grid.component';

describe('KfmAgGridComponent', () => {
  let component: AppAgGridComponent;
  let fixture: ComponentFixture<AppAgGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppAgGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
