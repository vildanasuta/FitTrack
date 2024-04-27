import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllActivitiesComponent } from './view-all-activities.component';

describe('ViewAllActivitiesComponent', () => {
  let component: ViewAllActivitiesComponent;
  let fixture: ComponentFixture<ViewAllActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
