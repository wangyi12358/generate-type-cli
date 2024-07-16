/** @format */

// This is code generated automatically by the proto2ts, please do not modify

import { Observable } from 'rxjs';

export interface DictListRes {
  name: string;
  value: string;
  attr: string;
}

export interface DictRes {
  code: string;
  name: string;
  list: DictListRes[];
}

export interface DictsReq {
  languageCode: string;
}

export interface DictsRes {
  list: DictRes[];
}

export interface AttachmentReq {
  id: string;
  filename: string;
  blobName: string;
  type: string;
  url: string;
  //  @float
  size: number;
  entityId: string;
  entityType: string;
  createdId: string;
  updatedId: string;
}

export interface AttachmentRes {
  id: string;
  filename: string;
  blobName: string;
  type: string;
  url: string;
  //  @float
  size: number;
  entityId: string;
  entityType: string;
  createdId: string;
  updatedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttachmentsReq {
  entityId: string;
  entityType: string;
}

export interface AttachmentsRes {
  attachments: AttachmentRes[];
}

export const CommonServiceName = 'CommonService';

export interface ICommonService {
  dicts: (request: DictsReq) => Promise<DictsRes>;
  attachments: (request: AttachmentsReq) => Promise<AttachmentsRes>;
}

export interface ICommonServiceClient {
  dicts: (request: DictsReq) => Observable<DictsRes>;
  attachments: (request: AttachmentsReq) => Observable<AttachmentsRes>;
}
