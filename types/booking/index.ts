export interface CreateBookingParams {
  uuid?: string;
  showUuid?: string;
  userUuid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface BookingRecord {
  uuid: string;
  showUuid: string;
  userUuid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
