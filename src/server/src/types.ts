import { Diagnostic } from 'vscode-languageserver/node';
import type { Position } from 'vscode-languageserver-types';

export interface FunctionStruct {
  // 应该插入的参数类型位置
  paramTypeInsertPosition?: number;
  // 函数回复位置
  fnRespTypeInsertPosition?: number;
  // 请求方法泛型插入位置
  methodGenericInsertPosition?: number;
  // api path
  apiPath: string;
  // 请求的函数
  requestFn: string;
}

export interface ApiFunctionStruct extends FunctionStruct {
  pos: number;
  end: number;
}

export interface QuickFixFunctionStruct {
  paramTypeInsertPosition?: Diagnostic['range']['start'];
  fnRespTypeInsertPosition?: Diagnostic['range']['start'];
  methodGenericInsertPosition?: Diagnostic['range']['start'];
  apiPath: string;
  requestFn: string;
}

export interface ApiInterface {
  reqQueryType: string;
  reqBodyType: string;
  resBodyType: string;
  resBodyDataType: string;
  reqQueryTitle: string;
  reqBodyTitle: string;
  resBodyTitle: string;
  resBodyDataTitle: string;
  title: string;
  reqQueryTitleUnderNamespace: string;
  reqBodyTitleUnderNamespace: string;
  resBodyTitleUnderNamespace: string;
  resBodyDataTitleUnderNamespace: string;
  wholeNamespace: string;
  namespaceTitle: string;
}

export interface ImportPositionInfo {
  type: 'useOld' | 'useNew';
  position: Position;
  nameList: string[];
}
