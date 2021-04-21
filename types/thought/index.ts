export interface CreateThoughtParams {
  userUuid: string;
  postUuid: string;
  content: string;
}

export interface ThoughtEntity {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userUuid: string;
  postUuid: string;
  content: string;
  uuid: string;
}
