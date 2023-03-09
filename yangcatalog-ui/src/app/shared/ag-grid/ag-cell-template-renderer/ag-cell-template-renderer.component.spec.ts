import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AgCellTemplateRendererComponent } from './ag-cell-template-renderer.component';

describe('AgCellTemplateRendererComponent', () => {
  let component: AgCellTemplateRendererComponent;
  let fixture: ComponentFixture<AgCellTemplateRendererComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AgCellTemplateRendererComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgCellTemplateRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
