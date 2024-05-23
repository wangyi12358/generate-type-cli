import { ApiFile } from '../apiInterface';
import { genRequest } from '../generator/genRequest';
import { format } from '../utils';
import { genType } from './genType';

export type GenCodeOptions = {
  apiFileMap: { [fileName: string]: ApiFile };
  requestName: string;
  requestPath: string;
  omitApiPrefix?: string;
  apiPrefix?: string;
};

export function genCode(options: GenCodeOptions): {
    [filePath: string]: [code: string]
} {
  const { apiFileMap } = options
  const result = {};

  for (const fileName in apiFileMap) {
    const apiFile = apiFileMap[fileName];

    // If this is a proto with api calls, need to import the configured request
    apiFile.imports.unshift({
      importClause: [
        {
          type: 'Observable',
        },
      ],
      moduleSpecifier: 'rxjs',
    });

    const messageMap = {};
    apiFile.interfaces.forEach((k) => {
      messageMap[k.name] = 1;
      k.module &&
      k.module.interfaces.forEach((i) => {
        messageMap[k.name + '.' + i.name] = 1;
      });
      k.module &&
      k.module.enums.forEach((i) => {
        messageMap[k.name + '.' + i.name] = 1;
      });
    });
    apiFile.enums.forEach((k) => {
      messageMap[k.name] = 1;
    });

    const typingsCode = format(

      `// This is code generated automatically by the proto2ts, please do not modify

      ${genType(apiFile, messageMap)}
      ${genRequest(apiFile)}`
    )
    const isTsFile = apiFile.outputPath.endsWith('.ts');
    if (isTsFile) {
      // 生成typings.d.ts
      const modulePath = apiFile.outputPath.substring(0, apiFile.outputPath.lastIndexOf('.'))
      // const requestPath = `${modulePath}/index.ts`;
      const typingsPath = `${modulePath}.ts`;
      result[typingsPath] = typingsCode;
      // result[requestPath] = requestCode
    } else {
      // result[apiFile.outputPath] = requestCode
    }
  }

  return result;

}
