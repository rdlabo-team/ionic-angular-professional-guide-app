import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
