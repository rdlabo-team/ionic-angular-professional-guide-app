export class StorageIonicMock {
  async get<T>(key: string): Promise<T> {
    return [] as unknown as T;
  }
  async create(): Promise<void> {}
  async set(key: string, value: any): Promise<void> {}
  async remove(key: string): Promise<void> {}
  async clear(): Promise<void> {}
}
