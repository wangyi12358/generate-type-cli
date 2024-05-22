import { DependencyType, Import, PropertyType } from '../apiInterface';
import { toHump } from '../utils';

export function renderImport(list: Import[], messageMap: { [key: string]: 1 }) {
  return list
    .map((k) => {
      return `import { ${k.importClause
        .map((i) =>
          renderTypeName(
            { type: i.type, aliasName: i.dependencyTypeName },
            messageMap,
            true
          )
        )
        .join(',')} } from '${k.moduleSpecifier}'`;
    })
    .join('\n');
}

export function renderComment(
  comment: string,
  isNewline: boolean = true
): string {
  const str = comment
    ? comment
      .split('\n')
      .map((k) => `// ${k}`)
      .join('\n')
    : '';
  if (str) return isNewline ? str + '\n' : str;
  else return str;
}

export function renderTypeName(
  info: { type: string; aliasName: string },
  messageMap: { [key: string]: 1 },
  isImport: boolean = false
) {
  let name = info.type;
  if (messageMap[info.type]) {
    if (isImport) {
      name = name + ' as ' + toHump(info.aliasName, true);
    } else {
      name = toHump(info.aliasName, true);
    }
  }
  return name;
}

export function getProtoType(type: string): string {
  switch (type) {
    case 'bool':
      return 'boolean';
    case 'int32':
    case 'fixed32':
    case 'uint32':
    case 'float':
    case 'double':
      return 'number';
    case 'int64':
    case 'uint64':
    case 'fixed64':
    case 'bytes':
      return 'string';
    default:
      return type;
  }
}

export function getType(k: PropertyType) {
  let type = getProtoType(k.type);
  if (k.dependencyType === DependencyType.CURRENT) {
    type = `${k.type}`
  }
  if (k.dependencyType === DependencyType.EXTERNAL) {
    if (type !== '{}') {
      type = `${k.type}`
    }
  }
  if (k.map) {
    // return `Map<${getProtoType(k.keyType)},${k.type}>`;
    return `{ [key: ${getProtoType(k.keyType)}]: ${type} }`;
  }
  return type;
}
