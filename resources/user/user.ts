/** @format */

// This is code generated automatically by the proto2ts, please do not modify

import { Observable } from 'rxjs';
import { AttachmentReq } from '../common/common';

export interface CreateUserReq {
  name: string;
  email: string;
  password: string;
  createdId: string;
  updatedId: string;
  gender: string;
  phone?: string;
  title?: string;
  profTitle?: string;
  type: string;
  status: string;
}

export interface UserRes {
  id: string;
  name: string;
  email: string;
  password: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
  gender: string;
  phone: string;
  title: string;
  profTitle: string;
  type: string;
  status: string;
}

export interface LoginRes {
  user: UserRes;
}

export interface UserPageRes {
  list: UserRes[];
  //  @int32
  total: number;
}

export interface UserPageReq {
  //  @int32
  current: number;
  //  @int32
  pageSize: number;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface FindByIdReq {
  id: string;
}

export interface ChangePasswordReq {
  id: string;
  password: string;
  updatedId: string;
}

export interface Success {
  //  @bool
  success: boolean;
}

export interface ContractReq {
  startDate: string;
  endDate: string;
  remark: string;
}

export interface CreateTenantReq {
  name: string;
  website: string;
  phone: string;
  address: string;
  brn: string;
  contract: ContractReq;
  users: CreateUserReq[];
  attachments: AttachmentReq[];
}

export interface TenantRes {
  id: string;
  name: string;
  phone: string;
  address: string;
  website: string;
  brn: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantRes {
  tenant: TenantRes;
}

export const UserServiceName = 'UserService';

export interface IUserService {
  userPage: (request: UserPageReq) => Promise<UserPageRes>;
  createUser: (request: CreateUserReq) => Promise<UserRes>;
  login: (request: LoginReq) => Promise<LoginRes>;
  findById: (request: FindByIdReq) => Promise<UserRes>;
  changePassword: (request: ChangePasswordReq) => Promise<Success>;
  createTenant: (request: CreateTenantReq) => Promise<CreateTenantRes>;
}

export interface IUserServiceClient {
  userPage: (request: UserPageReq) => Observable<UserPageRes>;
  createUser: (request: CreateUserReq) => Observable<UserRes>;
  login: (request: LoginReq) => Observable<LoginRes>;
  findById: (request: FindByIdReq) => Observable<UserRes>;
  changePassword: (request: ChangePasswordReq) => Observable<Success>;
  createTenant: (request: CreateTenantReq) => Observable<CreateTenantRes>;
}
