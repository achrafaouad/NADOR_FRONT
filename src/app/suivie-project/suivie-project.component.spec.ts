import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivieProjectComponent } from './suivie-project.component';

describe('SuivieProjectComponent', () => {
  let component: SuivieProjectComponent;
  let fixture: ComponentFixture<SuivieProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivieProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuivieProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
