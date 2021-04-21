export interface CreatePostParams {
  userUuid: string;
  title: string;
  linkToMedia?: string;
  storageKey?: string;
  fileAsBase64: string;
}

export interface DeletePostParams {
  postUuid: string;
  key: string;
}

export interface PostEntity {
  userUuid: string;
  uuid: string;
  title: string;
  linkToMedia: string;
  awsKey: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  thoughts: Array<any>;
  upvotes: Array<any>;
}
