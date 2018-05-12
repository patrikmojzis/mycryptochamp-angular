import { TestBed, inject } from '@angular/core/testing';

import { RankFilterService } from './rank-filter.service';

describe('RankFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RankFilterService]
    });
  });

  it('should be created', inject([RankFilterService], (service: RankFilterService) => {
    expect(service).toBeTruthy();
  }));
});
