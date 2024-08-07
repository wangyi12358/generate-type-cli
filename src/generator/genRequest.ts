import { ApiFile, ApiFunction, ApiModule } from '../apiInterface';
import { firstUpperCase, getType, renderComment } from './utils';

export function genRequest(
  apiInfo: ApiFile,
) {
  if (!apiInfo.apiModules?.length) return '';
  const name = `${apiInfo.apiModules[0].name}`;
  return `
  ${renderComment(apiInfo.comment)}
  export const ${name}Name = '${name}';

  ${renderApiModule(apiInfo.apiModules)}

  ${renderApiModule(apiInfo.apiModules, 'Client', 'Observable')}
  `;
}

export function renderApiModule(
  list: ApiModule[],
  name = '',
  returnType = 'Promise',
): string {
  return list
    .map(
      (k) => `${renderComment(k.comment)}export interface I${k.name}${name} {
      ${renderFunction(k.functions, returnType)}
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
  returnType = 'Promise',
): string {
  return list
    .map((k) => {
      const reqStr = k.req.type
        ? `request: ${getType(k.req)}`
        : '';
      let returnStr = `${returnType}<${getType(k.res)}>`;
      if (returnType === 'Promise') {
        returnStr = `${returnType}<${getType(k.res)}> | Observable<${getType(k.res)}>`;
      }
      return `${renderComment(k.comment)} ${firstUpperCase(k.name)}: (${reqStr}) => ${returnStr}`;
    })
    .join('\n');
}
