import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHarnessComponent } from './test-harness.component';

describe('TestHarnessComponent', () => {
  let component: TestHarnessComponent;
  let fixture: ComponentFixture<TestHarnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHarnessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHarnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
