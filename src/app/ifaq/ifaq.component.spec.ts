import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfaqComponent } from './ifaq.component';

describe('IfaqComponent', () => {
  let component: IfaqComponent;
  let fixture: ComponentFixture<IfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
