import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationGlobalComponent } from './situation-global.component';

describe('SituationGlobalComponent', () => {
  let component: SituationGlobalComponent;
  let fixture: ComponentFixture<SituationGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituationGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituationGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
