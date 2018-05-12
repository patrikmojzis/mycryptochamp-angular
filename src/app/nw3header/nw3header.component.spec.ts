import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nw3headerComponent } from './nw3header.component';

describe('Nw3headerComponent', () => {
  let component: Nw3headerComponent;
  let fixture: ComponentFixture<Nw3headerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nw3headerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nw3headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
