export interface UserEntity {
  email: string;
  username?: string;
  mobile?: string;
  uuid: string;
}

export interface UserRecord {
  email: string;
  username?: string;
  mobile?: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  hashedPassword?: string;
  oauth?: string;
}

export interface CreateUserParams {
  email: string;
  password: string;
  passwordConfirm: string;
  mobile?: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface UpdateUserParams {
  uuid: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile: string;
}
