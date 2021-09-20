import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private device: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.device = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any): Promise<void> {
    return this.device?.set(key, value);
  }

  public get<T>(key: string): Promise<T> {
    return this.device?.get(key);
  }

  public remove(key: string): Promise<void> {
    return this.device?.remove(key);
  }

  public clear(): Promise<void> {
    return this.device?.clear();
  }
}
