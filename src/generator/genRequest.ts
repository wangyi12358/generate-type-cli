import { ApiFile, ApiFunction, ApiModule } from '../apiInterface';
import { getType, renderComment } from './utils';

export function genRequest(
  apiInfo: ApiFile,
) {
  return `
  ${renderComment(apiInfo.comment)}
  ${renderApiModule(apiInfo.apiModules)}
  `;
}

export function renderApiModule(
  list: ApiModule[],
): string {
  return list
    .map(
      (k) => `${renderComment(k.comment)}export interface ${k.name}Service {
      ${renderFunction(k.functions)}
    }`
    )
    .join('\n\n');

  // return list
  //   .map(
  //     (k) => `
  //       ${renderComment(k.comment + '\n' + k.name)}
  //       ${renderFunction(k.functions, apiName, apiPrefixPath, messageMap)}
  //     `
  //   )
  //   .join('\n\n');
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
): string {

  return list
    .map((k) => {
      const reqStr = k.req.type
        ? `request: ${getType(k.req)}`
        : '';
      return `${renderComment(k.comment)} ${k.name}: (${reqStr}) => ${getType(k.res)}`;
    })
    .join('\n');
}
