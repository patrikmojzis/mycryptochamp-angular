import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nw3footerComponent } from './nw3footer.component';

describe('Nw3footerComponent', () => {
  let component: Nw3footerComponent;
  let fixture: ComponentFixture<Nw3footerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nw3footerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nw3footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
