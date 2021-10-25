import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SldsFormElementComponent } from './slds-form-element.component';

describe('SldsFormElementComponent', () => {
  let component: SldsFormElementComponent;
  let fixture: ComponentFixture<SldsFormElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SldsFormElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SldsFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
