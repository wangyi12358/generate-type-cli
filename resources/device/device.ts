/** @format */

// This is code generated automatically by the proto2ts, please do not modify

import { Observable } from 'rxjs';
import { PaginationReq, SortReq } from '../base/base';

export interface SiteRes {
  id: string;
  name: string;
  serialNumber: string;
  tenantId: string;
  userId: string;
  address: string;
  remark: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
  //  @float
  lat: number;
  //  @float
  lng: number;
  status: string;
}

export interface CreateSiteReq {
  name: string;
  serialNumber: string;
  tenantId: string;
  userId: string;
  address: string;
  remark: string;
  createdId: string;
  updatedId: string;
  //  @float
  lat: number;
  //  @float
  lng: number;
  status: string;
}

export interface UpdateSiteReq {
  id: string;
  name: string;
  address: string;
  remark: string;
  updatedId: string;
}

export interface SitePageRes {
  list: SiteRes[];
  //  @int32
  total: number;
}

export interface SitePageReq {
  pagination: PaginationReq;
  sort?: SortReq;
  status?: string;
  tenantId?: string;
}

export interface DevicePageRes {
  list: DeviceRes[];
  //  @int32
  total: number;
}

export interface DevicePageReq {
  pagination: PaginationReq;
  sort?: SortReq;
  tenantId?: string;
  status?: string;
}

export interface CreateDeviceReq {
  name: string;
  model: string;
  brand: string;
  company: string;
  contact: string;
  link: string;
  //  @float
  price: number;
  classifyId: string;
  typeId: string;
  remark: string;
  tenantId: string;
  createdId: string;
}

export interface UpdateDeviceReq {
  id: string;
  name: string;
  model: string;
  brand: string;
  company: string;
  contact: string;
  link: string;
  //  @float
  price: number;
  remark: string;
  updatedId: string;
}

export interface DeviceRes {
  id: string;
  name: string;
  model: string;
  brand: string;
  company: string;
  contact: string;
  link: string;
  //  @float
  price: number;
  classifyId: string;
  typeId: string;
  remark: string;
  tenantId: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceServiceRelationRes {
  id: string;
  deviceId: string;
  serviceId: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceAttrRes {
  id: string;
  deviceId: string;
  key: string;
  value: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstanceReq {
  id: string;
  deviceId: string;
  name: string;
  status: string;
  serialNumber: string;
  address: string;
  createdId: string;
}

export interface UpdateInstanceReq {
  id: string;
  name: string;
  address: string;
  updatedId: string;
}

export interface InstanceRes {
  id: string;
  deviceId: string;
  name: string;
  status: string;
  serialNumber: string;
  address: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceInstanceRelationRes {
  id: string;
  deviceId: string;
  instanceId: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstanceAttrRes {
  id: string;
  instanceId: string;
  key: string;
  value: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceReq {
  serialNumber: string;
  name: string;
  classifyId: string;
  typeId: string;
  remark: string;
  createdId: string;
}

export interface UpdateServiceReq {
  id: string;
  name: string;
  remark: string;
  updatedId: string;
}

export interface ServicePageReq {
  pagination: PaginationReq;
  sort?: SortReq;
  status?: string;
  typeId?: string;
  classifyId?: string;
  serialNumber?: string;
  name?: string;
}

export interface ServicePageRes {
  list: ServiceRes[];
  //  @int32
  total: number;
}

export interface ServiceRes {
  id: string;
  serialNumber: string;
  name: string;
  classifyId: string;
  typeId: string;
  remark: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassifyRes {
  id: string;
  name: string;
}

export interface ClassifyListRes {
  list: ClassifyRes[];
}

export interface TypeRes {
  id: string;
  name: string;
  classifyId: string;
}

export interface TypeListRes {
  list: TypeRes[];
}

export interface EventLogRes {
  id: string;
  deviceId: string;
  instanceId: string;
  serviceId: string;
  address: string;
  type: string;
  createdId: string;
  createdAt: string;
  updatedAt: string;
}

export const DeviceServiceName = 'DeviceService';

export interface IDeviceService {
  // site
  sitePage: (request: SitePageReq) => Promise<SitePageRes>;
  createSite: (request: CreateSiteReq) => Promise<SiteRes>;
  updateSite: (request: UpdateSiteReq) => Promise<SiteRes>;
  // device
  devicePage: (request: DevicePageReq) => Promise<DevicePageRes>;
  createDevice: (request: CreateDeviceReq) => Promise<DeviceRes>;
  updateDevice: (request: UpdateDeviceReq) => Promise<DeviceRes>;
  // instance
  createInstance: (request: CreateInstanceReq) => Promise<InstanceRes>;
  updateInstance: (request: InstanceRes) => Promise<InstanceRes>;
  // service
  servicePage: (request: ServicePageReq) => Promise<ServicePageRes>;
  createService: (request: CreateServiceReq) => Promise<ServiceRes>;
  updateService: (request: UpdateServiceReq) => Promise<ServiceRes>;
  // classify
  classifyList: (request: {}) => Promise<ClassifyListRes>;
  // type
  typeList: (request: {}) => Promise<TypeListRes>;
}

export interface IDeviceServiceClient {
  // site
  sitePage: (request: SitePageReq) => Observable<SitePageRes>;
  createSite: (request: CreateSiteReq) => Observable<SiteRes>;
  updateSite: (request: UpdateSiteReq) => Observable<SiteRes>;
  // device
  devicePage: (request: DevicePageReq) => Observable<DevicePageRes>;
  createDevice: (request: CreateDeviceReq) => Observable<DeviceRes>;
  updateDevice: (request: UpdateDeviceReq) => Observable<DeviceRes>;
  // instance
  createInstance: (request: CreateInstanceReq) => Observable<InstanceRes>;
  updateInstance: (request: InstanceRes) => Observable<InstanceRes>;
  // service
  servicePage: (request: ServicePageReq) => Observable<ServicePageRes>;
  createService: (request: CreateServiceReq) => Observable<ServiceRes>;
  updateService: (request: UpdateServiceReq) => Observable<ServiceRes>;
  // classify
  classifyList: (request: {}) => Observable<ClassifyListRes>;
  // type
  typeList: (request: {}) => Observable<TypeListRes>;
}
