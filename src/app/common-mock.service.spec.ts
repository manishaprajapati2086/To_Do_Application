import { TestBed, inject } from '@angular/core/testing';

import { CommonMockService } from './common-mock.service';

describe('CommonMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonMockService]
    });
  });

  it('should be created', inject([CommonMockService], (service: CommonMockService) => {
    expect(service).toBeTruthy();
  }));
});
