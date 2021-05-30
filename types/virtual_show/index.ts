export interface CreateVirtualShowParams {
  uuid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  startTime?: Date;
  endTime?: Date;
  maxPerformers: number;
  linkToMedia?: string;
}

export interface VirtualShowRecord {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  startTime: Date;
  endTime: Date;
  maxPerformers: number;
  linkToMedia: string;
}
