import { ApiFile, ApiFunction, ApiModule } from '../apiInterface';
import { getType, renderComment, renderImport } from './utils';

export function genRequest(
  apiInfo: ApiFile,
  requestName: string,
  apiPrefixPath: string,
  messageMap: { [key: string]: 1 }
) {
  return `// This is code generated automatically by the zbanx proto2api, please do not modify
  ${renderComment(apiInfo.comment)}
  ${renderImport(apiInfo.imports, messageMap)}
  ${renderApiModule(apiInfo.apiModules, requestName, apiPrefixPath, messageMap)}
  `;
}

export function renderApiModule(
  list: ApiModule[],
  apiName: string,
  apiPrefixPath: string,
  messageMap: { [key: string]: 1 }
): string {
  // return list
  //   .map(
  //     (k) => `${renderComment(k.comment)}export namespace ${k.name}{
  //     ${renderFunction(k.functions, apiName)}
  //   }`
  //   )
  //   .join("\n\n");

  return list
    .map(
      (k) => `
        ${renderComment(k.comment + '\n' + k.name)}
        ${renderFunction(k.functions, apiName, apiPrefixPath, messageMap)}
      `
    )
    .join('\n\n');
}

/**
 * list  = [{
 *  name: 'getStatus',
 *  apiName: 'webapi',
 *  req: 'GetStatusRequest',
 *  res: 'GetResponse',
 *  url: '/api/xxx',
 *  method: 'get',
 * }]
 *
 * =>
 * export function getStatus(req: GetStatusRequest){
 *      return webapi.get<GetResponse>('/api/xxx', req)
 * }
 * @param list
 * @param apiName
 * @param apiPrefixPath
 * @param messageMap
 * @returns
 */
export function renderFunction(
  list: ApiFunction[],
  requestName: string,
  apiPrefixPath: string,
  messageMap: { [key: string]: 1 }
): string {
  const renderReturn = (k: ApiFunction) => {
    const _url = k.redirectUrl ? k.redirectUrl : k.url;
    const url = apiPrefixPath ? apiPrefixPath + _url : _url;
    const paramsStr = k.method === 'get' ? 'params,' : 'data: params,'
    const methodStr = `method: '${k.method.toUpperCase()}'`
    if (k.req.type) {
      return ` return ${requestName}<${getType(
        k.res,
      )}>('${url}', {
          ${paramsStr}
          ${methodStr}
        })`;
    } else {
      return ` return ${requestName}<${getType(
        k.res,
      )}>('${url}', {
          ${paramsStr}
          ${methodStr}
        })`;
    }
  };

  return list
    .map((k) => {
      const reqStr = k.req.type
        ? `params: Partial<${getType(k.req)}>`
        : '';
      return `${renderComment(k.comment)}export function ${k.name}(${reqStr}){
            ${renderReturn(k)}
        }`;
    })
    .join('\n\n');
}
