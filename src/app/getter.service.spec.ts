import { TestBed, inject } from '@angular/core/testing';

import { GetterService } from './getter.service';

describe('GetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetterService]
    });
  });

  it('should be created', inject([GetterService], (service: GetterService) => {
    expect(service).toBeTruthy();
  }));
});
