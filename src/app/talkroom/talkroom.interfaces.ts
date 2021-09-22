export interface ITalk {
  id: number;
  body: string;
  createdAt: string;
  readCount: number;
  profile: {
    userId: number;
    name: string;
    photo: string;
  };
}
