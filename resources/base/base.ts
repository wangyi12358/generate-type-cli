/** @format */

// This is code generated automatically by the proto2ts, please do not modify

import { Observable } from 'rxjs';

export interface PaginationReq {
  //  @int32
  current: number;
  //  @int32
  pageSize: number;
  keyword?: string;
}

export interface SortReq {
  field: string;
  order: string;
}

export interface SuccessRes {
  success: string;
  code: string;
}
