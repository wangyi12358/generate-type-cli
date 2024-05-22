/** @format */

import { Observable } from 'rxjs';
// This is code generated automatically by the zbanx proto2api, please do not modify

export interface AccountRelation {
  //  @uint32
  id: number;
  //  @uint32
  accountId: number;
  //  @uint32
  type: number;
  //  @uint32
  typeId: number;
  //  @uint32
  status: number;
  //  @bool
  isOwner: boolean;
  //  @bool
  isDefault: boolean;
  //  @bool
  isAgent: boolean;
}

export interface AccountInfo {
  //  @uint32
  id: number;
  uid: string;
  email: string;
  avatar: string;
  userName: string;
  nickName: string;
  mobile: string;
  //  @uint32
  status: number;
  lastLoginAt: string;
  lastLoginIp: string;
  createdAt: string;
  relation: string;
  relations: AccountRelation[];
}

export interface GetAccountRequest {
  //  @uint32
  id: number;
}

export interface GetAccountReply {
  account: AccountInfo;
}

export interface FreezeAccountRequest {
  //  @uint32
  id: number;
  //  @bool
  status: boolean;
}

export interface ListAccountRequest {
  //  @uint32
  page: number;
  //  @uint32
  size: number;
  email: string;
  // 是否查询未完成信息填写的账号 @bool
  unfinished: boolean;
  //  @uint32
  relations: number[];
  //  @uint32
  status: number[];
  startTime: string;
  endTime: string;
  // 排序 latest:id倒序 oldest:id正序 默认值: latest
  sort: string;
}

export interface ListAccountReply {
  //  @uint32
  total: number;
  items: AccountInfo[];
}

export interface EmployeeAccountInfo {
  //  @uint32
  id: number;
  uid: string;
  email: string;
  avatar: string;
  userName: string;
  nickName: string;
  employeeName: string;
  mobile: string;
  createdAt: string;
  registerAt: string;
  lastLoginAt: string;
  lastLoginIp: string;
  //  @uint32
  status: number;
}

export interface GetEmployeeAccountReply {
  account: EmployeeAccountInfo;
}

export interface ListEmployeeAccountRequest {
  //  @uint32
  page: number;
  //  @uint32
  size: number;
  keyword: string;
  //  @uint32
  status: number[];
  startTime: string;
  endTime: string;
}

export interface ListEmployeeAccountReply {
  //  @uint32
  total: number;
  items: EmployeeAccountInfo[];
}

export interface CreateEmployeeAccountRequest {
  email: string;
  nickName: string;
  employeeName: string;
  password: string;
  mobile: string;
}

export interface UpdateEmployeeAccountRequest {
  //  @uint32
  id: number;
  nickName: string;
  employeeName: string;
  mobile: string;
}

export interface SetAsEmployeeAccountRequest {
  //  @uint32
  id: number;
}

export interface UpdateAccountPreRelationRequest {
  //  @uint32
  id: number;
  relation: string;
}

export const AccountServiceName = 'AccountService';

export interface IAccountService {
  getAccount: (request: GetAccountRequest) => Promise<GetAccountReply>;
  listAccount: (request: ListAccountRequest) => Promise<ListAccountReply>;
  freezeAccount: (request: FreezeAccountRequest) => Promise<{}>;
  setAsEmployeeAccount: (request: SetAsEmployeeAccountRequest) => Promise<{}>;
  updateAccountPreRelation: (
    request: UpdateAccountPreRelationRequest
  ) => Promise<{}>;
  // 内部账号管理
  getEmployeeAccount: (
    request: GetAccountRequest
  ) => Promise<GetEmployeeAccountReply>;
  listEmployeeAccount: (
    request: ListEmployeeAccountRequest
  ) => Promise<ListEmployeeAccountReply>;
  freezeEmployeeAccount: (request: FreezeAccountRequest) => Promise<{}>;
  createEmployeeAccount: (
    request: CreateEmployeeAccountRequest
  ) => Promise<GetEmployeeAccountReply>;
  updateEmployeeAccount: (request: UpdateEmployeeAccountRequest) => Promise<{}>;
}

export interface IAccountServiceClient {
  getAccount: (request: GetAccountRequest) => Observable<GetAccountReply>;
  listAccount: (request: ListAccountRequest) => Observable<ListAccountReply>;
  freezeAccount: (request: FreezeAccountRequest) => Observable<{}>;
  setAsEmployeeAccount: (
    request: SetAsEmployeeAccountRequest
  ) => Observable<{}>;
  updateAccountPreRelation: (
    request: UpdateAccountPreRelationRequest
  ) => Observable<{}>;
  // 内部账号管理
  getEmployeeAccount: (
    request: GetAccountRequest
  ) => Observable<GetEmployeeAccountReply>;
  listEmployeeAccount: (
    request: ListEmployeeAccountRequest
  ) => Observable<ListEmployeeAccountReply>;
  freezeEmployeeAccount: (request: FreezeAccountRequest) => Observable<{}>;
  createEmployeeAccount: (
    request: CreateEmployeeAccountRequest
  ) => Observable<GetEmployeeAccountReply>;
  updateEmployeeAccount: (
    request: UpdateEmployeeAccountRequest
  ) => Observable<{}>;
}
