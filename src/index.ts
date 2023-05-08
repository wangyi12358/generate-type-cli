import { resolve, join } from 'path'
import { Glob } from 'glob';
import * as process from 'process';
import { getProto2ApiData } from './proto'
import { genCode } from './generator';
import { outputFileSync } from 'fs-extra';
import { success } from './utils';
import { generateService } from '@umijs/openapi'

export interface Options {
  // args
  debug?: boolean;
  dir?: string;
  output?: string;
  requestName: string;
  requestPath: string;
  omitApiPrefix?: string;
  apiPrefix?: string

  // other
  protoDir?: string;
  files?: string[];
  depPath?: string;
}

function getPathsDir(dir): Promise<string[]> {
  return new Promise((resolve, reject) => {
    new Glob(dir, { mark: true, sync: false }, (err, files) => {
      if (err) {
        console.error('Glob error: ', err);
        return reject(err);
      }
      resolve(files);
    });
  });
}

/**
 * 生成 openapi 重写生
 * @param options
 */
function generatorSwagger(options: Options) {
  let path = options.dir;
  if (!path.startsWith('http')) {
    path = join(process.cwd(), options.dir)
  }
  generateService({
    schemaPath: path,
    serversPath: options.output,
  })
}

export async function main(options: Options) {

  if (options.dir.endsWith('.json')) {
    // swagger或者openapi
    return generatorSwagger(options)
  }

  const dirPath = resolve(options.dir);
  let files: string[] = [];
  if (options.dir.endsWith('.proto')) {
    files.push(dirPath);
  } else {
    files = await getPathsDir(dirPath + '/**/*.proto');
  }

  if (!files.length) {
    console.error(`The corresponding proto file was not found under the ${options.dir}`);
    return process.exit(1);
  }
  options.files = files;

  options.protoDir = process.cwd();

  let output = resolve(options.output);
  output = output.endsWith('/') ? output : output + '/';
  options.output = output

  let apiFileMap = getProto2ApiData(options);

  delete apiFileMap[''];

  const result = genCode({
    apiFileMap,
    requestName: options.requestName,
    requestPath: options.requestPath,
    omitApiPrefix: options.omitApiPrefix,
    apiPrefix: options.apiPrefix,
  })

  for (const filePath in result) {
    outputFileSync(filePath, result[filePath], 'utf8');
    success(`${filePath} generated successfully`);
  }
  // const getProto2ApiData
}
